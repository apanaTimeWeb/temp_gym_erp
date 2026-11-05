// RESPONSIBILITY: Branch-filtered mock financial KPIs agree with the returned rows.
import { describe, expect, it } from 'vitest';
import { getAdminFinanceProfitAndLossReportFixture } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/mocks/fixtures/AdminFinanceProfitAndLossReportMockFixtures';

describe('P&L branch-scoped financial totals', () => {
  it('returns the selected branch row and derives its financial totals', () => {
    const result = getAdminFinanceProfitAndLossReportFixture({ gymId: 'g2' });
    expect(result.pnlSummary).toHaveLength(1);
    expect(result.kpis.totalRevenue).toBe(result.pnlSummary[0].revenue);
    expect(result.kpis.totalExpenses).toBe(result.pnlSummary[0].totalExpenses);
    expect(result.kpis.netProfit).toBe(result.pnlSummary[0].netProfit);
  });
  it('returns empty scoped totals for unknown branches while preserving unverified payroll contract', () => {
    const unfiltered = getAdminFinanceProfitAndLossReportFixture({ gymId: 'all' });
    const missing = getAdminFinanceProfitAndLossReportFixture({ gymId: 'invalid-branch' });
    expect(missing.pnlSummary).toHaveLength(0);
    expect(missing.kpis.totalRevenue).toBe(0);
    expect(missing.kpis.netProfit).toBe(0);
    expect(missing.kpis.totalPayroll).toBe(unfiltered.kpis.totalPayroll);
  });
});
