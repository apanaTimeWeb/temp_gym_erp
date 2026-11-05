import { describe, expect, it } from 'vitest';

import { SuperadminBillingInvoicesManualPaymentFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/schemas/superadmin_billing_invoices_management_manual_payment_form.schemas';



describe('SuperadminBillingInvoicesManualPaymentFormSchema', () => {
  it('accepts positive numeric strings from form inputs and coerces them to numbers', () => {
    expect(SuperadminBillingInvoicesManualPaymentFormSchema.parse({ amount: '1250' })).toEqual({ amount: 1250 });
  });

  it.each([
    { amount: 0 },
    { amount: -1 },
    { amount: 'not-a-number' },
  ])('rejects an invalid manual payment amount: $amount', (value) => {
    expect(SuperadminBillingInvoicesManualPaymentFormSchema.safeParse(value).success).toBe(false);
  });
});

it('rejects amounts with precision finer than INR paise', () => {
  expect(SuperadminBillingInvoicesManualPaymentFormSchema.safeParse({ amount: 10.25 }).success).toBe(true);
  expect(SuperadminBillingInvoicesManualPaymentFormSchema.safeParse({ amount: 10.255 }).success).toBe(false);
});
