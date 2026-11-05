// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_performance_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminHrPerformanceErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
