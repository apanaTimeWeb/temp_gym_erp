import { describe, expect, it } from 'vitest';
import { managerFinancePaymentFormSchema } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/schemas/manager_finance_payments_and_summary_payment_form.schemas';

describe('Manager Finance payment form schema input/output parity', () => {
  it('coerces amount and supplies the default notes field', () => {
    const result = managerFinancePaymentFormSchema.safeParse({ memberId: 'member-1', amount: '100', method: 'UPI', paidAt: '2026-10-19' });
    expect(result.success).toBe(true);
    if (result.success) { expect(result.data.amount).toBe(100); expect(result.data.notes).toBe(''); }
  });
});
