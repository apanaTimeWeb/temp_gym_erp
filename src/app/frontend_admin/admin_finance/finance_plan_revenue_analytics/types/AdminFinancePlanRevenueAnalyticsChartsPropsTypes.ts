// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_plan_revenue_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsChartsPropsTypes.ts)

// Type contract owned by this module; extracted from the component signature for AI isolation.

import type { PlanRevenueRecord } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';

export interface AdminPlansRevenueChartsProps {
  data: PlanRevenueRecord[];
}
