// RESPONSIBILITY: Defines feature-local TypeScript contracts for dashboard_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewDateRangeTypes.ts)

/** Inclusive local-calendar range for Dashboard trend requests. */
export interface AdminDashboardDateRange { startDate: string; endDate: string }
