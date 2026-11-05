/** Standalone MSW and QueryClient bootstrap for dashboard_overview; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminDashboardHandlers as superadminDashboardHandlers } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/handlers/SuperadminDashboardOverviewMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminDashboardHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
