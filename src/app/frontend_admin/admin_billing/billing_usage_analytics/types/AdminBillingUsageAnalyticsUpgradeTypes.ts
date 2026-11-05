// RESPONSIBILITY: Types for the Admin Usage plan-upgrade request workflow.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_usage/usage_analytics/types/AdminBillingUsageAnalyticsUpgradeTypes.ts)

export type AdminUsageUpgradeStatus = 'pending';

export interface AdminUsageUpgradeRequest {
  requestId: string;
  planName: string;
  status: AdminUsageUpgradeStatus;
  requestedAt: string;
}
