// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_payroll_report; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payroll_report/types/AdminFinancePayrollReportSectionStatePropsTypes.ts)

/** Retryable per-section reporting state props. */
export interface AdminReportsSectionStateProps {
  status: 'pending' | 'success' | 'error';
  onRetry: () => void | Promise<unknown>;
}
