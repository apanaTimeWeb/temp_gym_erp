// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin reports.
// DATA FLOW: AdminSalesMembershipGrowthReportBranchReferenceApi → module-owned handler → module-owned fixture.

import { http, HttpResponse } from 'msw';
import { MOCK_REPORTS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/fixtures/AdminSalesMembershipGrowthReportBranchReferenceMockFixtures';
export const adminSalesMembershipGrowthReportBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'reports') return;
    return HttpResponse.json({ success: true, message: 'Success', data: { items: MOCK_REPORTS_BRANCH_REFERENCES }, requestId: globalThis.crypto.randomUUID() });
  }),
];
