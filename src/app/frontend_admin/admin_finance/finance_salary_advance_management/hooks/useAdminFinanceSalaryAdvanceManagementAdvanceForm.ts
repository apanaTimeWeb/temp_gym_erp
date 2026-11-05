"use client";
// RESPONSIBILITY: Owns RHF/Zod validation, dirty-state protection, selected-staff derivation, and successful-reset behavior for the Admin Finance salary-advance form.
// DATA FLOW: Staff query state → RHF form → Zod validation → HR advance mutation → TanStack Query refresh.

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { useAdminFinanceSalaryAdvanceManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementViewModel';
import { useAdminFinanceSalaryAdvanceManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementUnsavedChangesGuard';
import { adminFinanceSalaryAdvanceManagementAdvanceFormSchema } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/schemas/AdminFinanceSalaryAdvanceManagementAdvanceFormSchema';
import type { AdminFinanceSalaryAdvanceManagementAdvanceFormValues } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementAdvanceFormTypes';
import { ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_DEFAULT_PAYMENT_MODE } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/constants/AdminFinanceSalaryAdvanceManagementConstants';
import { applyAdminFinanceSalaryAdvanceManagementApiValidationErrors } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementApiResponse';

/**
 * @description Manages the Admin Finance advance form from input through validated mutation handoff.
 * @dependencies Consumes feature-owned staff/server state and approved Admin unsaved-change infrastructure.
 * @edge-cases Preserves dirty values after validation/server failure and resets only after a confirmed successful mutation.
 */
export function useAdminFinanceSalaryAdvanceManagementAdvanceForm() {
  const { staff, giveAdvance, saving } = useAdminFinanceSalaryAdvanceManagementViewModel();
  const form = useForm<AdminFinanceSalaryAdvanceManagementAdvanceFormValues>({
    resolver: zodResolver(adminFinanceSalaryAdvanceManagementAdvanceFormSchema) as unknown as Resolver<AdminFinanceSalaryAdvanceManagementAdvanceFormValues>,
    defaultValues: {
      staffId: '',
      amount: 0,
      notes: '',
      paymentMode: ADMIN_FINANCE_SALARY_ADVANCE_MANAGEMENT_DEFAULT_PAYMENT_MODE,
    },
  });
  const selectedStaffId = useWatch({ control: form.control, name: 'staffId' });
  const selectedStaff = useMemo(
    () => staff.find((member) => String(member.id) === String(selectedStaffId)),
    [selectedStaffId, staff],
  );
  const { confirmDiscardIfDirty } = useAdminFinanceSalaryAdvanceManagementUnsavedChangesGuard(form.formState.isDirty);

  const submit = form.handleSubmit(async (values) => {
    try {
      if (await giveAdvance(values)) form.reset();
    } catch (error) {
      applyAdminFinanceSalaryAdvanceManagementApiValidationErrors(error, form.getValues(), form.setError);
      // The mutation layer surfaces the backend error; form values intentionally remain dirty for retry.
    }
  });

  return {
    staff,
    selectedStaff,
    saving: saving || form.formState.isSubmitting,
    form,
    submit,
    confirmDiscardIfDirty,
  };
}
