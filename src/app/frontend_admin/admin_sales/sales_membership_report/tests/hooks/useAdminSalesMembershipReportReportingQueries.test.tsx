// RESPONSIBILITY: Verifies that the membership-report leaf issues only its own query and preserves request filters.
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_membership_report/api/admin_sales_membership_report_api';
import { useAdminSalesReportingQueries } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportReportingQueries';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_sales/sales_membership_report/api/admin_sales_membership_report_api', () => ({ AdminSalesApi: { fetchMembershipReport: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_sales/sales_membership_report/components/feedback/AdminSalesMembershipReportBackendMessage', () => ({ getAdminBackendMessage: () => null }));

const refetch = vi.fn();
describe('useAdminSalesReportingQueries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuery).mockReturnValue({
      data: { data: { report: [{ id: 1, name: 'Plan A' }], totals: { activeCount: 4, revenue: 500 } } },
      status: 'success', error: null, refetch,
    } as never);
  });

  it('exposes membership-report rows, totals, status and retry only', () => {
    const { result } = renderHook(() => useAdminSalesReportingQueries({
      selectedBranchId: 'branch-3', range: 'custom',
      dateParams: { startDate: '2026-10-01', endDate: '2026-10-23' },
      search: 'Plan', enabled: true,
    }));
    expect(result.current.membershipReport).toEqual([{ id: 1, name: 'Plan A' }]);
    expect(result.current.membershipTotals).toEqual({ activeCount: 4, revenue: 500 });
    expect(result.current.membershipReportStatus).toBe('success');
    expect(result.current.retryMembershipReport).toBe(refetch);
  });

  it('creates one cache entry and calls only the verified membership-report operation', async () => {
    renderHook(() => useAdminSalesReportingQueries({
      selectedBranchId: 'branch-3', range: 'custom',
      dateParams: { startDate: '2026-10-01', endDate: '2026-10-23' },
      search: 'Plan', enabled: true,
    }));
    expect(useQuery).toHaveBeenCalledTimes(1);
    const config = vi.mocked(useQuery).mock.calls[0]?.[0] as { queryKey: unknown[]; queryFn: () => Promise<unknown>; enabled: boolean };
    expect(config.enabled).toBe(true);
    await config.queryFn();
    expect(AdminSalesApi.fetchMembershipReport).toHaveBeenCalledWith('branch-3', 'custom', 'Plan', '2026-10-01', '2026-10-23');
  });
});
