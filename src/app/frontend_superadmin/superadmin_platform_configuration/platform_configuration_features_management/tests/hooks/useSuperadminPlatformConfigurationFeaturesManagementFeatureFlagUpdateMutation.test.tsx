import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({
  featuresApi: { updateFeatureFlag: vi.fn() },
}));

describe('useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation', () => {
  it('updates the requested flag, reuses the supplied intent key, and invalidates feature queries', async () => {
    vi.mocked(featuresApi.updateFeatureFlag).mockResolvedValue({ success: true, message: 'Updated', data: { id: 'flag-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation(), { wrapper });

    await result.current.mutateAsync({ id: 'flag-1', body: { isGlobalEnabled: true }, idempotencyKey: 'key-1' } as never);

    expect(featuresApi.updateFeatureFlag).toHaveBeenCalledWith('flag-1', { isGlobalEnabled: true }, 'key-1');
    expect(invalidate).toHaveBeenCalledWith({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all });
    client.clear();
  });

  it('does not invalidate feature data when the API reports failure', async () => {
    vi.mocked(featuresApi.updateFeatureFlag).mockResolvedValue({ success: false, message: 'Rejected' } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagUpdateMutation(), { wrapper });

    await expect(result.current.mutateAsync({ id: 'flag-1', body: { isGlobalEnabled: true }, idempotencyKey: 'key-1' } as never)).rejects.toThrow('Rejected');
    expect(invalidate).not.toHaveBeenCalled();
    client.clear();
  });
});
