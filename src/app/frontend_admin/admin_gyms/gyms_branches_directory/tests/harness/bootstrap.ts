// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_branches/branches_directory/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_branches/branches_directory; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminBranchesMockHandlers as adminBranchesMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/mocks/handlers/AdminGymsBranchesDirectoryMockHandlers';

export const adminFeatureMockServer = setupServer(...adminBranchesMockHandlersHarnessSource0);

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
