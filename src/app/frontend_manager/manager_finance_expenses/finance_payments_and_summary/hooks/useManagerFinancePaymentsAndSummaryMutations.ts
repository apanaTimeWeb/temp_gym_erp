// DATA FLOW: Payment form payload → useManagerFinancePaymentsAndSummaryMutations → ManagerFinancePaymentsAndSummaryApi → authoritative response → ManagerFinancePaymentsAndSummaryQueryKeys invalidation.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ManagerFinancePaymentsAndSummaryApi } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.api';
import { ManagerFinancePaymentsAndSummaryQueryKeys } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/api/manager_finance_payments_and_summary.query_keys';
import type { ManagerFinancePaymentsAndSummaryPaymentFormOutput } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/schemas/manager_finance_payments_and_summary_payment_form.schemas';

/**
 * @description Owns finance write operations and invalidates payment/summary server state after authoritative API success.
 * @dependencies ManagerFinancePaymentsAndSummaryApi and ManagerFinancePaymentsAndSummaryQueryKeys only.
 * @edge-case Idempotency keys are supplied by the caller per user intent; failed mutations leave query state untouched.
 */
export function useManagerFinancePaymentsAndSummaryMutations() {
  const queryClient = useQueryClient();
  const createPayment = useMutation({
    mutationFn: async ({ payload, idempotencyKey }: { payload: ManagerFinancePaymentsAndSummaryPaymentFormOutput; idempotencyKey: string }) => {
      const response = await ManagerFinancePaymentsAndSummaryApi.createPayment(payload, idempotencyKey);
      if (!response.success) throw new Error(response.message || 'Unable to create payment');
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ManagerFinancePaymentsAndSummaryQueryKeys.all });
    }
  });
  return { createPayment };
}
