// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_gym_health_alerts/gym_health_alerts_monitoring; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { resetAdminGymHealthAlertMockState, adminGymHealthAlertsMockHandlers as adminGymHealthAlertsMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/handlers/AdminGymsHealthAlertsMonitoringMockHandlers';

export const adminFeatureMockServer = setupServer(...adminGymHealthAlertsMockHandlersHarnessSource0);

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
  resetAdminGymHealthAlertMockState();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 1;
