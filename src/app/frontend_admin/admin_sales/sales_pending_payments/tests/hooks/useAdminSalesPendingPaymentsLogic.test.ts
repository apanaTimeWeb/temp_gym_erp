import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_pending_payments/hooks/useAdminSalesPendingPaymentsLogic';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  searchParams: new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2'),
  query: { data: { data: { members: [{ id: 'p1', name: 'Riya', pendingAmount: 1200 }], total: 3 } }, status: 'success', error: null, refetch: vi.fn() },
  queryHook: vi.fn(),
}));
mocks.queryHook.mockImplementation(() => mocks.query);

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
  useSearchParams: () => mocks.searchParams,
  usePathname: () => '/frontend_admin/admin_sales/sales_pending_payments',
}));
vi.mock('@/app/frontend_admin/admin_sales/sales_pending_payments/hooks/useAdminSalesPendingPaymentsDebounce', () => ({ useAdminSalesDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_sales/sales_pending_payments/hooks/useAdminSalesPendingPaymentsEntityQueries', () => ({ useAdminSalesPendingPaymentsEntityQueries: mocks.queryHook }));
vi.mock('@/app/frontend_admin/admin_sales/sales_pending_payments/components/feedback/AdminSalesPendingPaymentsBackendMessage', () => ({ getAdminBackendMessage: () => undefined }));

describe('useAdminSalesLogic — Sales pending payment ownership', () => {
  beforeEach(() => { mocks.push.mockReset(); mocks.queryHook.mockClear(); mocks.searchParams = new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2'); mocks.query.status = 'success'; mocks.query.data = { data: { members: [{ id: 'p1', name: 'Riya', pendingAmount: 1200 }], total: 3 } }; mocks.query.error = null; });
  it('returns pending payments only and sends branch-scoped query parameters', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.pendingPayments).toEqual([{ id: 'p1', name: 'Riya', pendingAmount: 1200 }]);
    expect(result.current.pendingTotal).toBe(3);
    expect(Object.keys(result.current)).not.toContain('storeOrders');
    expect(mocks.queryHook).toHaveBeenCalledWith(expect.objectContaining({ enabled: true, queryParams: expect.objectContaining({ branchId: 'b1', search: 'riya', page: '2' }) }));
  });
  it('normalizes malformed pages before reading query data and writing navigation', () => {
    mocks.searchParams = new URLSearchParams('page=2abc');
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.currentPage).toBe(1);
    expect(mocks.queryHook).toHaveBeenCalledWith(expect.objectContaining({ queryParams: expect.objectContaining({ page: '1' }) }));
    act(() => result.current.setCurrentPage(Infinity));
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('page=1');
  });

  it('writes search changes into the current URL', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    act(() => result.current.setSearch('aman'));
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('search=aman');
  });
});

describe('pending payments out-of-range URL recovery', () => {
  it('redirects to the last real page only after a successful response', () => {
    mocks.searchParams = new URLSearchParams('range=monthly&page=99999');
    mocks.query.status = 'success';
    mocks.query.data = { data: { members: [], total: 3 } };
    mocks.push.mockReset();
    renderHook(() => useAdminSalesLogic());
    expect(mocks.push).toHaveBeenCalledWith(expect.stringContaining('page=1'), { scroll: false });
  });
  it('never redirects from pending or failed query data', () => {
    mocks.searchParams = new URLSearchParams('range=monthly&page=99999');
    mocks.query.status = 'pending';
    mocks.push.mockReset();
    renderHook(() => useAdminSalesLogic());
    expect(mocks.push).not.toHaveBeenCalled();
  });
});
