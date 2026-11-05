// RESPONSIBILITY: Defines feature-local TypeScript contracts for dashboard_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewRangeTypes.ts)

export type AdminDashboardRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom' | 'monthly' | 'yearly';
