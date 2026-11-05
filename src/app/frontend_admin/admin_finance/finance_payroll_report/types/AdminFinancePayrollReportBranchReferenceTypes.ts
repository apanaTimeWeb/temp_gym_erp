// RESPONSIBILITY: Defines the minimal branch reference contract owned by the Admin reports module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payroll_report/types/AdminFinancePayrollReportBranchReferenceTypes.ts)

export interface AdminFinancePayrollReportBranchReference { id: string; name: string; }
