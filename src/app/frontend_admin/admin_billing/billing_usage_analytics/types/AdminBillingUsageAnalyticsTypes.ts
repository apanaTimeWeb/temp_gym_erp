// RESPONSIBILITY: TypeScript types for the Admin Usage & Subscription module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_usage/usage_analytics/types/AdminBillingUsageAnalyticsTypes.ts)

export type AdminUsagePlanTierName = 'Starter' | 'Growth' | 'Pro' | 'Enterprise';

export interface AdminUsageHistoryPoint {
  date: string;
  membersUsed: number;
  storageUsedGb: number;
  smsUsed: number;
}

export interface AdminUsageData {
  tenantId: string;
  planName: string;
  planTier: AdminUsagePlanTierName;
  billingCycleEnd: string;
  monthlyPrice: number;
  smsSent: number;
  smsLimit: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  activeMembers: number;
  memberLimit: number;
  staffCount: number;
  staffLimit: number;
  branchCount: number;
  branchLimit: number;
  apiCallsToday: number;
  apiCallsLimit: number;
  usageHistory: AdminUsageHistoryPoint[];
}

export interface AdminUsageMetric {
  label: string;
  used: number;
  limit: number;
  unit: string;
  warningThreshold: number;
  criticalThreshold: number;
}

export interface AdminUsagePlanTier {
  name: string;
  nameKey: string;
  price: number;
  features: readonly string[];
  isCurrent: boolean;
}

export interface AdminUsagePlanCardProps {
  planTiers: readonly AdminUsagePlanTier[];
  onRequestUpgrade: (planName: string) => Promise<void>;
  pendingUpgradePlan: string | null;
}
