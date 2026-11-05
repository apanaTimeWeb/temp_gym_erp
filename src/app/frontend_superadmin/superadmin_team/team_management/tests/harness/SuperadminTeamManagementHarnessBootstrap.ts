/** Standalone MSW and QueryClient bootstrap for team_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminTeamHandlers as superadminTeamHandlers } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/handlers/SuperadminTeamManagementMockHandlers';
import { resetSuperadminTeamMockState as resetSuperadminTeamMockStateForTeamManagement1 } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/handlers/SuperadminTeamManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminTeamHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminTeamMockStateForTeamManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
