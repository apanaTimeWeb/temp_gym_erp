import { describe, expect, it } from 'vitest';
import { calculateSuperadminInvoiceMetrics } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/utils/SuperadminBillingInvoicesManagementMetrics';

describe('calculateSuperadminInvoiceMetrics', () => {
  it('keeps revenue totals separated by currency', () => {
    const metrics = calculateSuperadminInvoiceMetrics([
      { id: '1', tenantId: 't1', tenantName: 'A', amount: 1000, currency: 'INR', status: 'PAID', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Pro' },
      { id: '2', tenantId: 't2', tenantName: 'B', amount: 500, currency: 'USD', status: 'FAILED', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Basic' },
      { id: '3', tenantId: 't3', tenantName: 'C', amount: 700, currency: 'INR', status: 'PENDING', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Basic' },
      { id: '4', tenantId: 't4', tenantName: 'D', amount: 900, currency: 'INR', status: 'OVERDUE', issuedAt: '2026-10-01', dueDate: '2026-10-02', invoiceType: 'RECURRING', planName: 'Enterprise' },
    ] as never);
    expect(metrics.totalsByCurrency.INR).toEqual({ totalRevenue: 1000, failedRevenue: 0, pendingRevenue: 700 });
    expect(metrics.totalsByCurrency.USD.failedRevenue).toBe(500);
    expect(metrics.overdueCount).toBe(1);
  });
});
