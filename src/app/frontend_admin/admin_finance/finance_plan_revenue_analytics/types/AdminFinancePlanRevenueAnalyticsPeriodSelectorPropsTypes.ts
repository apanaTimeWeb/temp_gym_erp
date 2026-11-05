// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_plan_revenue_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsPeriodSelectorPropsTypes.ts)

import type { RevenuePeriod } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
export interface AdminPlansRevenuePeriodSelectorProps {
  period: RevenuePeriod;
  onPeriodChange: (p: RevenuePeriod) => void;
}
