/**
 * Canonical standalone test bootstrap for gyms_directory.
 * Promoted from the module's existing mock harness and rebased to local paths.
 * Use the lifecycle functions below from the owning Vitest setup.
 */
/** Standalone MSW and QueryClient bootstrap for gyms_directory; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';

import { superadminGymsHandlers as superadminGymsHandlers } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockHandlers';
import { resetSuperadminGymsMockState as resetSuperadminGymsMockStateForGymsManagement2 } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockHandlers';
import { superadminGymsV1Handlers as superadminGymsV1Handlers } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockHandlers';
import { resetSuperadminGymsMockState as resetSuperadminGymsMockStateForGymsManagement3 } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryV1MockHandlers';


export const superadminMockServer = setupServer(
  ...superadminGymsHandlers,
  ...superadminGymsV1Handlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminGymsMockStateForGymsManagement2(); resetSuperadminGymsMockStateForGymsManagement3();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
