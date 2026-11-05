// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin reports.
// DATA FLOW: AdminFinanceRevenueReportBranchReferenceApi → module-owned handler → module-owned fixture.

import { http, HttpResponse } from 'msw';
import { MOCK_REPORTS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_finance/finance_revenue_report/mocks/fixtures/AdminFinanceRevenueReportBranchReferenceMockFixtures';
export const adminFinanceRevenueReportBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'reports') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_REPORTS_BRANCH_REFERENCES , requestId: globalThis.crypto.randomUUID() });
  }),
];
