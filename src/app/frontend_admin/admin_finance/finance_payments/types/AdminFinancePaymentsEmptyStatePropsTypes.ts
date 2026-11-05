// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_payments; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payments/types/AdminFinanceOverviewEmptyStatePropsTypes.ts)

export interface AdminFinanceEmptyStateProps {
  title: string;
  description: string;
}
