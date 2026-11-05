/** Standalone MSW and QueryClient bootstrap for features_management; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminFeaturesHandlers as superadminFeaturesHandlers } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/handlers/SuperadminPlatformConfigurationFeaturesManagementMockHandlers';
import { resetSuperadminPlatformConfigurationFeaturesMockState as resetSuperadminPlatformConfigurationFeaturesMockStateForFeaturesManagement1 } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/handlers/SuperadminPlatformConfigurationFeaturesManagementMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminFeaturesHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminPlatformConfigurationFeaturesMockStateForFeaturesManagement1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
