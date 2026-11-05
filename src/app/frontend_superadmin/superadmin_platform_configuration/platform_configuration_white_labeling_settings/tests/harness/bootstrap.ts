/**
 * Canonical standalone test bootstrap for white_labeling_settings.
 * Promoted from the module's existing mock harness and rebased to local paths.
 * Use the lifecycle functions below from the owning Vitest setup.
 */
/** Standalone MSW and QueryClient bootstrap for white_labeling_settings; call lifecycle functions from the owning test setup. */
import { QueryClient } from '@tanstack/react-query';
import { setupServer } from 'msw/node';
import { superadminWhiteLabelingHandlers as superadminWhiteLabelingHandlers } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/handlers/SuperadminPlatformConfigurationWhiteLabelingSettingsMockHandlers';
import { resetSuperadminPlatformConfigurationWhiteLabelingMockState as resetSuperadminPlatformConfigurationWhiteLabelingMockStateForWhiteLabelingSettings1 } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/handlers/SuperadminPlatformConfigurationWhiteLabelingSettingsMockHandlers';

export const superadminMockServer = setupServer(
  ...superadminWhiteLabelingHandlers,
);

export function createIsolatedQueryClient(): QueryClient {
  return new QueryClient({ defaultOptions: { queries: { retry: false, staleTime: 0, gcTime: 0 }, mutations: { retry: false } } });
}

export function startSuperadminMockServer(): void { superadminMockServer.listen({ onUnhandledRequest: 'error' }); }
export function resetSuperadminMockState(): void {
  superadminMockServer.resetHandlers();
  resetSuperadminPlatformConfigurationWhiteLabelingMockStateForWhiteLabelingSettings1();
}

export function stopSuperadminMockServer(): void { superadminMockServer.close(); }
