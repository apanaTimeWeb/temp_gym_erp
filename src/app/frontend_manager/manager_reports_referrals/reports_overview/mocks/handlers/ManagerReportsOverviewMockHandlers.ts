import { MANAGER_REPORTS_OVERVIEW_API } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/config/manager_reports_overview.url_config';
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';



import { MANAGERREPORTSOVERVIEW_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/mocks/scenarios/ManagerReportsOverviewMockScenarios';
import { MOCK_REPORT_SUMMARY } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/mocks/fixtures/ManagerReportsOverviewMockData';

/**
 * @description Provides the Manager Reports summary MSW handler for frontend-first testing.
 * @dependencies ManagerMockApiUrl, ManagerReportsOverviewMockData, ManagerReportsOverviewUrlConfig.
 * @edge-case Keeps the handler aligned with the summary-only Manager Reports API contract.
 */
export const managerReportsHandlers = [
  http.get(ManagerInfrastructureMockApiUrl(MANAGER_REPORTS_OVERVIEW_API.SUMMARY), ({ request }) => {
    const url = new URL(request.url);
    const scenario = url.searchParams.get('scenario') as keyof typeof MANAGERREPORTSOVERVIEW_MOCK_SCENARIOS | null;
    const selectedScenario = scenario ? MANAGERREPORTSOVERVIEW_MOCK_SCENARIOS[scenario] : undefined;
    const requestId = crypto.randomUUID();
    if (selectedScenario?.kind === 'server-error' || selectedScenario?.kind === 'unauthorized') {
      const status = selectedScenario.status;
      return HttpResponse.json({ success: false, message: selectedScenario.kind === 'unauthorized' ? 'Unauthorized' : 'Report service unavailable', data: null, errorCode: selectedScenario.kind === 'unauthorized' ? 'UNAUTHORIZED' : 'SERVER_ERROR', statusCode: status, requestId }, { status });
    }
    if (selectedScenario?.kind === 'network-timeout' || selectedScenario?.kind === 'cancelled-request') return HttpResponse.error();
    if (selectedScenario?.kind === 'retry-then-success') return HttpResponse.json({ success: false, message: 'Please retry the report request', data: null, errorCode: 'RETRY', statusCode: 503, requestId }, { status: 503 });
    if (selectedScenario?.kind === 'invalid-payload') return HttpResponse.json({ success: true, message: 'Invalid report fixture', data: { kpis: { totalRevenue: -1 }, revenueData: [], attendanceData: [], memberChurnData: [], expenseBreakdown: [] }, requestId });
    const range = url.searchParams.get('range') ?? 'this_month';
    const summary = selectedScenario?.kind === 'empty'
      ? { ...MOCK_REPORT_SUMMARY, revenueData: [], attendanceData: [], memberChurnData: [], expenseBreakdown: [] }
      : MOCK_REPORT_SUMMARY;
    const currentMonth = new Date().getMonth();
    const monthly = summary.revenueData.filter((point) => {
      const monthIndex = new Date(`${point.month} 1, ${new Date().getFullYear()}`).getMonth();
      if (range === 'this_month') return monthIndex === currentMonth;
      if (range === 'last_month') return monthIndex === (currentMonth + 11) % 12;
      if (range === 'last_3_months') return (currentMonth - monthIndex + 12) % 12 < 3;
      if (range === 'last_6_months') return (currentMonth - monthIndex + 12) % 12 < 6;
      if (range === 'this_year' || range === 'custom') return true;
      return false;
    });
    return HttpResponse.json({ success: true, message: 'Report summary fetched', data: { ...summary, revenueData: monthly }, requestId, meta: { range } });
  }),
];
