// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_profile/profile_overview/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_profile/profile_overview; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminProfileMockHandlers as adminProfileMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_profile/profile_overview/mocks/handlers/AdminProfileOverviewMockHandlers';

export const adminFeatureMockServer = setupServer(...adminProfileMockHandlersHarnessSource0);

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
