/** Standalone MSW and QueryClient bootstrap for usage_meters_dashboard; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminUsageMetersHandlers as superadminUsageMetersHandlers } from '@/app/frontend_superadmin/superadmin_billing/billing_usage_meters_dashboard/mocks/handlers/SuperadminBillingUsageMetersDashboardMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminUsageMetersHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
