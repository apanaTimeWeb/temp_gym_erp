// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin Finance SalaryAdvanceManagement.
// DATA FLOW: AdminFinanceSalaryAdvanceManagementBranchReferenceApi → module-owned handler → module-owned fixture.

import { http, HttpResponse } from 'msw';
import { MOCK_FINANCE_SALARY_ADVANCE_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/mocks/fixtures/AdminFinanceSalaryAdvanceManagementBranchReferenceMockFixtures';
export const adminFinanceSalaryAdvanceManagementBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'hr') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_FINANCE_SALARY_ADVANCE_BRANCH_REFERENCES , requestId: globalThis.crypto.randomUUID() });
  }),
];
