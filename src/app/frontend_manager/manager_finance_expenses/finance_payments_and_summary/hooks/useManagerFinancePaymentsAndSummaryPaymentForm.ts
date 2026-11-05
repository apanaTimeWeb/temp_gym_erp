// DATA FLOW: Finance payment form → RHF/Zod → useManagerFinancePaymentsAndSummaryMutations → ManagerFinancePaymentsAndSummaryApi → authoritative response → query invalidation/UI close.
'use client';

import { useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import { useManagerFinancePaymentsAndSummaryMutations } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryMutations';
import { managerFinancePaymentFormSchema } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/schemas/manager_finance_payments_and_summary_payment_form.schemas';
import { useManagerFinancePaymentsAndSummaryUiStore } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/state/useManagerFinancePaymentsAndSummaryUiStore';
import type { ManagerFinancePaymentsAndSummaryPaymentFormInput, ManagerFinancePaymentsAndSummaryPaymentFormOutput } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/types/manager_finance_payments_and_summary_payment_form.types';

/**
 * @description Coordinates the Finance payment form from RHF/Zod through the dedicated mutation hook.
 * @dependencies Finance form schema, mutation hook, UI store, idempotency and toast infrastructure.
 * @edge-case Reset and close happen only after authoritative mutation success; failed submissions preserve user input.
 */
export function useManagerFinancePaymentsAndSummaryPaymentForm() {
  const ui = useManagerFinancePaymentsAndSummaryUiStore();
  const { createPayment } = useManagerFinancePaymentsAndSummaryMutations();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ManagerFinancePaymentsAndSummaryPaymentFormInput, unknown, ManagerFinancePaymentsAndSummaryPaymentFormOutput>({
    resolver: zodResolver(managerFinancePaymentFormSchema),
    defaultValues: { memberId: '', amount: 0, method: 'UPI', notes: '', paidAt: new Date().toISOString().slice(0, 10) },
    mode: 'onSubmit'
  });

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(
    form.formState.isDirty && !createPayment.isPending,
  );
  const close = () => {
    if (!createPayment.isPending) {
      void confirmAndClose(() => ui.setShowModal(false));
    }
  };
  const submit = form.handleSubmit(async (values) => {
    const key = idempotencyKeyRef.current ?? ManagerInfrastructureIdempotency();
    idempotencyKeyRef.current = key;
    try {
      const response = await createPayment.mutateAsync({ payload: values, idempotencyKey: key });
      ManagerInfrastructureShowSuccessToast(response.message, 'manager-finance-payment-success');
      idempotencyKeyRef.current = null;
      form.reset({ memberId: '', amount: 0, method: 'UPI', notes: '', paidAt: new Date().toISOString().slice(0, 10) });
      ui.setShowModal(false);
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, 'manager-finance-payment-error');
    }
  });
  return { form, createPayment, close, submit };
}
