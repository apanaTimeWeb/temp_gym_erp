/** Standalone MSW and QueryClient bootstrap for reports_center; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminReportsHandlers as superadminReportsHandlers } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/mocks/handlers/SuperadminAnalyticsReportsCenterMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminReportsHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
