// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_hr/hr_staff_management/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_hr/hr_management; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminHrBranchReferenceMockHandlers as adminHrBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_hr/hr_staff_management/mocks/handlers/AdminHrStaffManagementBranchReferenceMockHandlers';
import { adminHrMockHandlers as adminHrMockHandlersHarnessSource1, resetAdminHrStaffMockState } from '@/app/frontend_admin/admin_hr/hr_staff_management/mocks/handlers/AdminHrStaffManagementMockHandlers';

export const adminFeatureMockServer = setupServer(...adminHrBranchReferenceMockHandlersHarnessSource0, ...adminHrMockHandlersHarnessSource1);

export function startAdminFeatureMockServer(): void {
  adminFeatureMockServer.listen({ onUnhandledRequest: 'error' });
}
export function resetAdminFeatureMockServer(): void {
  adminFeatureMockServer.resetHandlers();
  resetAdminHrStaffMockState();
}
export function stopAdminFeatureMockServer(): void {
  adminFeatureMockServer.close();
}
export const adminFeatureScenarioHandlerCount = 2;
