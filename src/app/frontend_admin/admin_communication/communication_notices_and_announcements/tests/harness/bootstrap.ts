// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_communication/communication_notices_and_announcements; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminAnnouncementsMockHandlers as adminAnnouncementsMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/handlers/AdminCommunicationNoticesAndAnnouncementsMockHandlers';

export const adminFeatureMockServer = setupServer(...adminAnnouncementsMockHandlersHarnessSource0);

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
