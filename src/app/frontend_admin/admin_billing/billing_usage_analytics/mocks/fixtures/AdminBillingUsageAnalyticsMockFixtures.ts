// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_usage/usage_analytics/mocks/fixtures/AdminBillingUsageAnalyticsMockFixtures.ts)
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin usage feature.
import type { AdminUsageData } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin usage feature.

export const MOCK_ADMIN_USAGE_DATA: AdminUsageData = {
  tenantId: 't1',
  planName: 'Growth',
  planTier: 'Growth',
  billingCycleEnd: '2026-11-15T00:00:00Z',
  monthlyPrice: 4999,
  smsSent: 8500,
  smsLimit: 10000,
  databaseGb: 3.5,
  mediaGb: 15.2,
  storageLimitGb: 25,
  activeMembers: 12500,
  memberLimit: 15000,
  staffCount: 125,
  staffLimit: 200,
  branchCount: 4,
  branchLimit: 5,
  apiCallsToday: 45000,
  apiCallsLimit: 100000,
  usageHistory: [
    { date: '2026-10-01', membersUsed: 11500, storageUsedGb: 16.5, smsUsed: 1200 },
    { date: '2026-10-08', membersUsed: 11800, storageUsedGb: 17.2, smsUsed: 3500 },
    { date: '2026-10-15', membersUsed: 12500, storageUsedGb: 18.7, smsUsed: 8500 },
  ],
};




// --- Admin Notifications ---
