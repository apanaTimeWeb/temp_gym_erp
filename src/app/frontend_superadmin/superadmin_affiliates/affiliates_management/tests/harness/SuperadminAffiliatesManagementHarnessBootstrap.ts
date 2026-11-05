/** Standalone MSW and QueryClient bootstrap for affiliates_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminAffiliatesHandlers as superadminAffiliatesHandlers } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/handlers/SuperadminAffiliatesManagementMockHandlers';
import { resetSuperadminAffiliatesMockState as resetSuperadminAffiliatesMockStateForAffiliatesManagement1 } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/mocks/handlers/SuperadminAffiliatesManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminAffiliatesHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminAffiliatesMockStateForAffiliatesManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
