import { describe, expect, it } from 'vitest';
import { normalizeAdminSubscriptionInvoicesMockPage } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesMockPageBoundary';

describe('Invoice MSW URL number parsing', () => {
  it.each(['', '0', '-1', '1.5', '2abc', '1e3', '0x10', 'Infinity', 'NaN', '01', '9999999999999999999999'])(
    'rejects noncanonical page %s', (raw) => expect(normalizeAdminSubscriptionInvoicesMockPage(raw, 1)).toBe(1),
  );
  it('preserves positive decimal page/limit and defaults absent values', () => {
    expect(normalizeAdminSubscriptionInvoicesMockPage('12', 1)).toBe(12);
    expect(normalizeAdminSubscriptionInvoicesMockPage('5', 10)).toBe(5);
    expect(normalizeAdminSubscriptionInvoicesMockPage(null, 10)).toBe(10);
    expect(normalizeAdminSubscriptionInvoicesMockPage('2e2', 10)).toBe(10);
  });
});
