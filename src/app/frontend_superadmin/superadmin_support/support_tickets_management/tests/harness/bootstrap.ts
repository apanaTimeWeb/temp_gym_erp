/**
 * Canonical standalone test bootstrap for tickets_management.
 * Promoted from the module's existing mock harness and rebased to local paths.
 * Use the lifecycle functions below from the owning Vitest setup.
 */
/** Standalone MSW and QueryClient bootstrap for tickets_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminTicketsHandlers as superadminTicketsHandlers } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/handlers/SuperadminSupportTicketsManagementMockHandlers';
import { resetSuperadminSupportTicketsMockState as resetSuperadminSupportTicketsMockStateForTicketsManagement1 } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/handlers/SuperadminSupportTicketsManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminTicketsHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminSupportTicketsMockStateForTicketsManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
