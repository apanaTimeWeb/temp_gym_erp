// RESPONSIBILITY: Defines regression tests for useAdminFinanceOverviewLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_summary/tests/hooks/useAdminFinanceOverviewLogic.test.ts)

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryLogic';
import { useAdminFinanceDebounce } from '@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryDebounce';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceApi } from '@/app/frontend_admin/admin_finance/finance_summary/api/admin_finance_summary_api';

const push = vi.fn();
const queryResults = [
  { data: { data: { payments: [{ id: 'pay-1' }], total: 1 } }, isError: false, status: 'success', refetch: vi.fn() },
  { data: { data: { revenue: 1000, expenses: 300, netProfit: 700 } }, isError: false, status: 'success', refetch: vi.fn() },
  { data: { data: { expenses: [{ id: 'exp-1' }], total: 1, totalAmount: 300 } }, isError: false, status: 'success', refetch: vi.fn() },
];

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/finance',
  useSearchParams: () => new URLSearchParams('branchId=branch-1&page=2&search=upi'),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_finance/finance_summary/hooks/useAdminFinanceSummaryDebounce', () => ({ useAdminFinanceDebounce: vi.fn((value: string) => value) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_summary/api/admin_finance_summary_api', () => ({ AdminFinanceApi: { fetchPayments: vi.fn(), fetchSummary: vi.fn(), fetchExpenses: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_finance/finance_summary/components/feedback/AdminFinanceSummaryBackendMessage', () => ({ getAdminBackendMessage: () => null }));

beforeEach(() => {
  vi.clearAllMocks();
  let index = 0;
  vi.mocked(useQuery).mockImplementation(() => queryResults[index++] as never);
  vi.mocked(AdminFinanceApi.fetchPayments).mockResolvedValue({ data: queryResults[0].data?.data } as never);
  vi.mocked(AdminFinanceApi.fetchSummary).mockResolvedValue({ data: queryResults[1].data?.data } as never);
  vi.mocked(AdminFinanceApi.fetchExpenses).mockResolvedValue({ data: queryResults[2].data?.data } as never);
});

describe('useAdminFinanceLogic', () => {
  it('maps payment, summary, and expense server state into the view model', () => {
    const { result } = renderHook(() => useAdminFinanceLogic());

    expect(result.current.payments).toEqual([{ id: 'pay-1' }]);
    expect(result.current.expenses).toEqual([{ id: 'exp-1' }]);
    expect(result.current.totalPayments).toBe(1);
    expect(result.current.totalExpenseAmount).toBe(300);
    expect(result.current.summary?.netProfit).toBe(700);
  });

  it('resets the expense page when the expense category changes', () => {
    const { result } = renderHook(() => useAdminFinanceLogic());
    act(() => result.current.setExpenseCategory('RENT'));

    expect(push).toHaveBeenCalledWith(expect.stringContaining('expenseCategory=RENT'), { scroll: false });
    expect(push).toHaveBeenCalledWith(expect.stringContaining('expensePage=1'), { scroll: false });
  });

  it('keeps query failures separate and exposes retry for each resource', async () => {
    const paymentRefetch = vi.fn().mockResolvedValue(undefined);
    const summaryRefetch = vi.fn().mockResolvedValue(undefined);
    const expenseRefetch = vi.fn().mockResolvedValue(undefined);
    vi.mocked(useQuery)
      .mockImplementationOnce(() => ({ data: undefined, isError: true, status: 'error', error: new Error('payments unavailable'), refetch: paymentRefetch }) as never)
      .mockImplementationOnce(() => ({ data: queryResults[1].data, isError: false, status: 'success', error: null, refetch: summaryRefetch }) as never)
      .mockImplementationOnce(() => ({ data: queryResults[2].data, isError: false, status: 'success', error: null, refetch: expenseRefetch }) as never);

    const { result } = renderHook(() => useAdminFinanceLogic());
    expect(result.current.paymentsStatus).toBe('error');
    expect(result.current.summaryStatus).toBe('success');
    expect(result.current.expensesStatus).toBe('success');
    expect(result.current.isError).toBe(true);

    await act(async () => { await result.current.loadAll(); });
    expect(paymentRefetch).toHaveBeenCalledTimes(1);
    expect(summaryRefetch).toHaveBeenCalledTimes(1);
    expect(expenseRefetch).toHaveBeenCalledTimes(1);
  });
});
