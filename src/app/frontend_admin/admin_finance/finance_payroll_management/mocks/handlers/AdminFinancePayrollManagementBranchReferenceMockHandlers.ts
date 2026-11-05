// RESPONSIBILITY: Owns module-local MSW branch reference handling for Admin Finance PayrollManagement.
// DATA FLOW: AdminFinancePayrollManagementBranchReferenceApi → module-owned handler → module-owned fixture.

import { http, HttpResponse } from 'msw';
import { MOCK_FINANCE_PAYROLL_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/fixtures/AdminFinancePayrollManagementBranchReferenceMockFixtures';
export const adminFinancePayrollManagementBranchReferenceMockHandlers = [
  http.get('*/admin/branches/fetchBranches', ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get('consumer') !== 'hr') return;
    return HttpResponse.json({ success: true, message: 'Success', data: MOCK_FINANCE_PAYROLL_BRANCH_REFERENCES , requestId: globalThis.crypto.randomUUID() });
  }),
];
