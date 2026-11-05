import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory';
import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({ featuresApi: { fetchFeatureFlagHistory: vi.fn() } }));

describe('useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory', () => {
  beforeEach(() => vi.clearAllMocks());
  it('fetches history for the supplied flag id and exposes success state', async () => {
    vi.mocked(featuresApi.fetchFeatureFlagHistory).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory('flag-1'), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(featuresApi.fetchFeatureFlagHistory).toHaveBeenCalledWith('flag-1');
    expect(result.current.data?.data).toEqual([]);
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(featuresApi.fetchFeatureFlagHistory).mockResolvedValue({ success: false, message: 'history unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-history' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureHistory('flag-1'), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
