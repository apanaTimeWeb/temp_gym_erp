import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({ featuresApi: { toggleFeatureFlag: vi.fn() } }));

describe('useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation', () => {
  it('toggles the requested feature flag with the supplied idempotency key', async () => {
    vi.mocked(featuresApi.toggleFeatureFlag).mockResolvedValue({ success: true, message: 'Updated', data: { id: 'flag-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureFlagStatusMutation(), { wrapper });
    await result.current.mutateAsync({ id: 'flag-1', idempotencyKey: 'key-1' } as never);
    expect(featuresApi.toggleFeatureFlag).toHaveBeenCalledWith('flag-1', 'key-1');
  });
});
