// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_plan_revenue_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminPlansRevenueErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
