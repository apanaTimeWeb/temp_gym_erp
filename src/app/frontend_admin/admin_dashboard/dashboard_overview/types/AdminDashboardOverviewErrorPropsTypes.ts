// RESPONSIBILITY: Defines feature-local TypeScript contracts for dashboard_overview; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminDashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
