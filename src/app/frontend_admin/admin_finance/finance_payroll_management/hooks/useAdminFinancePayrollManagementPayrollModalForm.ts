"use client";
// RESPONSIBILITY: Owns React Hook Form state, automatic payroll amount calculation, dirty-state protection, and modal lifecycle for AdminFinancePayrollManagementPayrollModal.
// DATA FLOW: Staff query → selected staff/month → form amount → Zod validation → HR payroll mutation → TanStack Query refresh.

import React, { useCallback, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { payrollFormSchema } from '@/app/frontend_admin/admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementPayrollFormSchema';
import { useAdminFinancePayrollManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementViewModel';
import { useAdminFinancePayrollManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUnsavedChangesGuard';
import { EMPTY_PAYROLL_FORM } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';
import type { PayrollFormValues } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import { AdminFinancePayrollManagementFromMinorUnits } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementCurrencyUnits';
import { applyAdminFinancePayrollManagementApiValidationErrors } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementApiResponse';

/**
 * @description Manages useAdminFinancePayrollManagementPayrollModalForm for the Admin admin_hr feature, keeping feature-specific orchestration isolated from presentation.
 * @dependencies Uses only documented module API/state dependencies and approved application infrastructure.
 * @edge-case Preserves loading, empty, error, retry, and cancellation behavior defined by the feature contract.
 */
/** Owns payroll form state and derives the read-only amount from the selected staff record. */
export function useAdminFinancePayrollManagementPayrollModalForm() {
  const { showPayrollModal, setShowPayrollModal, savePayroll, saving, staff } = useAdminFinancePayrollManagementViewModel();
  const [calculationInfo, setCalculationInfo] = React.useState('');
  const form = useForm<PayrollFormValues>({    resolver: zodResolver(payrollFormSchema), defaultValues: EMPTY_PAYROLL_FORM });
  const { register, handleSubmit, reset, setValue, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminFinancePayrollManagementUnsavedChangesGuard(isDirty);
  const formValues = useWatch({ control });
  const selectedStaffId = formValues.staffId ?? EMPTY_PAYROLL_FORM.staffId;
  const selectedMonth = formValues.month ?? EMPTY_PAYROLL_FORM.month;

  // EFFECT: Resets the payroll draft and derived calculation when the modal is reopened.
  useEffect(() => {
    if (showPayrollModal) {
      reset(EMPTY_PAYROLL_FORM);
      setCalculationInfo('');
    }
  }, [reset, showPayrollModal]);

  // EFFECT: Keeps the payroll amount synchronized with the selected staff member's base salary.
  useEffect(() => {
    if (!selectedStaffId || !selectedMonth) return;
    const selectedStaff = staff.find((item) => String(item.id) === String(selectedStaffId));
    if (selectedStaff) {
      setValue('amount', AdminFinancePayrollManagementFromMinorUnits(selectedStaff.salary), { shouldDirty: true });
      setCalculationInfo('');
    }
  }, [selectedMonth, selectedStaffId, setValue, staff]);

  const handleClose = useCallback(async () => {
    if (await confirmDiscardIfDirty()) setShowPayrollModal(false);
  }, [confirmDiscardIfDirty, setShowPayrollModal]);

  const savePayrollWithValidation = useCallback(async (data: PayrollFormValues) => {
    try { await savePayroll({ ...data, staffId: data.staffId }); } catch (error) { applyAdminFinancePayrollManagementApiValidationErrors(error, form.getValues(), form.setError); }
  }, [form.getValues, form.setError, savePayroll]);

  return { showPayrollModal, setShowPayrollModal, savePayroll: savePayrollWithValidation, saving, staff, calculationInfo, register, handleSubmit, control, errors, handleClose };
}
