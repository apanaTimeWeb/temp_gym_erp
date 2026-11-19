import { describe, expect, it } from 'vitest';
import { paginateAdminBillingSubscriptionInvoices } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesPaginateInvoices';
import type { Invoice } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/types/AdminBillingSubscriptionInvoicesTypes';

describe('RBG130 invoice page metadata', () => {
  const records = Array.from({ length: 11 }, (_, i) => ({ id: `inv-${i}` } as Invoice));
  it('clamps an obsolete page to a real final page without lying about next/prev', () => {
    const result = paginateAdminBillingSubscriptionInvoices(records, 9999, 10);
    expect(result.page).toBe(2);
    expect(result.items.map(x => x.id)).toEqual(['inv-10']);
    expect(result.totalPages).toBe(2);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPrevPage).toBe(true);
  });
  it('does not expose impossible page metadata for an empty fixture', () => {
    expect(paginateAdminBillingSubscriptionInvoices([], 999, 10)).toMatchObject({ page: 1, totalPages: 1, hasPrevPage: false, hasNextPage: false });
  });
  it('normalizes invalid numeric page and limit inputs', () => {
    for (const invalid of [NaN, Infinity, -Infinity, -1, 0, 1.5]) {
      expect(paginateAdminBillingSubscriptionInvoices(records, invalid, invalid)).toMatchObject({ page: 1, limit: 10, totalPages: 2 });
    }
  });
});
