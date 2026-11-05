// RESPONSIBILITY: Defines regression tests for AdminSubscriptionsManagementFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_subscription_invoices/tests/utils/AdminSubscriptionsManagementFormatters.test.ts)

import { describe, expect, it } from 'vitest';
import { formatDate } from '@/app/frontend_admin/admin_billing/billing_subscription_invoices/utils/AdminBillingSubscriptionInvoicesFormatters';

describe('AdminSubscriptionsFormatters', () => {
  it('formats billing dates using the requested locale', () => {
    expect(formatDate('2026-01-05', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/);
  });
});
