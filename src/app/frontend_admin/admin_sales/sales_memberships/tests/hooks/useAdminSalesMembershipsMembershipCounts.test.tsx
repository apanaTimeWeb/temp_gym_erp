// RESPONSIBILITY: Verifies independent cache-keyed membership-count requests and parameter propagation.
// DATA FLOW: selected filters → three TanStack Query configurations → API query parameters and count projection.

import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_memberships/api/admin_sales_memberships_api';
import { useAdminSalesMembershipCounts } from '@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsMembershipCounts';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_sales/sales_memberships/api/admin_sales_memberships_api', () => ({ AdminSalesApi: { fetchAllMemberships: vi.fn() } }));

const queryResult = (total: number) => ({ data: { data: { total } }, isPending: false, isError: false, refetch: vi.fn() });

describe('useAdminSalesMembershipCounts', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
    vi.mocked(useQuery).mockReturnValueOnce(queryResult(12) as never).mockReturnValueOnce(queryResult(3) as never).mockReturnValueOnce(queryResult(5) as never);
    vi.mocked(AdminSalesApi.fetchAllMemberships).mockReset().mockResolvedValue({ data: { total: 1 }, message: 'ok' } as never);
  });

  it('projects server totals without summing a visible page', () => {
    const { result } = renderHook(() => useAdminSalesMembershipCounts({ selectedBranchId: 'branch-8', search: 'Asha', range: 'THIS_MONTH', startDate: '2026-10-01', endDate: '2026-10-23', enabled: true }));
    expect(result.current.counts).toEqual({ active: 12, expiringSoon: 3, expired: 5 });
    expect(useQuery).toHaveBeenCalledTimes(3);
  });

  it('sends limit=1 and filters to the API, excluding the all-branches sentinel', async () => {
    renderHook(() => useAdminSalesMembershipCounts({ selectedBranchId: 'all', search: '', range: 'THIS_MONTH', enabled: true }));
    const options = vi.mocked(useQuery).mock.calls[0][0] as { queryFn: () => Promise<unknown>; queryKey: unknown[] };
    await options.queryFn();
    expect(AdminSalesApi.fetchAllMemberships).toHaveBeenCalledWith(expect.objectContaining({ limit: '1', page: '1', range: 'THIS_MONTH', membershipFilter: 'active' }));
    const calledParams = vi.mocked(AdminSalesApi.fetchAllMemberships).mock.calls[0][0];
    expect(calledParams).not.toHaveProperty('branchId');
    expect(calledParams).not.toHaveProperty('search');
    const queryKeys = vi.mocked(useQuery).mock.calls.map(([config]) => (config as { queryKey: unknown[] }).queryKey);
    expect(new Set(queryKeys.map((key) => JSON.stringify(key))).size).toBe(3);
  });
});
