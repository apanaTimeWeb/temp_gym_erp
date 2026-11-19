// RBG115: export button must not offer stale cached data during a pending refetch.
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AdminFinanceBranchProfitAndLoss from '../../components/main_view/AdminFinanceBranchProfitAndLoss';
import { MOCK_ADMIN_BRANCH_PNL } from '../../mocks/fixtures/AdminFinanceBranchProfitAndLossMockFixtures';
const usePnl = vi.fn();
vi.mock('../../hooks/useAdminFinanceBranchProfitAndLossLogic', () => ({ useAdminFinancePnlLogic: () => usePnl() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('../../components/charts/AdminFinanceBranchProfitAndLossCharts', () => ({default: () => null}));
describe('RBG115 export pending gate', () => {
  it('disables export while pending even with cached rows', () => {
    usePnl.mockReturnValue({
      period: 'THIS_MONTH', setPeriod: vi.fn(), statusFilter: 'ALL', setStatusFilter: vi.fn(),
      sortKey: 'netProfit', sortDir: 'desc', handleSort: vi.fn(), expandedBranchId: null,
      toggleExpand: vi.fn(), sortedData: MOCK_ADMIN_BRANCH_PNL,
      aggregates: { totalRevenue: 1, totalExpenses: 1, totalNetProfit: 0, overallMarginPct: 0, profitableBranches: 1, lossMakingBranches: 1 },
      isPending: true, isError: false, retry: vi.fn(),
    });
    render(<AdminFinanceBranchProfitAndLoss />);
    expect(screen.getByRole('button', { name: 'finance.admin_finance_tabs.exportCsv' })).toBeDisabled();
  });
});
