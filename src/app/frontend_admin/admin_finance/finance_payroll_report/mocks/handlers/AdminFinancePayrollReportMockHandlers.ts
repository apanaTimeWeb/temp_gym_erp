// RESPONSIBILITY: MSW mocks only the payroll endpoint owned by this leaf; export remains blocked pending a verified binary contract.
import { http, HttpResponse } from 'msw';
import { getAdminFinancePayrollReportFixture } from '@/app/frontend_admin/admin_finance/finance_payroll_report/mocks/fixtures/AdminFinancePayrollReportMockFixtures';

const ok = <T,>(data: T) => HttpResponse.json({ success: true, message: 'Success', data, requestId: globalThis.crypto.randomUUID() });

export const adminFinancePayrollReportMockHandlers = [
  http.get('*/admin/reports/payroll', ({ request }) => {
    const url = new URL(request.url);
    const fixture = getAdminFinancePayrollReportFixture({ gymId: url.searchParams.get('branchId') ?? 'all' });
    return ok(fixture);
  }),
];
