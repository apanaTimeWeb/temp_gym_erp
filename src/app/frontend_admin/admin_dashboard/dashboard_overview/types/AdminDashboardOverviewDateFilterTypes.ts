// RESPONSIBILITY: Defines feature-local TypeScript contracts for dashboard_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewDateFilterTypes.ts)

export type AdminDashboardDateFilterRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'monthly' | 'yearly' | 'custom';
