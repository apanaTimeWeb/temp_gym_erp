"use client";
// RESPONSIBILITY: Owns RHF/Zod validation, dirty-state protection, selected-staff derivation, and successful-reset behavior for the Admin Finance due-payment form.
// DATA FLOW: Staff query state → RHF form → Zod validation → HR due-payment mutation → TanStack Query refresh.

import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { useAdminFinanceStaffDuesManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementViewModel';
import { useAdminFinanceStaffDuesManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementUnsavedChangesGuard';
import { adminFinanceStaffDuesManagementDueFormSchema } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/schemas/AdminFinanceStaffDuesManagementDueFormSchema';
import type { AdminFinanceStaffDuesManagementDueFormValues } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementDueFormTypes';
import { ADMIN_FINANCE_STAFF_DUES_MANAGEMENT_DEFAULT_PAYMENT_MODE } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementConstants';
import { applyAdminFinanceStaffDuesManagementApiValidationErrors } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementApiResponse';

/**
 * @description Manages the Admin Finance due-payment form from input through validated mutation handoff.
 * @dependencies Consumes feature-owned staff/server state and approved Admin unsaved-change infrastructure.
 * @edge-cases Preserves dirty values after validation/server failure and resets only after a confirmed successful mutation.
 */
export function useAdminFinanceStaffDuesManagementDueForm() {
  const { staff, payDue, saving } = useAdminFinanceStaffDuesManagementViewModel();
  const form = useForm<AdminFinanceStaffDuesManagementDueFormValues>({
    resolver: zodResolver(adminFinanceStaffDuesManagementDueFormSchema) as unknown as Resolver<AdminFinanceStaffDuesManagementDueFormValues>,
    defaultValues: {
      staffId: '',
      amount: 0,
      notes: '',
      paymentMode: ADMIN_FINANCE_STAFF_DUES_MANAGEMENT_DEFAULT_PAYMENT_MODE,
    },
  });
  const selectedStaffId = useWatch({ control: form.control, name: 'staffId' });
  const selectedStaff = useMemo(
    () => staff.find((member) => String(member.id) === String(selectedStaffId)),
    [selectedStaffId, staff],
  );
  const { confirmDiscardIfDirty } = useAdminFinanceStaffDuesManagementUnsavedChangesGuard(form.formState.isDirty);

  const submit = form.handleSubmit(async (values) => {
    try {
      if (await payDue(values)) form.reset();
    } catch (error) {
      applyAdminFinanceStaffDuesManagementApiValidationErrors(error, form.getValues(), form.setError);
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
