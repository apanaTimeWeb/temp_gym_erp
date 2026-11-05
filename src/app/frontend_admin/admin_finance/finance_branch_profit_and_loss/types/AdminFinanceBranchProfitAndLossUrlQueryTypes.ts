// RESPONSIBILITY: Defines feature-local TypeScript contracts for finance_branch_profit_and_loss; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossUrlQueryTypes.ts)

export interface AdminFinancePnlUrlQueryBinding {
  key: string; value: string | number | boolean | null | undefined; defaultValue?: string | number | boolean | null;
  setValue?: (value: string | null) => void;
}
