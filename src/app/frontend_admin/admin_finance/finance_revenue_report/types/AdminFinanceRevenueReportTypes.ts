// RESPONSIBILITY: Defines only the revenue report contracts owned by admin_finance/finance_revenue_report.
// DATA FLOW: Verified response schema → scoped API → query hook → owning report view.

export type ReportDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom';
export type AdminFinanceRevenueReportExportFormat = 'pdf' | 'csv';
export type AdminFinanceRevenueReportTrendDirection = 'up' | 'down' | 'flat';

export interface RevenueByGym {
gymId: string;
  gymName: string;
  revenue: number;
  expenses: number;
  profit: number;
  trend: AdminFinanceRevenueReportTrendDirection;
  trendPercent: number;
}

export interface RevenueByMethod {
method: string;
  amount: number;
  count: number;
}

export interface RevenueByPlan {
planName: string;
  amount: number;
  count: number;
}

export interface MonthlyRevenue {
month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface AdminFinanceRevenueReportQueryParams { from: string; to: string; branchId?: string; }
export interface AdminFinanceRevenueReportExportParams extends AdminFinanceRevenueReportQueryParams { type: 'revenue'; format: AdminFinanceRevenueReportExportFormat; }

export interface RevenueReportData {
  revenueByGym: RevenueByGym[];
  revenueByMethod: RevenueByMethod[];
  revenueByPlan: RevenueByPlan[];
  monthlyRevenue: MonthlyRevenue[];
  kpis: {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  totalMembers: number;
  newMembers: number;
  avgAttendanceRate: number;
  totalPayroll: number;
  };
}
