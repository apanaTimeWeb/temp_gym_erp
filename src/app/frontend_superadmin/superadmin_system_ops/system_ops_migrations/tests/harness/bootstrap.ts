/**
 * Canonical standalone test bootstrap for this autonomous Superadmin leaf.
 * Use startSuperadminMockServer/resetSuperadminMockState/stopSuperadminMockServer
 * from the owning Vitest setup; no host root or sibling feature module is required.
 */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminMigrationsHandlers, resetSuperadminSystemOpsMigrationsMockState } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/mocks/SuperadminSystemOpsMigrationsMockHandlers';

export const superadminMockServer = setupServer(...superadminMigrationsHandlers);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
      mutations: { retry: false },
    },
  });
}

export function startSuperadminMockServer(): void {
  superadminMockServer.listen({ onUnhandledRequest: 'error' });
}

export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminSystemOpsMigrationsMockState();
}

export function stopSuperadminMockServer(): void {
  superadminMockServer.close();
}
