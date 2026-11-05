// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_revenue_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportErrorPropsTypes.ts)

// Type contract for the framework-owned error boundary of this feature.
export interface AdminReportsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
