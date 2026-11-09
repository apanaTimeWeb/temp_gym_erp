import { describe, expect, it } from 'vitest';

import { paymentSchema, financeSummarySchema } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/schemas/manager_finance_payments_and_summary.schemas';

describe('Finance API money schemas', () => {
  it('rejects fractional minor-unit payment amounts', () => {
    const payment = { id: 'p1', memberId: 'm1', amount: 12345, method: 'UPI', status: 'PAID', invoiceNumber: 'INV-1', paidAt: '2026-10-01T10:00:00.000Z', gstAmount: 0, discountAmount: 0, taxableAmount: 12345 };
    expect(paymentSchema.safeParse(payment).success).toBe(true);
    expect(paymentSchema.safeParse({ ...payment, amount: 12345.5 }).success).toBe(false);
  });
  it('rejects fractional report money values', () => {
    const summary = { totalRevenue: 1000, monthlyRevenue: 500, pendingAmount: 0, totalPayments: 1, gstCollected: 0, totalRefunds: 0, netRevenue: 1000, revenueByMethod: { UPI: 1000, Cash: 0, Card: 0, NetBanking: 0, Cheque: 0, Other: 0 }, monthlyData: [{ month: 'Oct', revenue: 1000 }] };
    expect(financeSummarySchema.safeParse(summary).success).toBe(true);
    expect(financeSummarySchema.safeParse({ ...summary, revenueByMethod: { UPI: 1000.5, Cash: 0, Card: 0, NetBanking: 0, Cheque: 0, Other: 0 } }).success).toBe(false);
  });
});
