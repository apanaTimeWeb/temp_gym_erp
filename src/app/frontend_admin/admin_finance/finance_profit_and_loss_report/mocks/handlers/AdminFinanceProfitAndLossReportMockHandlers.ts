// RESPONSIBILITY: MSW mocks only the pnl endpoint owned by this leaf; export remains blocked pending a verified binary contract.
import { http, HttpResponse } from 'msw';
import { getAdminFinanceProfitAndLossReportFixture } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/mocks/fixtures/AdminFinanceProfitAndLossReportMockFixtures';

const ok = <T,>(data: T) => HttpResponse.json({ success: true, message: 'Success', data, requestId: globalThis.crypto.randomUUID() });

export const adminFinanceProfitAndLossReportMockHandlers = [
  http.get('*/admin/reports/pnl', ({ request }) => {
    const url = new URL(request.url);
    const fixture = getAdminFinanceProfitAndLossReportFixture({ gymId: url.searchParams.get('branchId') ?? 'all' });
    return ok(fixture);
  }),
];
