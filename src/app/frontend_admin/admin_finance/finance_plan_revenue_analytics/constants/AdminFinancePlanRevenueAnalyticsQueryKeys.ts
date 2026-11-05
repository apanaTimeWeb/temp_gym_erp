// RESPONSIBILITY: Defines feature-local constants and query-key contracts for finance_plan_revenue_analytics; it does not contain mutable server data.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_plan_revenue_analytics/constants/AdminFinancePlanRevenueAnalyticsQueryKeys.ts)

export const ADMIN_PLANS_REVENUE_QUERY_KEYS = {
  all: ['admin_plans_revenue'] as const,
  list: (filters?: unknown) => filters === undefined ? ['admin_plans_revenue', 'list'] as const : ['admin_plans_revenue', 'list', filters] as const,
  key: (...segments: readonly unknown[]) => ['admin_plans_revenue', ...segments] as const,
};
