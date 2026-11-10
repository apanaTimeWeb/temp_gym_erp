import { z } from 'zod';

import { FINANCE_PAYMENT_METHOD_VALUES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/constants/manager_finance_payments_and_summary_shared.constants';

/**
 * @description Validates manager-entered finance payment data before it crosses the API boundary.
 * @dependencies Local payment method vocabulary.
 * @edge-case Rejects non-positive amounts and missing member identity while allowing optional notes.
 */
export const managerFinancePaymentFormSchema = z.object({
  memberId: z.string().trim().min(1),
  amount: z.coerce.number().positive(),
  method: z.enum(FINANCE_PAYMENT_METHOD_VALUES),
  notes: z.string().trim().max(500).default(''),
  paidAt: z.string().min(1),
  paymentType: z.enum(['FULL', 'PARTIAL', 'DUE_SETTLEMENT']).optional().default('FULL'),
  remainingDue: z.coerce.number().min(0).optional().default(0),
  nextDueDate: z.string().optional().or(z.literal('')),
});
export type ManagerFinancePaymentsAndSummaryPaymentFormInput = z.input<typeof managerFinancePaymentFormSchema>;
export type ManagerFinancePaymentsAndSummaryPaymentFormOutput = z.output<typeof managerFinancePaymentFormSchema>;
