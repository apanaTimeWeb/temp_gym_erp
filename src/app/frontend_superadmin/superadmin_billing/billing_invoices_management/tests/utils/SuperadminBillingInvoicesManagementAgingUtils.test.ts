import { describe, expect, it } from 'vitest';
import { calculateSuperadminBillingInvoicesAging } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementAgingUtils';

describe('calculateSuperadminBillingInvoicesAging', () => {
  it('throws instead of treating malformed dates as overdue', () => {
    expect(() => calculateSuperadminBillingInvoicesAging([{ id: 'invalid-date', status: 'PENDING', amount: 1000, currency: 'INR', dueDate: 'not-a-date', tenantName: 'A' } as never], new Date('2026-09-20T12:00:00.000Z'))).toThrow(RangeError);
  });
  it('rejects impossible date-only values instead of normalizing them into another month', () => {
    expect(() => calculateSuperadminBillingInvoicesAging([{ id: 'invalid-calendar', status: 'PENDING', amount: 1000, currency: 'INR', dueDate: '2026-02-31', tenantName: 'A' } as never], new Date(2026, 2, 1, 12))).toThrow(RangeError);
  });
  it('keeps aging totals separate by currency', () => {
    const result = calculateSuperadminBillingInvoicesAging([
      { id: '1', tenantId: 't1', tenantName: 'A', status: 'PENDING', amount: 1000, currency: 'INR', dueDate: '2026-09-10', issuedAt: '2026-09-01', invoiceType: 'RECURRING', planName: 'Pro' },
      { id: '2', tenantId: 't2', tenantName: 'B', status: 'PENDING', amount: 300, currency: 'USD', dueDate: '2026-09-10', issuedAt: '2026-09-01', invoiceType: 'RECURRING', planName: 'Pro' },
      { id: '3', tenantId: 't3', tenantName: 'C', status: 'PAID', amount: 2000, currency: 'INR', dueDate: '2026-09-01', issuedAt: '2026-09-01', invoiceType: 'RECURRING', planName: 'Pro' },
    ] as never, new Date('2026-09-20T12:00:00.000Z'));
    expect(result.totalUnpaidByCurrency).toEqual({ INR: 1000, USD: 300 });
    expect(result.agingBuckets['0-30 Days'].count).toBe(2);
    expect(result.agingBuckets['0-30 Days'].amountByCurrency).toEqual({ INR: 1000, USD: 300 });
  });
  it('treats a date-only due date as its calendar date regardless of UTC parsing conventions', () => {
    const result = calculateSuperadminBillingInvoicesAging([{ id: 'date-only', tenantId: 't1', tenantName: 'A', status: 'PENDING', amount: 1, currency: 'INR', dueDate: '2026-09-20', issuedAt: '2026-09-01', invoiceType: 'RECURRING', planName: 'Pro' }] as never, new Date(2026, 8, 20, 12));
    expect(result.agingBuckets['Not Yet Due'].count).toBe(1);
  });
});
