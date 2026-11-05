import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_store_sales/hooks/useAdminSalesStoreSalesLogic';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  searchParams: new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2'),
  orders: { data: { data: { orders: [{ id: 'o1', total: 120, method: 'UPI', status: 'paid', createdAt: '2026-10-01T10:00:00Z', items: [] }], total: 1 } }, status: 'success', error: null, refetch: vi.fn() },
  summary: { data: { data: { summary: { totalProducts: 4, totalOrders: 1, totalRevenue: 120, lowStockProducts: [] } } }, status: 'success', error: null, refetch: vi.fn() },
  queriesHook: vi.fn(),
}));
mocks.queriesHook.mockImplementation(() => ({ orders: mocks.orders, summary: mocks.summary }));

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
  useSearchParams: () => mocks.searchParams,
  usePathname: () => '/frontend_admin/admin_sales/sales_store_sales',
}));
vi.mock('@/app/frontend_admin/admin_sales/sales_store_sales/hooks/useAdminSalesStoreSalesDebounce', () => ({ useAdminSalesDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_sales/sales_store_sales/hooks/useAdminSalesStoreSalesEntityQueries', () => ({ useAdminSalesStoreSalesEntityQueries: mocks.queriesHook }));
vi.mock('@/app/frontend_admin/admin_sales/sales_store_sales/components/feedback/AdminSalesStoreSalesBackendMessage', () => ({ getAdminBackendMessage: () => undefined }));

describe('useAdminSalesLogic — store sales ownership', () => {
  beforeEach(() => { mocks.push.mockReset(); mocks.queriesHook.mockClear(); mocks.searchParams = new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2'); });
  it('returns store orders and store summary only', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.storeOrders.map((order) => order.id)).toEqual(['o1']);
    expect(result.current.storeSummary?.totalRevenue).toBe(120);
    expect(Object.keys(result.current)).not.toContain('pendingPayments');
    expect(mocks.queriesHook).toHaveBeenCalledWith(expect.objectContaining({ enabled: true, queryParams: expect.objectContaining({ branchId: 'b1', page: '2' }), summaryParams: expect.objectContaining({ branchId: 'b1' }) }));
  });
  it('writes search updates into the current URL', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    act(() => result.current.setSearch('aman'));
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('search=aman');
  });

  it('recovers an out-of-range page only after a confirmed successful order total', () => {
    mocks.searchParams = new URLSearchParams('range=monthly&page=999');
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.currentPage).toBe(999);
    expect(String(mocks.push.mock.lastCall?.[0])).toContain('page=1');
  });
  it('does not change a page while the order total is pending or failed', () => {
    mocks.searchParams = new URLSearchParams('range=monthly&page=999');
    for (const status of ['pending', 'error'] as const) {
      mocks.push.mockClear();
      mocks.queriesHook.mockReturnValueOnce({
        orders: { data: undefined, status, error: status === 'error' ? new Error('hidden') : null, refetch: vi.fn() },
        summary: mocks.summary,
      } as never);
      renderHook(() => useAdminSalesLogic());
      expect(mocks.push).not.toHaveBeenCalled();
    }
  });
  it('redacts independent order and summary query error details', () => {
    mocks.queriesHook.mockReturnValueOnce({
      orders: { data: undefined, status: 'error', error: new Error('PRIVATE_ORDER_SECRET'), refetch: vi.fn() },
      summary: { data: undefined, status: 'error', error: new Error('PRIVATE_SUMMARY_SECRET'), refetch: vi.fn() },
    } as never);
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.storeError).toBe('sales.AdminRepair.requestFailed');
    expect(result.current.storeSummaryError).toBe('sales.AdminRepair.requestFailed');
    expect(result.current.storeStatus).toBe('error');
    expect(result.current.storeSummaryStatus).toBe('error');
  });
});
