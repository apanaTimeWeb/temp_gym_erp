// RESPONSIBILITY: Defines executable MSW scenarios for the dashboard overview API.
import { http, HttpResponse } from 'msw';

import { ManagerInfrastructureMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureMockApiUrl';
import { MANAGER_DASHBOARD_OVERVIEW_API } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';
import { MOCK_DASHBOARD_STATS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/ManagerDashboardOverviewMockData';
import type { ManagerDashboardOverviewStats } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';

export const MANAGER_DASHBOARD_OVERVIEW_MOCK_SCENARIOS = {
  ACTIVE: { status: 200, kind: 'success' },
  EMPTY: { status: 200, kind: 'empty' },
  SERVER_500: { status: 500, kind: 'server-error' },
  TIMEOUT: { status: 0, kind: 'network-timeout' },
  UNAUTHORIZED: { status: 401, kind: 'unauthorized' },
  INVALID: { status: 200, kind: 'invalid-payload' },
  CANCELLED: { status: 0, kind: 'cancelled-request' },
  RETRY: { status: 503, kind: 'retry-then-success' },
} as const;

export type ManagerDashboardOverviewMockScenario = keyof typeof MANAGER_DASHBOARD_OVERVIEW_MOCK_SCENARIOS;

/** Creates a runnable handler for a named scenario. RETRY returns one transient 503 before recovering. */
export function createManagerDashboardOverviewScenarioHandler(
  scenario: ManagerDashboardOverviewMockScenario,
  data: ManagerDashboardOverviewStats = MOCK_DASHBOARD_STATS,
) {
  let attempts = 0;
  return http.get(ManagerInfrastructureMockApiUrl(MANAGER_DASHBOARD_OVERVIEW_API.STATS), () => {
    attempts += 1;
    const success = (payload: ManagerDashboardOverviewStats) => HttpResponse.json({ success: true, message: 'Dashboard statistics loaded', data: payload, requestId: 'mock-dashboard-stats' });
    const failure = (message: string, status: number, errorCode: string) => HttpResponse.json({ success: false, message, data: null, errorCode, statusCode: status, requestId: 'mock-dashboard-stats' }, { status });
    switch (scenario) {
      case 'ACTIVE': return success(data);
      case 'EMPTY': return success({ ...data, recentMembers: [], recentPayments: [], pendingPaymentsList: [], expiringMemberships: [], memberGrowth: [], revenueChart: [], membersByPlan: [] });
      case 'SERVER_500': return failure('Simulated dashboard server error', 500, 'INTERNAL_ERROR');
      case 'UNAUTHORIZED': return failure('Authentication is required', 401, 'UNAUTHORIZED');
      case 'INVALID': return HttpResponse.json({ success: true, message: 'Invalid dashboard payload', data: { invalid: true }, requestId: 'mock-dashboard-stats' });
      case 'TIMEOUT': return HttpResponse.error();
      case 'CANCELLED': throw new DOMException('Simulated request cancellation', 'AbortError');
      case 'RETRY': return attempts === 1 ? failure('Temporary dashboard outage', 503, 'SERVICE_UNAVAILABLE') : success(data);
    }
  });
}
