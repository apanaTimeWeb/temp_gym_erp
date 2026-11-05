import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewLogic';

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
  searchParams: new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2'),
  runQueries: vi.fn(() => ({
    overviewData: [{ date: '2026-10-01', revenue: 100, newMembers: 10 }],
    overviewStatus: 'success', overviewError: '', retryOverview: vi.fn(),
    referralData: [{ source: 'referral', revenue: 300 }],
    referralStatus: 'success', referralError: '', retryReferrals: vi.fn(),
  })),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mocks.push }),
  useSearchParams: () => mocks.searchParams,
  usePathname: () => '/frontend_admin/admin_sales/sales_overview',
}));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewDebounce', () => ({ useAdminSalesDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_sales/sales_overview/hooks/useAdminSalesOverviewReportingQueries', () => ({ useAdminSalesReportingQueries: mocks.runQueries }));

describe('useAdminSalesLogic — Sales overview ownership', () => {
  beforeEach(() => {
    mocks.push.mockReset();
    mocks.runQueries.mockClear();
    mocks.searchParams = new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2');
  });

  it('exposes only the overview and referral-source workflows', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.overviewData).toEqual([{ date: '2026-10-01', revenue: 100, newMembers: 10 }]);
    expect(result.current.referralData).toEqual([{ source: 'referral', revenue: 300 }]);
    expect(Object.keys(result.current)).not.toContain('pendingPayments');
    expect(Object.keys(result.current)).not.toContain('storeOrders');
    expect(mocks.runQueries).toHaveBeenCalledWith(expect.objectContaining({ selectedBranchId: 'b1', range: 'this_month', enabled: true }));
  });

  it('writes search updates back to the shareable Sales overview URL', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    act(() => result.current.setSearch('aman'));
    expect(mocks.push).toHaveBeenCalledTimes(1);
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('search=aman');
    expect(String(mocks.push.mock.calls[0]?.[0])).toContain('branchId=b1');
  });
});
