// RESPONSIBILITY: Verifies the Sales Overview leaf only queries overview and referral-source endpoints.
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_overview/api/admin_sales_overview_api';
import { useAdminSalesReportingQueries } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewReportingQueries';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/api/admin_sales_overview_api', () => ({ AdminSalesApi: { fetchOverview: vi.fn(), fetchReferralSources: vi.fn() } }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/components/feedback/AdminSalesOverviewBackendMessage', () => ({ getAdminBackendMessage: () => null }));

const retryOverview = vi.fn();
const retryReferrals = vi.fn();
describe('useAdminSalesReportingQueries — Sales overview scope', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: { data: { monthlyRevenue: [{ date: '2026-10-01', revenue: 10, newMembers: 2 }] } }, status: 'success', error: null, refetch: retryOverview } as never)
      .mockReturnValueOnce({ data: { data: [{ source: 'Referral', revenue: 100 }] }, status: 'success', error: null, refetch: retryReferrals } as never);
  });

  it('exposes overview and referral data with separate retry callbacks', () => {
    const { result } = renderHook(() => useAdminSalesReportingQueries({ selectedBranchId: 'branch-3', range: 'custom', dateParams: { startDate: '2026-10-01', endDate: '2026-10-23' }, enabled: true }));
    expect(result.current.overviewData).toEqual([{ date: '2026-10-01', revenue: 10, newMembers: 2 }]);
    expect(result.current.referralData).toEqual([{ source: 'Referral', revenue: 100 }]);
    expect(result.current.retryOverview).toBe(retryOverview);
    expect(result.current.retryReferrals).toBe(retryReferrals);
    expect(Object.keys(result.current)).not.toContain('membershipReport');
  });

  it('uses only the two verified Sales overview operations with branch/date filters', async () => {
    renderHook(() => useAdminSalesReportingQueries({ selectedBranchId: 'branch-3', range: 'custom', dateParams: { startDate: '2026-10-01', endDate: '2026-10-23' }, enabled: true }));
    expect(useQuery).toHaveBeenCalledTimes(2);
    const configs = vi.mocked(useQuery).mock.calls.map(([config]) => config as { queryKey: unknown[]; queryFn: () => Promise<unknown> });
    expect(new Set(configs.map(({ queryKey }) => JSON.stringify(queryKey))).size).toBe(2);
    await Promise.all(configs.map(({ queryFn }) => queryFn()));
    expect(AdminSalesApi.fetchOverview).toHaveBeenCalledWith('branch-3', 'custom', '2026-10-01', '2026-10-23');
    expect(AdminSalesApi.fetchReferralSources).toHaveBeenCalledWith('branch-3', 'custom', '2026-10-01', '2026-10-23');
  });

  it('redacts separate server exceptions while keeping overview and referral retries', () => {
    vi.mocked(useQuery).mockReset();
    vi.mocked(useQuery)
      .mockReturnValueOnce({ data: undefined, status: 'error', error: new Error('PRIVATE_REVENUE_DATABASE'), refetch: retryOverview } as never)
      .mockReturnValueOnce({ data: undefined, status: 'error', error: new Error('PRIVATE_REFERRAL_DATABASE'), refetch: retryReferrals } as never);
    const { result } = renderHook(() => useAdminSalesReportingQueries({ selectedBranchId: 'all', range: 'this_month', dateParams: {}, enabled: true }));
    expect(result.current.overviewError).toBe('sales.AdminRepair.requestFailed');
    expect(result.current.referralError).toBe('sales.AdminRepair.requestFailed');
    expect(result.current.retryOverview).toBe(retryOverview);
    expect(result.current.retryReferrals).toBe(retryReferrals);
  });
});
