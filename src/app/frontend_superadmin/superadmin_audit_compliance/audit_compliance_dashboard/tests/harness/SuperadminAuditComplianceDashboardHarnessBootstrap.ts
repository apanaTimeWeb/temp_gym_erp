/** Standalone MSW and QueryClient bootstrap for compliance_dashboard; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminComplianceHandlers as superadminComplianceHandlers } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/mocks/handlers/SuperadminAuditComplianceDashboardMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminComplianceHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
