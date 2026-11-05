// RESPONSIBILITY: MSW handler for the single Sales membership-report endpoint owned by this leaf.
import { http, HttpResponse } from 'msw';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_membership_report/constants/AdminSalesMembershipReportConstants';
import { SALES_MOCK_SINGLE_BRANCH_MULTIPLIER } from '@/app/frontend_admin/admin_sales/sales_membership_report/mocks/fixtures/AdminSalesMembershipReportMockConstants';
import { MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_MEMBERSHIP_TOTALS } from '@/app/frontend_admin/admin_sales/sales_membership_report/mocks/fixtures/AdminSalesMembershipReportMockFixtures';
import { filterAdminSalesMembershipReportRows } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportFilterMembershipReportRows';
import { isValidAdminSalesDateRange } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportDateRangeUtils';
import type { MembershipTotals } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';

const failure = (message: string, statusCode: number) => HttpResponse.json({
  success: false,
  requestId: globalThis.crypto.randomUUID(),
  message,
  errorCode: statusCode === 501 ? 'ADMIN_API_501' : statusCode === 400 ? 'ADMIN_API_400' : 'ADMIN_API_500',
  statusCode,
  data: null,
}, { status: statusCode });

export const adminSalesMockHandlers = [
  http.get('*/admin/sales/membership-report', ({ request }) => {
    const url = new URL(request.url);
    const branchId = url.searchParams.get('branchId') ?? 'all';
    const range = url.searchParams.get('range') ?? 'this_month';
    const search = url.searchParams.get('search') ?? '';
    const startDate = url.searchParams.get('startDate') ?? '';
    const endDate = url.searchParams.get('endDate') ?? '';

    if (url.searchParams.get('scenario') === 'error' || url.searchParams.get('mockError') === 'true') {
      return failure('Simulated Sales membership report failure', 500);
    }
    if (!(DATE_FILTERS as readonly string[]).includes(range)) return failure('Unsupported Sales range.', 400);
    if (range === 'custom') {
      if (!startDate || !endDate || !isValidAdminSalesDateRange(startDate, endDate)) {
        return failure('A valid startDate and endDate are required for custom range.', 400);
      }
      return failure('The supplied aggregate fixture has no date dimensions for this report.', 501);
    }

    const branchRows = branchId === 'all'
      ? MOCK_ADMIN_MEMBERSHIP_REPORT
      : MOCK_ADMIN_MEMBERSHIP_REPORT.filter((row) => row.name === ({ b1: 'Andheri East', b2: 'Bandra West' } as Record<string, string>)[branchId]);
    const filteredReport = filterAdminSalesMembershipReportRows(branchRows, search);
    const multiplier = branchId !== 'all' ? SALES_MOCK_SINGLE_BRANCH_MULTIPLIER : 1;
    const report = filteredReport.map((row) => ({ ...row, revenue: row.revenue === undefined ? undefined : Math.round(row.revenue * multiplier) }));
    const totals = report.reduce<MembershipTotals>((summary, row) => ({
      activeCount: (summary.activeCount ?? 0) + (row.activeMembers ?? 0),
      revenue: (summary.revenue ?? 0) + (row.revenue ?? 0),
      totalReceivable: (summary.totalReceivable ?? 0) + (row.receivable ?? 0),
      totalReceived: (summary.totalReceived ?? 0) + (row.received ?? 0),
      remaining: (summary.remaining ?? 0) + (row.remaining ?? 0),
      refunds: (summary.refunds ?? 0) + (row.refund ?? 0),
    }), { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 });
    const data = report.length ? { report, totals } : { report, totals: { ...MOCK_ADMIN_MEMBERSHIP_TOTALS, activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 } };
    return HttpResponse.json({ success: true, requestId: globalThis.crypto.randomUUID(), message: 'Sales membership report fetched', data });
  }),
];
