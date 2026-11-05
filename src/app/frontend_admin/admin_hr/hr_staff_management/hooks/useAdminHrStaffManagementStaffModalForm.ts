"use client";
// RESPONSIBILITY: Owns React Hook Form state, branch assignment selection, password visibility, dirty-state protection, and modal lifecycle for AdminHrStaffModal.
// DATA FLOW: HR staff/branch queries → React Hook Form → Zod validation → HR staff mutation → TanStack Query refresh.

/**
 * @description useAdminHrStaffModalForm owns React Hook Form state and Zod-backed validation for the HR staff modal.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */

import React, { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAdminHrViewModel } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementViewModel';
import { useAdminHrBranchReference } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementBranchReference';
import { useAdminHrUnsavedChangesGuard } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUnsavedChangesGuard';
import { staffFormSchema } from '@/app/frontend_admin/admin_hr/hr_staff_management/schemas/AdminHrStaffManagementSchemas';
import { AdminHrFromMinorUnits } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementCurrencyUnits';
import { EMPTY_STAFF, STAFF_MODAL_FIELDS } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';
import type { AdminHrBranchReference, StaffFormValues } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import { applyAdminHrManagementApiValidationErrors } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementApiResponse';

/** Owns staff modal state and exposes branch-selection helpers to the presentation component. */
export function useAdminHrStaffModalForm() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useAdminHrViewModel();
  const { data: branches = [] } = useAdminHrBranchReference();
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema) as unknown as Resolver<StaffFormValues>,
    defaultValues: (editData as StaffFormValues) || EMPTY_STAFF,
  });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminHrUnsavedChangesGuard(isDirty);
  const formValues = useWatch({ control });
  const selectedRole = formValues.role ?? (editData as StaffFormValues)?.role;
  const isManager = selectedRole === 'Manager';
  const assignedBranches = formValues.assignedBranches ?? (editData as StaffFormValues)?.assignedBranches ?? [];

  // EFFECT: Rehydrates the staff form when the create/edit modal opens with the current record.
  useEffect(() => {
    if (showModal) reset({
      ...EMPTY_STAFF,
      ...(editData || {}),
      salary: AdminHrFromMinorUnits(editData?.salary),
    } as StaffFormValues);
  }, [editData, reset, showModal]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowModal(false);
  }, [confirmDiscardIfDirty, setShowModal]);

  const getBranchLabel = useCallback((id: string) => {
    const branch = (branches as AdminHrBranchReference[]).find((item) => item.id === id);
    return branch ? branch.name : id;
  }, [branches]);

  const toggleAssignedBranch = useCallback((branchId: string, checked: boolean) => {
    const next = checked
      ? [...assignedBranches, branchId]
      : assignedBranches.filter((id) => id !== branchId);
    setValue('assignedBranches', next, { shouldDirty: true });
    if (!checked && (formValues.primaryBranchId ?? (editData as StaffFormValues)?.primaryBranchId) === branchId) {
      setValue('primaryBranchId', '', { shouldDirty: true });
    }
  }, [assignedBranches, editData, formValues.primaryBranchId, setValue]);

  const togglePasswordVisibility = useCallback(() => setShowPassword((current) => !current), []);

  const saveStaffWithValidation = useCallback(async (values: StaffFormValues) => {
    try { await saveStaff(values); } catch (error) { applyAdminHrManagementApiValidationErrors(error, form.getValues(), form.setError); }
  }, [form.getValues, form.setError, saveStaff]);

  return { showModal, setShowModal, editId, editData, saveStaff: saveStaffWithValidation, saving, branches: branches as AdminHrBranchReference[], showPassword, togglePasswordVisibility, register, handleSubmit, control, errors, isManager, assignedBranches, getBranchLabel, toggleAssignedBranch, handleClose, STAFF_MODAL_FIELDS, setValue };
}
