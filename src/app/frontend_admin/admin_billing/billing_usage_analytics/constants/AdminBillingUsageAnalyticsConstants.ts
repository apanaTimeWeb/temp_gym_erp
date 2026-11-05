// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_usage/usage_analytics/constants/AdminBillingUsageAnalyticsConstants.ts)

export const USAGE_UPGRADE_REQUEST_STATUS = { PENDING: 'pending' } as const;

export const USAGE_WARNING_THRESHOLD = 0.8;
export const USAGE_CRITICAL_THRESHOLD = 0.95;
export const PLAN_TIERS = [
  {
    name: 'Starter',
    nameKey: 'usage.AdminUsagePlans.starter.name',
    price: 1999,
    features: ['usage.AdminUsagePlans.starter.features.branch', 'usage.AdminUsagePlans.starter.features.members', 'usage.AdminUsagePlans.starter.features.staff', 'usage.AdminUsagePlans.starter.features.sms', 'usage.AdminUsagePlans.starter.features.storage'],
  },
  {
    name: 'Growth',
    nameKey: 'usage.AdminUsagePlans.growth.name',
    price: 4999,
    features: ['usage.AdminUsagePlans.growth.features.branches', 'usage.AdminUsagePlans.growth.features.members', 'usage.AdminUsagePlans.growth.features.staff', 'usage.AdminUsagePlans.growth.features.sms', 'usage.AdminUsagePlans.growth.features.storage'],
  },
  {
    name: 'Pro',
    nameKey: 'usage.AdminUsagePlans.pro.name',
    price: 9999,
    features: ['usage.AdminUsagePlans.pro.features.branches', 'usage.AdminUsagePlans.pro.features.members', 'usage.AdminUsagePlans.pro.features.staff', 'usage.AdminUsagePlans.pro.features.sms', 'usage.AdminUsagePlans.pro.features.storage'],
  },
  {
    name: 'Enterprise',
    nameKey: 'usage.AdminUsagePlans.enterprise.name',
    price: 0,
    features: ['usage.AdminUsagePlans.enterprise.features.branches', 'usage.AdminUsagePlans.enterprise.features.members', 'usage.AdminUsagePlans.enterprise.features.staff', 'usage.AdminUsagePlans.enterprise.features.sms', 'usage.AdminUsagePlans.enterprise.features.storage'],
  },
] as const;
