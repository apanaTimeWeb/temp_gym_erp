// RESPONSIBILITY: Owns only the pnl report's source-backed mock response and deterministic branch filtering.
import type { ReportDateRange, PnLReportData } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';

export const MOCK_ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT: PnLReportData = {
  pnlSummary: [
    { gymId: 'g1', gymName: 'Downtown Main', revenue: 1500000, membershipRevenue: 1200000, storeRevenue: 300000, totalExpenses: 800000, staffCost: 450000, operationalCost: 350000, netProfit: 700000, profitMargin: 46.6 },
    { gymId: 'g2', gymName: 'Westside Gym', revenue: 800000, membershipRevenue: 700000, storeRevenue: 100000, totalExpenses: 600000, staffCost: 350000, operationalCost: 250000, netProfit: 200000, profitMargin: 25.0 },
    { gymId: 'g3', gymName: 'Northside Arena', revenue: 400000, membershipRevenue: 330000, storeRevenue: 70000, totalExpenses: 350000, staffCost: 210000, operationalCost: 140000, netProfit: 50000, profitMargin: 12.5 },
  ],
  kpis: { totalRevenue: 2700000, totalExpenses: 1750000, netProfit: 950000, totalPayroll: 1880000 },
};

/** Keeps mock responses inside the owning business workflow; dateRange is accepted for fixture API stability. */
export function getAdminFinanceProfitAndLossReportFixture({ gymId = 'all', dateRange = 'this_month' }: { gymId?: string; dateRange?: ReportDateRange }): PnLReportData {
  void dateRange;
  const pnlSummary = gymId === 'all' ? MOCK_ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT.pnlSummary : MOCK_ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT.pnlSummary.filter((row) => row.gymId === gymId);
  // Derive visible KPI totals from the same scoped rows used in the report table.
  // Preserve the supplied payroll KPI: per-branch payroll is not in this fixture
  // contract, so it must not be synthesized from staff costs.
  const kpis = {
    totalRevenue: pnlSummary.reduce((total, row) => total + row.revenue, 0),
    totalExpenses: pnlSummary.reduce((total, row) => total + row.totalExpenses, 0),
    netProfit: pnlSummary.reduce((total, row) => total + row.netProfit, 0),
    totalPayroll: MOCK_ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT.kpis.totalPayroll,
  };
  return { pnlSummary, kpis };
}
