/** Standalone MSW and QueryClient bootstrap for integrations_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminIntegrationsHandlers as superadminIntegrationsHandlers } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/handlers/SuperadminPlatformConfigurationIntegrationsManagementMockHandlers';
import { resetSuperadminPlatformConfigurationIntegrationsMockState as resetSuperadminPlatformConfigurationIntegrationsMockStateForIntegrationsManagement1 } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/handlers/SuperadminPlatformConfigurationIntegrationsManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminIntegrationsHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminPlatformConfigurationIntegrationsMockStateForIntegrationsManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
