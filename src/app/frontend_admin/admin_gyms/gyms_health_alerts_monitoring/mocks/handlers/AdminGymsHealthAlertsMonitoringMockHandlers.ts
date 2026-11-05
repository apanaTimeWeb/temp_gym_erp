// RESPONSIBILITY: Owns module-local MSW handlers for gym_health_alerts_monitoring; it simulates only the endpoints and fields supported by the supplied feature contract.
// DATA FLOW: MSW request → request/schema validation → module fixture state → response envelope → feature query/UI (admin_gym_health_alerts/gym_health_alerts_monitoring/mocks/handlers/AdminGymsHealthAlertsMonitoringMockHandlers.ts)

import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse } from 'msw';
import { MOCK_ADMIN_GYM_HEALTH_ALERTS } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/fixtures/AdminGymsHealthAlertsMonitoringMockFixtures';

let adminGymHealthAlertScenario: 'normal' | 'alerts-error' | 'summary-error' = 'normal';
export function setAdminGymHealthAlertScenario(scenario: 'normal' | 'alerts-error' | 'summary-error'): void { adminGymHealthAlertScenario = scenario; }

let healthAlertsState = structuredClone(MOCK_ADMIN_GYM_HEALTH_ALERTS);

/** Reset mutable fixture state independently of MSW handler registration. */
export function resetAdminGymHealthAlertMockState(): void {
  healthAlertsState = structuredClone(MOCK_ADMIN_GYM_HEALTH_ALERTS);
  adminGymHealthAlertScenario = 'normal';
}
const ok = <T>(data: T, message = 'Success') => HttpResponse.json({ success: true, message, data  , requestId: globalThis.crypto.randomUUID()});

export const adminGymHealthAlertsMockHandlers = [
  http.get('*/frontend_admin/admin_gyms/gyms_health_alerts_monitoring', ({ request }) => {
    if (adminGymHealthAlertScenario === 'alerts-error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_INTERNAL_SERVER_ERROR', statusCode: StatusCodes.INTERNAL_SERVER_ERROR, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load alerts.' }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
    const url = new URL(request.url);
    const severity = url.searchParams.get('severity');
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const alerts = healthAlertsState.filter((item) => (!severity || severity === 'all' || item.severity === severity) && (!search || `${item.title} ${item.description} ${item.gymName}`.toLowerCase().includes(search)));
    return ok(alerts);
  }),
  http.get('*/admin/gym-health-alerts/summary', () => { if (adminGymHealthAlertScenario === 'summary-error') return HttpResponse.json({ data: null, errorCode: 'ADMIN_API_INTERNAL_SERVER_ERROR', statusCode: StatusCodes.INTERNAL_SERVER_ERROR, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Unable to load summary.' }, { status: StatusCodes.INTERNAL_SERVER_ERROR }); return ok({
    totalAlerts: healthAlertsState.length,
    criticalAlerts: healthAlertsState.filter((item) => item.severity === 'critical').length,
    warningAlerts: healthAlertsState.filter((item) => item.severity === 'warning').length,
    infoAlerts: healthAlertsState.filter((item) => item.severity === 'info').length,
  }); }),
  http.post('*/admin/gym-health-alerts/:id/dismiss', ({ params }) => {
    const id = String(params.id ?? '');
    const exists = healthAlertsState.some((item) => item.id === id);
    if (!exists) return HttpResponse.json({ errorCode: 'ADMIN_API_NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: globalThis.crypto.randomUUID(), success: false, message: 'Alert not found', data: null }, { status: StatusCodes.NOT_FOUND });
    healthAlertsState = healthAlertsState.filter((item) => item.id !== id);
    return ok(null, 'Alert dismissed');
  }),
];
