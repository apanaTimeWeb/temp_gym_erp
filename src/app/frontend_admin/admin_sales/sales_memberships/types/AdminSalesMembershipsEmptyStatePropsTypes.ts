// RESPONSIBILITY: Defines feature-local TypeScript contracts for sales_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_memberships/types/AdminSalesAnalyticsEmptyStatePropsTypes.ts)

export interface AdminSalesEmptyStateProps {
  message: string;
  subtext?: string;
}
