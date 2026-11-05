// RESPONSIBILITY: Owns only the revenue report's source-backed mock response and deterministic branch filtering.
import type { ReportDateRange, RevenueReportData } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportTypes';

export const MOCK_ADMIN_FINANCE_REVENUE_REPORT: RevenueReportData = {
  revenueByGym: [
    { gymId: 'g1', gymName: 'Downtown Main', revenue: 1500000, expenses: 800000, profit: 700000, trend: 'up', trendPercent: 5 },
    { gymId: 'g2', gymName: 'Westside Gym', revenue: 800000, expenses: 600000, profit: 200000, trend: 'up', trendPercent: 2 },
    { gymId: 'g3', gymName: 'Northside Arena', revenue: 400000, expenses: 350000, profit: 50000, trend: 'down', trendPercent: -3 },
  ],
  revenueByMethod: [
    { method: 'UPI', amount: 1200000, count: 450 },
    { method: 'Card', amount: 800000, count: 200 },
    { method: 'Cash', amount: 400000, count: 150 },
    { method: 'NetBanking', amount: 300000, count: 100 },
  ],
  revenueByPlan: [
    { planName: 'Annual Pro', amount: 1500000, count: 300 },
    { planName: 'Quarterly Classic', amount: 800000, count: 400 },
    { planName: 'Monthly Basic', amount: 400000, count: 400 },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 2000000, expenses: 1500000, profit: 500000 },
    { month: 'Feb', revenue: 2200000, expenses: 1500000, profit: 700000 },
    { month: 'Mar', revenue: 2100000, expenses: 1600000, profit: 500000 },
    { month: 'Apr', revenue: 2500000, expenses: 1600000, profit: 900000 },
    { month: 'May', revenue: 2400000, expenses: 1500000, profit: 900000 },
    { month: 'Jun', revenue: 2700000, expenses: 1750000, profit: 950000 },
  ],
  kpis: {
    totalRevenue: 2700000,
    totalExpenses: 1750000,
    netProfit: 950000,
    totalMembers: 12500,
    newMembers: 850,
    avgAttendanceRate: 71.8,
    totalPayroll: 1880000,
  },
};

/** Keeps mock responses inside the owning business workflow; dateRange is accepted for fixture API stability. */
export function getAdminFinanceRevenueReportFixture({ gymId = 'all', dateRange = 'this_month' }: { gymId?: string; dateRange?: ReportDateRange }): RevenueReportData {
  void dateRange;
  const revenueByGym = gymId === 'all' ? MOCK_ADMIN_FINANCE_REVENUE_REPORT.revenueByGym : MOCK_ADMIN_FINANCE_REVENUE_REPORT.revenueByGym.filter((row) => row.gymId === gymId);
  const ratio = gymId === 'all' ? 1 : Math.max(0.01, revenueByGym.reduce((sum, row) => sum + row.revenue, 0) / Math.max(1, MOCK_ADMIN_FINANCE_REVENUE_REPORT.kpis.totalRevenue));
  const scale = (value: number) => Math.round(value * ratio);
  return { ...MOCK_ADMIN_FINANCE_REVENUE_REPORT, revenueByGym,
    revenueByMethod: MOCK_ADMIN_FINANCE_REVENUE_REPORT.revenueByMethod.map((row) => ({ ...row, amount: scale(row.amount), count: scale(row.count) })),
    revenueByPlan: MOCK_ADMIN_FINANCE_REVENUE_REPORT.revenueByPlan.map((row) => ({ ...row, amount: scale(row.amount), count: scale(row.count) })),
    kpis: { ...MOCK_ADMIN_FINANCE_REVENUE_REPORT.kpis, totalRevenue: revenueByGym.reduce((sum, row) => sum + row.revenue, 0), totalExpenses: revenueByGym.reduce((sum, row) => sum + row.expenses, 0), netProfit: revenueByGym.reduce((sum, row) => sum + row.profit, 0) },
  };
}
