// RBG124: pending filter writes and browser history must not overwrite Finance payroll filters.
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminFinancePayrollManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUrlState';
const navigation = vi.hoisted(() => ({ query: 'page=6&branchId=b1', push: vi.fn<(url: string) => void>() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigation.push }),
  usePathname: () => '/frontend_admin/admin_finance/finance_payroll_management',
  useSearchParams: () => new URLSearchParams(navigation.query),
}));
const last = () => new URL(String(navigation.push.mock.lastCall?.[0]), 'https://example.test').searchParams;
beforeEach(() => { navigation.query = 'page=6&branchId=b1'; navigation.push.mockClear(); });
describe('Finance Payroll Management RBG124 URL pending writes', () => {
  it('merges rapid search/role/month/sort edits while resetting page and retaining branch', () => {
    const { result } = renderHook(() => useAdminFinancePayrollManagementUrlState());
    act(() => {
      result.current.setSearch('trainer'); result.current.setRoleFilter('Trainer');
      result.current.setPayrollMonth('2026-11'); result.current.setStaffSort('salary', 'desc');
      result.current.setPayrollSort('amount', 'asc');
    });
    expect(Object.fromEntries(last())).toMatchObject({ search: 'trainer', role: 'Trainer', month: '2026-11', staffSortKey: 'salary', staffSortDir: 'desc', payrollSortKey: 'amount', payrollSortDir: 'asc', page: '1', branchId: 'b1' });
    const count = navigation.push.mock.calls.length;
    act(() => result.current.setPayrollSort('amount', 'asc'));
    expect(navigation.push).toHaveBeenCalledTimes(count);
  });
  it('clears stale local drafts when the URL changes externally', () => {
    const { result, rerender } = renderHook(() => useAdminFinancePayrollManagementUrlState());
    act(() => result.current.setSearch('old-pending'));
    navigation.query = 'page=3&branchId=b2&month=2026-10';
    rerender();
    act(() => result.current.setRoleFilter('Manager'));
    expect(last().get('search')).toBeNull();
    expect(last().get('branchId')).toBe('b2');
    expect(last().get('page')).toBe('1');
  });
  it('rejects year 0000 and preserves historical valid months', () => {
    navigation.query = 'month=0000-01';
    const view = renderHook(() => useAdminFinancePayrollManagementUrlState());
    expect(view.result.current.payrollMonth).not.toBe('0000-01');
    navigation.query = 'month=0042-03'; view.rerender();
    expect(view.result.current.payrollMonth).toBe('0042-03');
  });
});
