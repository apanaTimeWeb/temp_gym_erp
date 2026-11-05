// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin reports module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportBranchReferenceTypes.ts)

export interface AdminFinanceProfitAndLossReportBranchReference { id: string; name: string; }
