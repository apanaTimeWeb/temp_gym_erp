// RESPONSIBILITY: Defines regression tests for AdminBillingUsageAnalyticsFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/utils/AdminBillingUsageAnalyticsFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminUsageFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/utils/AdminBillingUsageAnalyticsFormatCurrency';

describe('AdminUsageFormatCurrency', () => {
  it('formats integer minor units only when a valid currency code is supplied', () => {
    expect(AdminUsageFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
    expect(AdminUsageFormatCurrency(123456, undefined, 'en-IN')).toBe('—');
    expect(AdminUsageFormatCurrency(123456, 'bad', 'en-IN')).toBe('—');
  });
  it('rejects non-finite and fractional minor units', () => {
    expect(AdminUsageFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
    expect(AdminUsageFormatCurrency(123.4, 'INR', 'en-IN')).toBe('—');
  });
});
