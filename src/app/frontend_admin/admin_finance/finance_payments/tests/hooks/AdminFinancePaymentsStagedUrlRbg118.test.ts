import { describe, it, beforeEach, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_payments/hooks/useAdminFinancePaymentsLogic';
const pushed = vi.hoisted(() => vi.fn());
const route = vi.hoisted(() => ({ query: 'page=4&branchId=branch-1&method=Card' }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: pushed }), usePathname: () => '/finance/payments', useSearchParams: () => new URLSearchParams(route.query) }));
vi.mock('next-intl', () => ({useTranslations: () => (key:string) => key}));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn(() => ({status:'pending',data:undefined,isError:false,refetch:vi.fn()})) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_payments/hooks/useAdminFinancePaymentsDebounce', () => ({useAdminFinanceDebounce:(value:string)=>value}));
vi.mock('@/app/frontend_admin/admin_finance/finance_payments/api/admin_finance_payments_api', () => ({AdminFinanceApi:{fetchPayments:vi.fn(),fetchExpenses:vi.fn(),fetchSummary:vi.fn()}}));
beforeEach(() => { pushed.mockReset();route.query='page=4&branchId=branch-1&method=Card'; });
describe('RBG118 staged Payments URL writes', () => {
  it('preserves consecutive method and status changes without dropping branch scope', () => {
    const {result} = renderHook(() => useAdminFinanceLogic());
    act(() => { result.current.setMethodFilter('Cash'); result.current.setStatusFilter('Paid'); });
    expect(pushed).toHaveBeenCalledTimes(2);
    const url = new URL(pushed.mock.lastCall![0], 'https://example.test');
    expect(url.searchParams.get('method')).toBe('Cash');
    expect(url.searchParams.get('status')).toBe('Paid');
    expect(url.searchParams.get('page')).toBe('1');
    expect(url.searchParams.get('branchId')).toBe('branch-1');
  });
  it('suppresses duplicate filter navigation', () => {
    const {result} = renderHook(() => useAdminFinanceLogic());
    act(() => { result.current.setMethodFilter('Cash'); result.current.setMethodFilter('Cash'); });
    expect(pushed).toHaveBeenCalledTimes(1);
  });
});
