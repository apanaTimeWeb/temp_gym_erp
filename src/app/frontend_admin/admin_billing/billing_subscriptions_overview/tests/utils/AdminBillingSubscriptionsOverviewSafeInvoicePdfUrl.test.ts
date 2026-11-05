// RESPONSIBILITY: Regression coverage for invoice PDF URL trust boundaries in this autonomous leaf.
import { describe, expect, it } from 'vitest';
import { isSafeAdminSubscriptionsInvoicePdfUrl } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewSafeInvoicePdfUrl';

describe('billing_subscriptions_overview invoice URL safety', () => {
  it.each(['/api/invoices/inv-1.pdf', '/api/invoices/invoice%201.pdf?download=1', '/admin/invoices/inv_42.pdf'])('allows a same-origin invoice path %s', (value) => {
    expect(isSafeAdminSubscriptionsInvoicePdfUrl(value)).toBe(true);
  });
  it.each([
    '', 'https://attacker.example/invoice.pdf', '//attacker.example/invoice.pdf',
    'javascript:alert(1)', '/\\attacker.example', '/api/../admin',
    '/api/%2e%2e/admin', '/api/%2E./admin', '/api/%2f%2fattacker.example/invoice.pdf',
    '/api/%5cadmin', '/api/%00invoice.pdf', '/api/%zzinvoice.pdf',
    '/api/invoice.pdf\n',
  ])('blocks a malformed or unsafe invoice path %s', (value) => {
    expect(isSafeAdminSubscriptionsInvoicePdfUrl(value)).toBe(false);
  });
});
