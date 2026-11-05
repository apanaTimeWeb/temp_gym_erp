// RESPONSIBILITY: Defines regression tests for AdminGymsHealthAlertsMonitoringScenarios.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/scenarios/AdminGymsHealthAlertsMonitoringScenarios.test.ts)

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { adminFeatureMockServer as server } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/tests/harness/bootstrap';
import { ADMIN_GYM_HEALTH_ALERTS_MONITORING_SCENARIOS, createAdminGymsHealthAlertsMonitoringScenarioHandler } from "@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/scenarios/admin_gyms_health_alerts_monitoring.scenarios";

import { resetAdminGymHealthAlertMockState } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/handlers/AdminGymsHealthAlertsMonitoringMockHandlers';
import { MOCK_ADMIN_GYM_HEALTH_ALERTS } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/fixtures/AdminGymsHealthAlertsMonitoringMockFixtures';

const scenarioProbeUrl = 'https://admin-scenario.test/admin_gym_health_alerts/gym_health_alerts_monitoring';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('admin_gym_health_alerts/gym_health_alerts_monitoring canonical MSW scenarios', () => {
  it('resets mutable mock state after a simulated dismiss without changing seed fixtures', async () => {
    resetAdminGymHealthAlertMockState();
    const endpoint = 'https://admin-scenario.test/frontend_admin/admin_gyms/gyms_health_alerts_monitoring';
    const initial = await fetch(endpoint).then((response) => response.json()) as { data: typeof MOCK_ADMIN_GYM_HEALTH_ALERTS };
    expect(initial.data.length).toBe(MOCK_ADMIN_GYM_HEALTH_ALERTS.length);
    const firstId = initial.data[0]?.id;
    expect(firstId).toBeTruthy();
    await fetch(`https://admin-scenario.test/admin/gym-health-alerts/${encodeURIComponent(firstId!)}/dismiss`, { method: 'POST' });
    const changed = await fetch(endpoint).then((response) => response.json()) as { data: typeof MOCK_ADMIN_GYM_HEALTH_ALERTS };
    expect(changed.data.length).toBe(initial.data.length - 1);
    resetAdminGymHealthAlertMockState();
    const restored = await fetch(endpoint).then((response) => response.json()) as { data: typeof MOCK_ADMIN_GYM_HEALTH_ALERTS };
    expect(restored.data).toEqual(initial.data);
  });

  it('declares the five canonical scenario choices', () => {
    expect(Object.keys(ADMIN_GYM_HEALTH_ALERTS_MONITORING_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED']);
  });

  it('requires contract-shaped data for EMPTY', () => {
    expect(() => createAdminGymsHealthAlertsMonitoringScenarioHandler('EMPTY', scenarioProbeUrl)).toThrow(/schema-correct emptyData/);
  });

  it.each([
    ['SERVER_500', 500, 'ERR_INTERNAL'],
    ['TIMEOUT', 504, 'ERR_TIMEOUT'],
    ['UNAUTHORIZED', 401, 'ERR_UNAUTHORIZED'],
  ] as const)('returns a canonical failure envelope for %s', async (scenario, status, errorCode) => {
    server.use(createAdminGymsHealthAlertsMonitoringScenarioHandler(scenario, scenarioProbeUrl, { timeoutDelayMs: 0 }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; errorCode: string; statusCode: number; requestId: string };
    expect(response.status).toBe(status);
    expect(body.success).toBe(false);
    expect(body.data).toBeNull();
    expect(body.errorCode).toBe(errorCode);
    expect(body.statusCode).toBe(status);
    expect(body.requestId).toBeTruthy();
  });

  it('can return an explicitly supplied empty payload without guessing the API shape', async () => {
    server.use(createAdminGymsHealthAlertsMonitoringScenarioHandler('EMPTY', scenarioProbeUrl, { emptyData: [] }));
    const response = await fetch(scenarioProbeUrl);
    const body = await response.json() as { success: boolean; data: unknown; requestId: string };
    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data).toEqual([]);
    expect(body.requestId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });
});
