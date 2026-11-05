// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_blacklist/blacklist_management; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminBlacklistMockHandlers as adminBlacklistMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/handlers/AdminMembersBlacklistManagementMockHandlers';

export const adminFeatureMockServer = setupServer(...adminBlacklistMockHandlersHarnessSource0);

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
