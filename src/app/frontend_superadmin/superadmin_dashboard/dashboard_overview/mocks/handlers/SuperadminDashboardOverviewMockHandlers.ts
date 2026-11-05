import { http, HttpResponse, delay } from 'msw';
import { SUPERADMIN_DASHBOARD_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config';
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/fixtures/SuperadminDashboardOverviewMockFixtures';
import type { SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';
import type { ApiResponse } from '@/lib/api';

export type SuperadminDashboardMockScenario = 'success' | 'empty' | 'error';
export function getSuperadminDashboardMockData(scenario: SuperadminDashboardMockScenario = 'success'): SuperadminDashboardApiData {
  const data = structuredClone(MOCK_SUPERADMIN_DASHBOARD_DATA);
  if (scenario === 'empty') return { metrics: { ...data.metrics, totalGyms: 0, activeGyms: 0, trialGyms: 0, totalEndUsers: 0, monthlyRecurringRevenue: 0, overdueInvoicesCount: 0, pendingRevenue: 0, recentOnboards: [], revenueByTier: [], revenueByGeography: [] }, revenue: [], growth: [] };
  return data;
}
async function getResponse(request: Request) {
  await delay(80);
  const scenario = (new URL(request.url).searchParams.get('__mockScenario') ?? 'success') as SuperadminDashboardMockScenario;
  if (scenario === 'error') return HttpResponse.json({ success: false, message: 'Dashboard metrics unavailable.', data: null, errorCode: 'INTERNAL_SERVER_ERROR', statusCode: 500, requestId: crypto.randomUUID()}, { status: 500 });
  if (scenario !== 'success' && scenario !== 'empty') return HttpResponse.json({ success: false, message: 'Invalid dashboard mock scenario.', data: null, errorCode: 'VALIDATION_ERROR', statusCode: 400, requestId: crypto.randomUUID()}, { status: 400 });
  return HttpResponse.json<ApiResponse<SuperadminDashboardApiData>>({ success: true, message: 'Success', data: getSuperadminDashboardMockData(scenario), requestId: crypto.randomUUID()});
}
export const superadminDashboardHandlers = [
  http.get(SUPERADMIN_DASHBOARD_OVERVIEW_API.METRICS, ({ request }) => getResponse(request)),
  http.get(SUPERADMIN_DASHBOARD_OVERVIEW_API.BASE, ({ request }) => getResponse(request)),
];
