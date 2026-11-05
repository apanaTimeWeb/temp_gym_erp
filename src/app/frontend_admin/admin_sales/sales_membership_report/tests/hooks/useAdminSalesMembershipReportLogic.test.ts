// RESPONSIBILITY: Verifies URL-synchronized filters and the focused membership-report hook.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportLogic';

const router = { push: vi.fn() };
const searchParams = new URLSearchParams('branchId=b1&range=this_month&search=riya&page=2');
vi.mock('next/navigation', () => ({ useRouter: () => router, useSearchParams: () => searchParams, usePathname: () => '/frontend_admin/admin_sales/sales_membership_report' }));
vi.mock('@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportDebounce', () => ({ useAdminSalesDebounce: (value: string) => value }));
vi.mock('@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportReportingQueries', () => ({
  useAdminSalesReportingQueries: vi.fn(() => ({
    membershipReport: [{ id: 1, name: 'Riya' }], membershipTotals: { activeCount: 1, revenue: 100 },
    membershipReportStatus: 'success', membershipReportError: '', retryMembershipReport: vi.fn(),
  })),
}));

describe('useAdminSalesLogic', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('returns only membership-report-owned state', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    expect(result.current.membershipReport).toEqual([{ id: 1, name: 'Riya' }]);
    expect(result.current.membershipTotals).toEqual({ activeCount: 1, revenue: 100 });
    expect(result.current.search).toBe('riya');
    expect(Object.keys(result.current).sort()).toEqual([
      'endDate', 'isCustomRangeBlocked', 'membershipReport', 'membershipReportError',
      'membershipReportStatus', 'membershipTotals', 'retryMembershipReport', 'search', 'setSearch', 'startDate',
    ].sort());
  });

  it('writes search updates back to the shareable route and removes stale pagination', () => {
    const { result } = renderHook(() => useAdminSalesLogic());
    act(() => result.current.setSearch('aman'));
    expect(router.push).toHaveBeenCalledWith('/frontend_admin/admin_sales/sales_membership_report?branchId=b1&range=this_month&search=aman', { scroll: false });
  });
});
