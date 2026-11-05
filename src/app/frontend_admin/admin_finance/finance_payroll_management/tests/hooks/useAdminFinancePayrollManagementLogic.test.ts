// RESPONSIBILITY: Defines regression tests for useAdminFinancePayrollManagementLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payroll_management/tests/hooks/useAdminFinancePayrollManagementLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminFinancePayrollManagementLogic } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementLogic';

const searchParams = new URLSearchParams('branchId=b2');
const showToast = vi.fn();
const payrollMutations = { isPending: false, savePayroll: vi.fn(), markPayrollPaid: vi.fn() };
const queries = [
  { data: { data: { staff: [{ id: 's1' }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: { payrolls: [{ id: 'p1' }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() },
  { data: { data: { totalStaff: 1 } }, status: 'success', error: null, refetch: vi.fn() },
];

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUrlState', () => ({ useAdminFinancePayrollManagementUrlState: () => ({ search: '', roleFilter: 'All', branchFilter: 'All', currentPage: 1, payrollMonth: '2026-10', debouncedSearch: '', staffSortKey: 'name', staffSortDir: 'asc', payrollSortKey: 'month', payrollSortDir: 'desc' }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementToastStore', () => ({ useAdminNavigationLayoutToastStore: () => ({ showToast }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementPayrollMutations', () => ({ useAdminFinancePayrollManagementPayrollMutations: () => payrollMutations }));

describe('useAdminFinancePayrollManagementLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    queries.forEach((q) => vi.mocked(useQuery).mockReturnValueOnce(q as never));
  });

  it('keeps branch scope in the read query and exposes Finance payroll actions only', () => {
    const uiInputs = { editId: null, setShowModal: vi.fn(), setShowPayrollModal: vi.fn() } as never;
    const { result } = renderHook(() => useAdminFinancePayrollManagementLogic(uiInputs));
    expect(result.current.staff).toEqual([{ id: 's1' }]);
    expect(result.current.payrolls).toEqual([{ id: 'p1' }]);
    const staffOptions = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[] };
    expect(JSON.stringify(staffOptions.queryKey)).toContain('b2');
    expect(result.current).not.toHaveProperty('saveStaff');
    expect(result.current.savePayroll).toBe(payrollMutations.savePayroll);
  });
});
