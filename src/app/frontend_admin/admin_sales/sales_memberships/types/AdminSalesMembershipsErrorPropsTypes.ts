// RESPONSIBILITY: Defines feature-local TypeScript contracts for sales_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_memberships/types/AdminSalesAnalyticsErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminSalesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
