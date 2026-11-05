/** Standalone MSW and QueryClient bootstrap for global_audit_overview; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminGlobalAuditHandlers as superadminGlobalAuditHandlers } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_global_audit_overview/mocks/handlers/SuperadminAuditComplianceGlobalAuditOverviewMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminGlobalAuditHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
