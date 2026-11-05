// DATA FLOW: Owning module inputs → this hook state/derived result → consuming module-owned components.
'use client';
import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';

import { EMPTY_STAFF } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_form_defaults.constants';
import { useManagerStaffDirectoryContext } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryUIState';
import { managerHrStaffFormSchema } from '@/app/frontend_manager/manager_staff_hr/staff_directory/schemas/manager_staff_payroll_and_attendance_staff_form.schemas';
import type { StaffFormInput, StaffFormValues } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_payroll_and_attendance_form.types';


/** Coordinates staff editor lifecycle independently of the modal rendering tree. */
/**
 * @description Coordinates hr feature state and its documented UI/API boundary through useManagerStaffPayrollAndAttendanceStaffForm.
 * @dependencies Uses useManagerStaffPayrollAndAttendanceLogic, ManagerStaffPayrollAndAttendanceStaffFormSchema, ManagerStaffPayrollAndAttendanceFormTypes, ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStaffPayrollAndAttendanceStaffForm owns the hr feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStaffPayrollAndAttendanceStaffForm() {
  const { showModal, setShowModal, editId, editData, saveStaff, saving } = useManagerStaffDirectoryContext();
  const form = useForm<StaffFormInput, unknown, StaffFormValues>({ resolver: zodResolver(managerHrStaffFormSchema), defaultValues: EMPTY_STAFF });
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showModal) return;
    const source = (editData as Partial<StaffFormValues> | null) ?? {};
    form.reset({
      ...EMPTY_STAFF,
      ...source,
      salary: source.salary === undefined ? 0 : ManagerInfrastructureFromManagerMinorUnits(Number(source.salary)),
      advanceSalary: source.advanceSalary === undefined ? 0 : ManagerInfrastructureFromManagerMinorUnits(Number(source.advanceSalary)),
      joinDate: source.joinDate ? new Date(source.joinDate).toISOString().slice(0, 10) : EMPTY_STAFF.joinDate,
    });
  }, [editData, form, showModal]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowModal(false)); };
  const submit = form.handleSubmit(async (values) => { await saveStaff(values); form.reset(values); });
  return { showModal, editId, saving, form, handleClose, submit };
}
