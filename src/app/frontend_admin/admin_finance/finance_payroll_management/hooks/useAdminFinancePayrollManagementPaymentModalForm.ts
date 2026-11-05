"use client";
// RESPONSIBILITY: Renders the useAdminFinancePayrollManagementPaymentModalForm UI surface for hr_management; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → useAdminFinancePayrollManagementPaymentModalForm → accessible UI/events routed to owning hooks (admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPaymentModalForm.ts)

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminFinancePayrollManagementPaymentFormSchema } from '@/app/frontend_admin/admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementPaymentFormSchema';
import type { AdminFinancePayrollManagementPaymentFormValues } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementPaymentFormTypes';
import { useAdminFinancePayrollManagementViewModel } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementViewModel';
import { useAdminFinancePayrollManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUnsavedChangesGuard';
import { AdminFinancePayrollManagementFromMinorUnits } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementCurrencyUnits';
import { applyAdminFinancePayrollManagementApiValidationErrors } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementApiResponse';

/**
 * @description Owns the Admin Finance payroll-payment form lifecycle and exposes only the state/actions the modal view needs.
 * @dependencies React Hook Form/Zod, Admin Finance view-model mutation state, locale translations, and the Admin unsaved-change guard.
 * @edge-case Resets when the selected payroll intent changes and preserves dirty state when the mutation fails.
 */
export function useAdminFinancePayrollManagementPaymentModalForm() {
  const locale = useLocale();
  const t = useTranslations();
  const { paymentModal, setPaymentModal, markPayrollPaid } = useAdminFinancePayrollManagementViewModel();
  const form = useForm<AdminFinancePayrollManagementPaymentFormValues>({
    resolver: zodResolver(adminFinancePayrollManagementPaymentFormSchema),
    defaultValues: { amount: 0 },
    mode: 'onChange',
  });
  useAdminFinancePayrollManagementUnsavedChangesGuard(form.formState.isDirty);

  useEffect(() => {
    form.reset({ amount: AdminFinancePayrollManagementFromMinorUnits(paymentModal?.pendingAmount) });
  }, [form, paymentModal]);

  const submit = form.handleSubmit(async ({ amount }) => {
    if (!paymentModal) return false;
    try {
      const result = await markPayrollPaid(paymentModal.payrollId, amount);
      if (result !== false) {
        form.reset({ amount: 0 });
        setPaymentModal(null);
      }
      return result;
    } catch (error) {
      applyAdminFinancePayrollManagementApiValidationErrors(error, form.getValues(), form.setError);
      return false;
    }
  });

  return { locale, t, paymentModal, setPaymentModal, form, amount: form.watch('amount'), submit };
}
