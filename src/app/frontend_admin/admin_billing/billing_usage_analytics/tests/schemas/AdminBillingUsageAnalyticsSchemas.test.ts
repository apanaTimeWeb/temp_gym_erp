// RESPONSIBILITY: Defines regression tests for AdminBillingUsageAnalyticsSchemas.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/schemas/AdminBillingUsageAnalyticsSchemas.test.ts)

import { describe, expect, it } from 'vitest';
import { adminUsageDataSchema } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/schemas/AdminBillingUsageAnalyticsSchemas';
import { MOCK_ADMIN_USAGE_DATA } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/mocks/fixtures/AdminBillingUsageAnalyticsMockFixtures';
import { adminUsageUpgradePayloadSchema } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/schemas/AdminBillingUsageAnalyticsUpgradeSchemas';

describe('Admin Usage response and upgrade schemas', () => {
  it('accepts the supplied billing-cycle ISO datetime while keeping history dates date-only', () => {
    expect(adminUsageDataSchema.safeParse(MOCK_ADMIN_USAGE_DATA).success).toBe(true);
    expect(adminUsageDataSchema.safeParse({
      ...MOCK_ADMIN_USAGE_DATA,
      usageHistory: [{ date: '2026-10-15T00:00:00Z', membersUsed: 1, storageUsedGb: 1, smsUsed: 1 }],
    }).success).toBe(false);
  });

  it('rejects unknown or unapproved plan tiers in upgrade requests', () => {
    expect(adminUsageUpgradePayloadSchema.safeParse({ planName: 'Pro' }).success).toBe(true);
    expect(adminUsageUpgradePayloadSchema.safeParse({ planName: 'Ultra' }).success).toBe(false);
    expect(adminUsageUpgradePayloadSchema.safeParse({ planName: 'Enterprise', tenantId: 'client-controlled' }).success).toBe(false);
  });
});
