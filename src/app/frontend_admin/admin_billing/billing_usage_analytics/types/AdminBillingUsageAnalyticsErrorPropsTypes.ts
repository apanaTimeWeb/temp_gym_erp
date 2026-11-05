// RESPONSIBILITY: Defines feature-local TypeScript contracts for usage_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_usage/usage_analytics/types/AdminBillingUsageAnalyticsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminUsageErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
