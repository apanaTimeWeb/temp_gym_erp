// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin reports module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportBranchReferenceTypes.ts)

export interface AdminFinanceRevenueReportBranchReference { id: string; name: string; }
