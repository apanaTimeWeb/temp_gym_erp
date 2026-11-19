import { describe, it, beforeEach, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_expenses/hooks/useAdminFinanceExpensesLogic';
const pushed = vi.hoisted(() => vi.fn());
const route = vi.hoisted(() => ({ query: 'expensePage=4&branchId=branch-1' }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: pushed }), usePathname: () => '/finance/expenses', useSearchParams: () => new URLSearchParams(route.query) }));
vi.mock('next-intl', () => ({useTranslations: () => (key:string) => key}));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn(() => ({status:'pending',data:undefined,isError:false,refetch:vi.fn()})) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_expenses/hooks/useAdminFinanceExpensesDebounce', () => ({useAdminFinanceDebounce:(value:string)=>value}));
vi.mock('@/app/frontend_admin/admin_finance/finance_expenses/api/admin_finance_expenses_api', () => ({AdminFinanceApi:{fetchPayments:vi.fn(),fetchExpenses:vi.fn(),fetchSummary:vi.fn()}}));
beforeEach(() => { pushed.mockReset();route.query='expensePage=4&branchId=branch-1'; });
describe('RBG117 staged expense URL edits', () => {
  it('retains consecutive category and page edits without losing branch scope', () => {
    const {result} = renderHook(() => useAdminFinanceLogic());
    act(() => { result.current.setExpenseCategory('Rent'); result.current.setExpensePage(2); });
    expect(pushed).toHaveBeenCalledTimes(2);
    const destination = new URL(pushed.mock.lastCall![0], 'https://example.test');
    expect(destination.searchParams.get('expenseCategory')).toBe('Rent');
    expect(destination.searchParams.get('expensePage')).toBe('2');
    expect(destination.searchParams.get('branchId')).toBe('branch-1');
  });
  it('skips duplicates rather than appending repeated navigation', () => {
    const {result} = renderHook(() => useAdminFinanceLogic());
    act(() => {result.current.setExpenseCategory('Rent'); result.current.setExpenseCategory('Rent');});
    expect(pushed).toHaveBeenCalledTimes(1);
  });
});
