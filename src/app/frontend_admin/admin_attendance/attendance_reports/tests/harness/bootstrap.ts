// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_attendance/attendance_reports/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_attendance/attendance_reports; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminAttendanceReportsBranchReferenceMockHandlers as AdminAttendanceReportsBranchReferenceMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/handlers/AdminAttendanceReportsBranchReferenceMockHandlers';
import { adminAttendanceReportsMockHandlers as AdminAttendanceReportsMockHandlersHarnessSource1 } from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/handlers/AdminAttendanceReportsMockHandlers';

export const adminFeatureMockServer = setupServer(...AdminAttendanceReportsBranchReferenceMockHandlersHarnessSource0, ...AdminAttendanceReportsMockHandlersHarnessSource1);

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
