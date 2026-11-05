// RESPONSIBILITY: Defines feature-local TypeScript contracts for sales_membership_growth_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportAnalyticsSectionStatePropsTypes.ts)

/** Retryable per-section reporting state props. */
export interface AdminSalesMembershipGrowthReportSectionStateProps {
  status: 'pending' | 'success' | 'error';
  onRetry: () => void | Promise<unknown>;
}
