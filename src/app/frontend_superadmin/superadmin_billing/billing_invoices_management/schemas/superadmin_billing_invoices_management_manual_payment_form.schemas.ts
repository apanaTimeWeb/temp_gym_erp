import { z } from 'zod';

/**
 * Form-level validation for the documented manual-payment workflow.
 * RESPONSIBILITY: Validates only the UI-owned amount field; gym identity remains owned by the page state.
 */
export const SuperadminBillingInvoicesManualPaymentFormSchema = z.object({
  amount: z.coerce.number().finite().positive('Enter a payment amount greater than 0.').refine((amount) => Math.abs(amount * 100 - Math.round(amount * 100)) <= 1e-8, 'Enter no more than two decimal places.'),
});

export type SuperadminBillingInvoicesManualPaymentFormValues = z.infer<typeof SuperadminBillingInvoicesManualPaymentFormSchema>;
