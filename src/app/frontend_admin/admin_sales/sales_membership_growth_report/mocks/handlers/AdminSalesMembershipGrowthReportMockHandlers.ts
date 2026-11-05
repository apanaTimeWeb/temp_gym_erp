// RESPONSIBILITY: MSW mocks only the membership endpoint owned by this leaf; export remains blocked pending a verified binary contract.
import { http, HttpResponse } from 'msw';
import { getAdminSalesMembershipGrowthReportFixture } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/fixtures/AdminSalesMembershipGrowthReportMockFixtures';

const ok = <T,>(data: T) => HttpResponse.json({ success: true, message: 'Success', data, requestId: globalThis.crypto.randomUUID() });

export const adminSalesMembershipGrowthReportMockHandlers = [
  http.get('*/admin/reports/members', ({ request }) => {
    const url = new URL(request.url);
    const fixture = getAdminSalesMembershipGrowthReportFixture({ gymId: url.searchParams.get('branchId') ?? 'all' });
    return ok(fixture);
  }),
];
