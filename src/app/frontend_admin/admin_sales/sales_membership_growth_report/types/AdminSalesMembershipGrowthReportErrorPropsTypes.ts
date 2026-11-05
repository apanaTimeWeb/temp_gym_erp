// RESPONSIBILITY: Defines feature-local TypeScript contracts for sales_membership_growth_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportAnalyticsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminSalesMembershipGrowthReportErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
