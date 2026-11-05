// RESPONSIBILITY: Owns all deterministic Branch P&L fixture data within the P&L feature boundary.
// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_branch_profit_and_loss/mocks/fixtures/AdminFinanceBranchProfitAndLossMockFixtures.ts)

import { FINANCE_PNL_STATUS_FILTERS } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/constants/AdminFinanceBranchProfitAndLossConstants';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

export const MOCK_ADMIN_BRANCH_PNL: BranchPnlRecord[] = [
  {
    branchId: 'b1',
    branchName: 'Downtown Main',
    location: 'City Center',
    revenue: 1200000,
    expenses: 700000,
    netProfit: 500000,
    marginPct: 41.6,
    status: FINANCE_PNL_STATUS_FILTERS.PROFITABLE,
    momDelta: 5.2,
    revenueBreakdown: { memberships: 900000, ptSessions: 200000, products: 50000, other: 50000 },
    expenseBreakdown: { rent: 300000, salaries: 250000, utilities: 50000, maintenance: 30000, marketing: 70000 }
  },
  {
    branchId: 'b2',
    branchName: 'Westside Gym',
    location: 'Westside Mall',
    revenue: 800000,
    expenses: 850000,
    netProfit: -50000,
    marginPct: -6.2,
    status: FINANCE_PNL_STATUS_FILTERS.LOSS,
    momDelta: -2.1,
    revenueBreakdown: { memberships: 600000, ptSessions: 100000, products: 80000, other: 20000 },
    expenseBreakdown: { rent: 400000, salaries: 250000, utilities: 80000, maintenance: 50000, marketing: 70000 }
  }
];


// --- From AdminHrMockData.ts ---


export const MOCK_ADMIN_BRANCH_PNL_BY_PERIOD: Record<string, BranchPnlRecord[]> = {
  THIS_MONTH: MOCK_ADMIN_BRANCH_PNL,
  LAST_MONTH: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 0.94), expenses: Math.round(row.expenses * 0.91), netProfit: Math.round(row.netProfit * 0.97) })),
  Q1: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 0.86), expenses: Math.round(row.expenses * 0.88), netProfit: Math.round(row.netProfit * 0.83) })),
  Q2: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.03), expenses: Math.round(row.expenses * 1.01), netProfit: Math.round(row.netProfit * 1.06) })),
  Q3: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.09), expenses: Math.round(row.expenses * 1.07), netProfit: Math.round(row.netProfit * 1.12) })),
  Q4: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.15), expenses: Math.round(row.expenses * 1.11), netProfit: Math.round(row.netProfit * 1.21) })),
  THIS_YEAR: MOCK_ADMIN_BRANCH_PNL.map((row) => ({ ...row, revenue: Math.round(row.revenue * 1.18), expenses: Math.round(row.expenses * 1.13), netProfit: Math.round(row.netProfit * 1.25) })),
};
