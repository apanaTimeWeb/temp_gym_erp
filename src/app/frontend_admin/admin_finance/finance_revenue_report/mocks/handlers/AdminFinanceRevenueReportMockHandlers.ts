// RESPONSIBILITY: MSW mocks only the revenue endpoint owned by this leaf; export remains blocked pending a verified binary contract.
import { http, HttpResponse } from 'msw';
import { getAdminFinanceRevenueReportFixture } from '@/app/frontend_admin/admin_finance/finance_revenue_report/mocks/fixtures/AdminFinanceRevenueReportMockFixtures';

const ok = <T,>(data: T) => HttpResponse.json({ success: true, message: 'Success', data, requestId: globalThis.crypto.randomUUID() });

export const adminFinanceRevenueReportMockHandlers = [
  http.get('*/admin/reports/revenue', ({ request }) => {
    const url = new URL(request.url);
    const fixture = getAdminFinanceRevenueReportFixture({ gymId: url.searchParams.get('branchId') ?? 'all' });
    return ok(fixture);
  }),
];
