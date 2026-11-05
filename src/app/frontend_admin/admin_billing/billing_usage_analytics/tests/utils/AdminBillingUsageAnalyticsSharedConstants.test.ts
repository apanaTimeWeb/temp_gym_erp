// RESPONSIBILITY: Defines regression tests for AdminBillingUsageAnalyticsSharedConstants.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/utils/AdminBillingUsageAnalyticsSharedConstants.test.ts)

import { describe, expect, it } from 'vitest';
import { USAGE_WARNING_THRESHOLD, USAGE_CRITICAL_THRESHOLD } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsConstants';

describe('Admin usage thresholds', () => {
  it('uses the documented warning and critical ratios', () => {
    expect(USAGE_WARNING_THRESHOLD).toBe(0.8);
    expect(USAGE_CRITICAL_THRESHOLD).toBe(0.95);
    expect(USAGE_WARNING_THRESHOLD).toBeLessThan(USAGE_CRITICAL_THRESHOLD);
  });
});
