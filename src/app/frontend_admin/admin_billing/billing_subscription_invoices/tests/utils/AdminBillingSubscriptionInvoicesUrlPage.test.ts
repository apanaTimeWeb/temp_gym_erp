import { describe, expect, it } from 'vitest';
import { normalizeAdminBillingSubscriptionInvoicesUrlPage } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesUrlPage';
describe('Invoices URL page validation', () => {
  it('keeps valid pages and rejects malformed, unsafe and noncanonical values', () => {
    expect(normalizeAdminBillingSubscriptionInvoicesUrlPage('2')).toBe(2);
    expect(normalizeAdminBillingSubscriptionInvoicesUrlPage(3)).toBe(3);
    for (const value of [null, '', '0', '-1', '2abc', '2e3', '1.5', 'Infinity', ' 3', '01', '9007199254740992', NaN, Infinity, 1.5]) {
      expect(normalizeAdminBillingSubscriptionInvoicesUrlPage(value)).toBe(1);
    }
    expect(normalizeAdminBillingSubscriptionInvoicesUrlPage('100001')).toBe(100000);
  });
});
