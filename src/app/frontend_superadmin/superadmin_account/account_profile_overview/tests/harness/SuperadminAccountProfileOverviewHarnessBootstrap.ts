/** Standalone MSW and QueryClient bootstrap for profile_overview; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminProfileHandlers as superadminProfileHandlers } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/handlers/SuperadminAccountProfileOverviewMockHandlers';
import { resetSuperadminAccountProfileMockState as resetSuperadminAccountProfileMockStateForProfileOverview1 } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/handlers/SuperadminAccountProfileOverviewMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminProfileHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminAccountProfileMockStateForProfileOverview1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
