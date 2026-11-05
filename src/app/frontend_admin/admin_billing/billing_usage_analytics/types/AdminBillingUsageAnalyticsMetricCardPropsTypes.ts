// RESPONSIBILITY: Defines feature-local TypeScript contracts for usage_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_usage/usage_analytics/types/AdminBillingUsageAnalyticsMetricCardPropsTypes.ts)

import type { AdminUsageMetric } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';
export interface AdminUsageMetricCardProps {
  metric: AdminUsageMetric;
  onUpgrade?: () => void;
}
