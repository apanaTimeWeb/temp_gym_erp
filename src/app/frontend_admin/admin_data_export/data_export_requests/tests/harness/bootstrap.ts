// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_data_export/data_export_requests/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_data_export/data_export_requests; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';

export const adminFeatureMockServer = setupServer();

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 0;
