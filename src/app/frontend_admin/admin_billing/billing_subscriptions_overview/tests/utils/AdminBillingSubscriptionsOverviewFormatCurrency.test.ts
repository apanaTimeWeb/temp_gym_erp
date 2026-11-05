// RESPONSIBILITY: Defines regression tests for AdminSubscriptionsManagementFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_subscriptions/subscriptions_overview/tests/utils/AdminSubscriptionsManagementFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatCurrency';

describe('AdminSubscriptionsFormatCurrency', () => {
  it('formats integer minor units only when a valid currency code is supplied', () => {
    expect(AdminSubscriptionsFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
    expect(AdminSubscriptionsFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminSubscriptionsFormatCurrency(123456, 'bad', 'en-IN')).toBe('—');
  });
  it('rejects non-finite and fractional minor units', () => {
    expect(AdminSubscriptionsFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
    expect(AdminSubscriptionsFormatCurrency(123.4, 'INR', 'en-IN')).toBe('—');
  });
});
