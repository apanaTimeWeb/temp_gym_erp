// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_members/members_directory; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminMembersBranchReferenceMockHandlers as adminMembersBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_members/members_directory/mocks/handlers/AdminMembersDirectoryBranchReferenceMockHandlers';
import { adminMembersMockHandlers as adminMembersMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_members/members_directory/mocks/handlers/AdminMembersDirectoryMockHandlers';

export const adminFeatureMockServer = setupServer(...adminMembersBranchReferenceMockHandlersHarnessSource0, ...adminMembersMockHandlersHarnessSource1);

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 2;
