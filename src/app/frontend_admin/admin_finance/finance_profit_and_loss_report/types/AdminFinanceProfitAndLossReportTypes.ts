// RESPONSIBILITY: Defines only the pnl report contracts owned by admin_finance/finance_profit_and_loss_report.
// DATA FLOW: Verified response schema → scoped API → query hook → owning report view.

export type ReportDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom';
export type AdminFinanceProfitAndLossReportExportFormat = 'pdf' | 'csv';

export interface PnLRow {
gymId: string;
  gymName: string;
  revenue: number;
  membershipRevenue: number;
  storeRevenue: number;
  totalExpenses: number;
  staffCost: number;
  operationalCost: number;
  netProfit: number;
  profitMargin: number;
}

export interface AdminFinanceProfitAndLossReportQueryParams { from: string; to: string; branchId?: string; }
export interface AdminFinanceProfitAndLossReportExportParams extends AdminFinanceProfitAndLossReportQueryParams { type: 'pnl'; format: AdminFinanceProfitAndLossReportExportFormat; }

export interface PnLReportData {
  pnlSummary: PnLRow[];
  kpis: { totalRevenue: number; totalExpenses: number; netProfit: number; totalPayroll: number };
}
