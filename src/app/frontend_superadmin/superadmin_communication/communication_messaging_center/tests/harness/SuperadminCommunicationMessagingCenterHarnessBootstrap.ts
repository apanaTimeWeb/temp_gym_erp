/** Standalone MSW and QueryClient bootstrap for messaging_center; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminMessagingHandlers as superadminMessagingHandlers } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers';
import { resetSuperadminCommunicationMessagingMockState as resetSuperadminCommunicationMessagingMockStateForMessagingCenter1 } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/handlers/SuperadminCommunicationMessagingCenterMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminMessagingHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminCommunicationMessagingMockStateForMessagingCenter1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
