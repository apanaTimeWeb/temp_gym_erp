'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useSuperadminBillingInvoicesManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementUnsavedChangesGuard';
import { SuperadminBillingInvoicesManualPaymentFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_manual_payment_form.schemas';
import { applySuperadminBillingInvoicesManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementFormApiErrors';

import type { SuperadminBillingInvoicesManualPaymentFormValues } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_manual_payment_form.schemas';


// DATA FLOW: Manual payment fields → React Hook Form/Zod → owning page mutation → query invalidation → updated invoice table.
// RESPONSIBILITY: Owns manual-payment form setup and submit contract; it does not call the API directly.
/**
 * @description Owns manual-payment form state, Zod validation, and submission-state handling for the invoice modal.
 * @dependencies React Hook Form, Zod resolver, and the parent feature mutation callback.
 * @edge-case Failed mutations do not reset the entered amount; the form resets only after the parent confirms the payment was recorded.
 */
export function useSuperadminBillingInvoicesManagementManualPaymentForm(onSave: (amount: number) => Promise<boolean>, unsavedChangesMessage = 'Unsaved manual payment changes') {
  const form = useForm<SuperadminBillingInvoicesManualPaymentFormValues>({
    resolver: zodResolver(SuperadminBillingInvoicesManualPaymentFormSchema) as any,
    defaultValues: { amount: undefined },
  });

  useSuperadminBillingInvoicesManagementUnsavedChangesGuard(form.formState.isDirty && !form.formState.isSubmitting, unsavedChangesMessage);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const recorded = await onSave(values.amount);
      if (recorded) form.reset();
    } catch (error: unknown) {
      applySuperadminBillingInvoicesManagementFormApiErrors(error, form.setError, ['amount']);
    }
  });

  return {
    register: form.register,
    handleSubmit,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
  };
}

