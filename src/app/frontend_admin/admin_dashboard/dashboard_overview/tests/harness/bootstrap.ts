// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_dashboard/dashboard_overview; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminDashboardMockHandlers as adminDashboardMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/mocks/handlers/AdminDashboardOverviewMockHandlers';

export const adminFeatureMockServer = setupServer(...adminDashboardMockHandlersHarnessSource0);

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 1;
