// RESPONSIBILITY: Centralizes route and endpoint constants for finance_plan_revenue_analytics; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_finance_plan_revenue_analytics.url_config.ts → internal route constants or existing backend API URLs.

/** Canonical route and preserved plan revenue API contract. */
export const ADMIN_PLANS_REVENUE_ROUTES = { root: '/frontend_admin/admin_finance/finance_plan_revenue_analytics' as const, dashboardFallback: '/frontend_admin/admin_dashboard/dashboard_overview' as const } as const;
export const ADMIN_PLANS_REVENUE_API_URL = '/admin/plans/fetchPlanRevenue' as const;
