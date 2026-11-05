// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_payouts_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementEmptyStatePropsTypes.ts)

export interface AdminPayoutsEmptyStateProps {
  title: string;
  description: string;
}
