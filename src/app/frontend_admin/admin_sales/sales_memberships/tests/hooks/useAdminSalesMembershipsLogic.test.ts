import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsLogic';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  searchParams: new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2'),
  listQuery: { data: { data: { members: [{ id: 'm1', name: 'Ravi' }], total: 7 } }, status: 'success', error: null, refetch: vi.fn() },
  listHook: vi.fn(),
  counts: { counts: { active: 4, expiringSoon: 2, expired: 1 }, isPending: false, isError: false, retry: vi.fn() },
  countsHook: vi.fn(),
}));
mocks.listHook.mockImplementation(() => mocks.listQuery);
mocks.countsHook.mockImplementation(() => mocks.counts);

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
  useSearchParams: () => mocks.searchParams,
  usePathname: () => '/frontend_admin/admin_sales/sales_memberships',
}));
vi.mock('@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsDebounce', () => ({ useAdminSalesDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsEntityQueries', () => ({ useAdminSalesMembershipsEntityQueries: mocks.listHook }));
vi.mock('@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsMembershipCounts', () => ({ useAdminSalesMembershipCounts: mocks.countsHook }));
vi.mock('@/app/frontend_admin/admin_sales/sales_memberships/components/feedback/AdminSalesMembershipsBackendMessage', () => ({ getAdminBackendMessage: () => undefined }));

describe('useAdminSalesLogic — membership directory ownership', () => {
  beforeEach(() => {
    mocks.push.mockReset(); mocks.listHook.mockClear(); mocks.countsHook.mockClear();
    mocks.searchParams = new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2');
  });
  it('returns membership rows and membership-only KPI counts', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.allMemberships).toEqual([{ id: 'm1', name: 'Ravi' }]);
    expect(result.current.allMembershipsTotal).toBe(7);
    expect(result.current.membershipKpiCounts).toEqual({ active: 4, expiringSoon: 2, expired: 1 });
    expect(Object.keys(result.current)).not.toContain('pendingPayments');
    expect(Object.keys(result.current)).not.toContain('storeOrders');
    expect(mocks.listHook).toHaveBeenCalledWith(expect.objectContaining({ selectedBranchId: 'b1', enabled: true }));
  });
  it('preserves branch identity when search changes', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    act(() => result.current.setSearch('aman'));
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('search=aman');
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('branchId=b1');
  });
});
