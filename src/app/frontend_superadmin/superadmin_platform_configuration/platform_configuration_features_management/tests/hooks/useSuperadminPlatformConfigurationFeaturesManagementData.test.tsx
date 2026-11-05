import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { useSuperadminPlatformConfigurationFeaturesManagementData } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementData';
import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({
  featuresApi: {
    fetchFeatures: vi.fn(), fetchTenants: vi.fn(), fetchFeatureFlagHistory: vi.fn(),
    createFeatureFlag: vi.fn(), updateFeatureFlag: vi.fn(), toggleFeatureFlag: vi.fn(),
    deleteFeatureFlag: vi.fn(), createReleaseNote: vi.fn(), updateReleaseNote: vi.fn(), deleteReleaseNote: vi.fn(),
  },
}));
describe('useSuperadminPlatformConfigurationFeaturesManagementData', () => {
  beforeEach(() => vi.clearAllMocks());
  it('loads the feature payload through the API facade and exposes real module mutation contracts', async () => {
    vi.mocked(featuresApi.fetchFeatures).mockResolvedValue({ success: true, message: 'ok', data: { flags: [], notes: [] } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementData(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data).toEqual({ flags: [], notes: [] });
    expect(featuresApi.fetchFeatures).toHaveBeenCalledTimes(1);
    expect(result.current.updateFeatureFlagStatus).toBeTypeOf('function');
    expect(result.current.updateFlag).toBeTypeOf('function');
  });
  it('surfaces API failures so the view can show retry instead of a false empty state', async () => {
    vi.mocked(featuresApi.fetchFeatures).mockRejectedValue(new Error('offline'));
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementData(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
    expect(result.current.refetch).toBeTypeOf('function');
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(featuresApi.fetchFeatures).mockResolvedValue({ success: false, message: 'features unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-features' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementData(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
