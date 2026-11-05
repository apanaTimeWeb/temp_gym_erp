import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminFinanceSalaryAdvanceManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementUrlState';

const navigation = vi.hoisted(() => ({ query: 'page=6', pushes: [] as string[], pathname: '/frontend_admin/admin_finance/finance_salary_advance_management' }));
vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(navigation.query),
  usePathname: () => navigation.pathname,
  useRouter: () => ({ push: (href: string) => navigation.pushes.push(href) }),
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementDebounce', () => ({
  useAdminFinanceSalaryAdvanceManagementDebounce: (s: string) => s,
}));

describe('salary advance URL-state writes', () => {
  beforeEach(() => { navigation.query = 'page=6'; navigation.pushes = []; });
  it('preserves consecutive edits and resets pagination while the router has not acknowledged the first', () => {
    const { result } = renderHook(() => useAdminFinanceSalaryAdvanceManagementUrlState());
    act(() => { result.current.setSearch('Ana'); result.current.setBranchFilter('North'); result.current.setRoleFilter('Trainer'); });
    const url = new URL(navigation.pushes.at(-1)!, 'https://example.test');
    expect(url.searchParams.get('search')).toBe('Ana');
    expect(url.searchParams.get('branch')).toBe('North');
    expect(url.searchParams.get('role')).toBe('Trainer');
    expect(url.searchParams.get('page')).toBe('1');
  });
  it('combines sort changes with existing edits', () => {
    const { result } = renderHook(() => useAdminFinanceSalaryAdvanceManagementUrlState());
    act(() => { result.current.setBranchFilter('West'); result.current.setStaffSort('salary', 'desc'); });
    const url = new URL(navigation.pushes.at(-1)!, 'https://example.test');
    expect(url.searchParams.get('branch')).toBe('West');
    expect(url.searchParams.get('staffSortKey')).toBe('salary');
    expect(url.searchParams.get('staffSortDir')).toBe('desc');
  });
  it('does not duplicate identical outgoing writes', () => {
    const { result } = renderHook(() => useAdminFinanceSalaryAdvanceManagementUrlState());
    act(() => { result.current.setSearch('Jo'); result.current.setSearch('Jo'); });
    expect(navigation.pushes).toHaveLength(1);
  });
  it('rejects impossible and year-zero payroll months', () => {
    navigation.query = 'month=0000-01';
    const { result, rerender } = renderHook(() => useAdminFinanceSalaryAdvanceManagementUrlState());
    expect(result.current.payrollMonth).not.toBe('0000-01');
    navigation.query = 'month=2026-13'; rerender();
    expect(result.current.payrollMonth).not.toBe('2026-13');
    navigation.query = 'month=2024-02'; rerender();
    expect(result.current.payrollMonth).toBe('2024-02');
  });
});
