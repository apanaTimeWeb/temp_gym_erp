// RESPONSIBILITY: Defines regression tests for bootstrap; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_audit_logs/audit_logs_explorer/tests/harness/bootstrap.ts)

/** Standalone MSW bootstrap for admin_audit_logs/audit_logs_explorer; only module-owned handlers are registered. */
import { setupServer } from 'msw/node';
import { adminAuditLogsMockHandlers as adminAuditLogsMockHandlersHarnessSource0 } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/mocks/handlers/AdminSecurityAuditLogsExplorerMockHandlers';

export const adminFeatureMockServer = setupServer(...adminAuditLogsMockHandlersHarnessSource0);

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
