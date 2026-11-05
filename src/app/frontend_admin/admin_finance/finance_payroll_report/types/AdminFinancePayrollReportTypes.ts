// RESPONSIBILITY: Defines only the payroll report contracts owned by admin_finance/finance_payroll_report.
// DATA FLOW: Verified response schema → scoped API → query hook → owning report view.

export type ReportDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom';
export type AdminFinancePayrollReportExportFormat = 'pdf' | 'csv';

export interface PayrollSummaryRow {
gymId: string;
  gymName: string;
  totalStaff: number;
  totalPayroll: number;
  paid: number;
  pending: number;
  advances: number;
}

export interface AdminFinancePayrollReportQueryParams { from: string; to: string; branchId?: string; }
export interface AdminFinancePayrollReportExportParams extends AdminFinancePayrollReportQueryParams { type: 'payroll'; format: AdminFinancePayrollReportExportFormat; }

export interface PayrollReportData {
  payrollSummary: PayrollSummaryRow[];
}
