// RESPONSIBILITY: Defines regression tests for useAdminFinanceBranchProfitAndLossLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_branch_profit_and_loss/tests/useAdminFinanceBranchProfitAndLossLogic.test.ts)

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminFinancePnlLogic } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/hooks/useAdminFinanceBranchProfitAndLossLogic';
import { useQuery } from '@tanstack/react-query';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/hooks/useAdminFinanceBranchProfitAndLossUrlQuerySync', () => ({ useAdminFinancePnlUrlQuerySync: () => ({ getValue: () => null, setValue: vi.fn() }) }));

const rows: BranchPnlRecord[] = [
  { branchId: 'b1', branchName: 'Alpha', location: 'North', revenue: 200, expenses: 50, netProfit: 150, marginPct: 75, status: 'PROFITABLE', momDelta: 4, revenueBreakdown: { memberships: 200, ptSessions: 0, products: 0, other: 0 }, expenseBreakdown: { rent: 25, salaries: 25, utilities: 0, maintenance: 0, marketing: 0 } },
  { branchId: 'b2', branchName: 'Beta', location: 'South', revenue: 100, expenses: 70, netProfit: 30, marginPct: 30, status: 'LOSS', momDelta: -2, revenueBreakdown: { memberships: 100, ptSessions: 0, products: 0, other: 0 }, expenseBreakdown: { rent: 35, salaries: 35, utilities: 0, maintenance: 0, marketing: 0 } },
];

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useQuery).mockImplementation(() => ({ data: { data: rows }, isPending: false, isError: false, refetch: vi.fn().mockResolvedValue(undefined) } as never));
});

describe('useAdminFinancePnlLogic', () => {
  it('derives portfolio-level P&L aggregates from server rows', () => {
    const { result } = renderHook(() => useAdminFinancePnlLogic());

    expect(result.current.aggregates.totalRevenue).toBe(300);
    expect(result.current.aggregates.totalExpenses).toBe(120);
    expect(result.current.aggregates.totalNetProfit).toBe(180);
    expect(result.current.aggregates.overallMarginPct).toBe(60);
    expect(result.current.aggregates.profitableBranches).toBe(1);
    expect(result.current.aggregates.lossMakingBranches).toBe(1);
  });

  it('toggles row expansion and sort direction from user interactions', () => {
    const { result } = renderHook(() => useAdminFinancePnlLogic());
    act(() => result.current.toggleExpand('b1'));
    expect(result.current.expandedBranchId).toBe('b1');
    act(() => result.current.toggleExpand('b1'));
    expect(result.current.expandedBranchId).toBeNull();
    act(() => result.current.handleSort('netProfit'));
    expect(result.current.sortDir).toBe('asc');
  });

  it('exposes a retry that refetches both filtered P&L rows and portfolio summary', async () => {
    const filteredRefetch = vi.fn().mockResolvedValue(undefined);
    const aggregateRefetch = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useQuery)
      .mockImplementationOnce(() => ({ data: undefined, isPending: false, isError: true, refetch: filteredRefetch }) as never)
      .mockImplementationOnce(() => ({ data: { data: rows }, isPending: false, isError: false, refetch: aggregateRefetch }) as never);

    const { result } = renderHook(() => useAdminFinancePnlLogic());
    expect(result.current.isError).toBe(true);
    await act(async () => { await result.current.retry(); });
    expect(filteredRefetch).toHaveBeenCalledTimes(1);
    expect(aggregateRefetch).toHaveBeenCalledTimes(1);
  });
});
