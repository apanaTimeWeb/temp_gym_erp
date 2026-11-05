// RESPONSIBILITY: Prevent page carryover when payroll month changes.
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminFinancePayrollManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUrlState';
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/frontend_admin/admin_finance/finance_payroll_management',
  useSearchParams: () => new URLSearchParams('month=2026-07&page=8&branchId=g2'),
}));
describe('Payroll month pagination reset', () => {
  it('resets page to 1 and keeps branch when month changes', () => {
    const { result } = renderHook(() => useAdminFinancePayrollManagementUrlState());
    act(() => result.current.setPayrollMonth('2026-08'));
    const url = new URL(String(push.mock.calls.at(-1)?.[0]), 'https://example.test');
    expect(url.searchParams.get('month')).toBe('2026-08');
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.get('branchId')).toBe('g2');
  });
});
