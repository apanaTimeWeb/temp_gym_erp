// RESPONSIBILITY: Defines regression tests for useAdminFinancePayoutsManagementLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payouts_management/tests/hooks/useAdminFinancePayoutsManagementLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminPayoutsLogic } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementLogic';

const store = { activeTab: 'payouts', setActiveTab: vi.fn(), monthFilter: '2026-10', setMonthFilter: vi.fn(), gymFilter: 'all', setGymFilter: vi.fn(), statusFilter: 'all', setStatusFilter: vi.fn(), currentPage: 1, setCurrentPage: vi.fn(), getState: () => store };
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payouts_management/state/useAdminFinancePayoutsManagementStore', () => ({ useAdminPayoutsStore: Object.assign(() => store, { getState: () => store }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementUrlQuerySync', () => ({ useAdminNavigationLayoutUrlQuerySync: vi.fn() }));

describe('useAdminPayoutsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockImplementation((options: { queryKey?: unknown[] }) => {
      const key = JSON.stringify(options?.queryKey ?? []);
      if (key.includes('pnl')) return { data: [{ id: 'pnl1' }], isPending: false } as never;
      if (key.includes('kpis')) return { data: { revenue: 500 } } as never;
      return { data: { data: [{ id: 'p1' }], meta: { total: 12, totalPages: 2 } }, status: 'success' } as never;
    });
  });

  it('maps payout/P&L/KPI server data and resets pagination when payout sorting changes', () => {
    const { result } = renderHook(() => useAdminPayoutsLogic());
    expect(result.current.payouts).toEqual([{ id: 'p1' }]);
    expect(result.current.pnlData).toEqual([{ id: 'pnl1' }]);
    expect(result.current.kpis).toEqual({ revenue: 500 });
    act(() => result.current.onPayoutSort('month'));
    expect(result.current.payoutSortDir).toBe('asc');
    expect(store.setCurrentPage).toHaveBeenCalledWith(1);
  });
});
