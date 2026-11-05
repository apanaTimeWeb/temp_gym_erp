// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_dashboard/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_attendance/attendance_dashboard; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminAttendanceBranchReferenceMockHandlers as adminAttendanceBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/mocks/handlers/AdminAttendanceDashboardBranchReferenceMockHandlers';
import { adminAttendanceMockHandlers as adminAttendanceMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/mocks/handlers/AdminAttendanceDashboardMockHandlers';

export const adminFeatureMockServer = setupServer(...adminAttendanceBranchReferenceMockHandlersHarnessSource0, ...adminAttendanceMockHandlersHarnessSource1);

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
