// RESPONSIBILITY: Defines feature-local TypeScript contracts for dashboard_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewQueryTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

export interface AdminDashboardStatsParams {
  range: string;
  startDate?: string;
  endDate?: string;
  branchId?: string;
}
