// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin Finance StaffDuesManagement.
// DATA FLOW: AdminFinanceStaffDuesManagementBranchReferenceApi → module-owned handler → module-owned fixture.

import { http, HttpResponse } from 'msw';
import { MOCK_FINANCE_STAFF_DUES_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/mocks/fixtures/AdminFinanceStaffDuesManagementBranchReferenceMockFixtures';
export const adminFinanceStaffDuesManagementBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'hr') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_FINANCE_STAFF_DUES_BRANCH_REFERENCES , requestId: globalThis.crypto.randomUUID() });
  }),
];
