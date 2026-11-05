/** Standalone MSW and QueryClient bootstrap for broadcasts_campaigns; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminBroadcastsHandlers as superadminBroadcastsHandlers } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers';
import { resetSuperadminCommunicationBroadcastsMockState as resetSuperadminCommunicationBroadcastsMockStateForBroadcastsCampaigns1 } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminBroadcastsHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminCommunicationBroadcastsMockStateForBroadcastsCampaigns1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
