import { describe, expect, it } from 'vitest';
import { paginateAdminFinanceSubscriptionInvoices } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewPaginateInvoices';
import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewTypes';

describe('Subscription Overview invoice pagination numeric safety', () => {
  const invoices = Array.from({ length: 25 }, (_, index) => ({ id: `invoice-${index + 1}` })) as Invoice[];
  it('normalizes non-finite and fractional values', () => {
    for (const invalid of [Number.NaN, Infinity, -Infinity, 0, -1, 1.5]) {
      const result = paginateAdminFinanceSubscriptionInvoices(invoices, invalid, invalid);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(3);
      expect(result.items).toHaveLength(10);
    }
  });
  it('caps excessive page sizes and retains correct metadata', () => {
    const result = paginateAdminFinanceSubscriptionInvoices(invoices, 2, 900);
    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
    expect(result.items).toHaveLength(10);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPrevPage).toBe(true);
  });
});
