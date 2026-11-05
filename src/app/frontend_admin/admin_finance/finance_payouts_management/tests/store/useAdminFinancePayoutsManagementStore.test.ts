// RESPONSIBILITY: Defines regression tests for useAdminFinancePayoutsManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payouts_management/tests/store/useAdminFinancePayoutsManagementStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminPayoutsStore } from '@/app/frontend_admin/admin_finance/finance_payouts_management/state/useAdminFinancePayoutsManagementStore';

describe('useAdminPayoutsStore', () => {
  beforeEach(() => useAdminPayoutsStore.setState({ currentPage: 4, activeTab: 'summary', monthFilter: 'all', gymFilter: 'all', statusFilter: 'all' }));

  it('resets pagination when payout filters change', () => {
    useAdminPayoutsStore.getState().setMonthFilter('2026-09');
    expect(useAdminPayoutsStore.getState().currentPage).toBe(1);
    useAdminPayoutsStore.setState({ currentPage: 2 });
    useAdminPayoutsStore.getState().setGymFilter('gym-2');
    expect(useAdminPayoutsStore.getState().currentPage).toBe(1);
    useAdminPayoutsStore.setState({ currentPage: 5 });
    useAdminPayoutsStore.getState().setStatusFilter('PAID');
    expect(useAdminPayoutsStore.getState().currentPage).toBe(1);
  });

  it('tracks the active payouts view', () => {
    useAdminPayoutsStore.getState().setActiveTab('pnl');
    expect(useAdminPayoutsStore.getState().activeTab).toBe('pnl');
  });
});
