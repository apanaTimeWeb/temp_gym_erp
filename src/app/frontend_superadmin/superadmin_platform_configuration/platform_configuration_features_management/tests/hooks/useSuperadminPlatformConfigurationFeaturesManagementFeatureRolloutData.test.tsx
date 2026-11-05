import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData';
import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({ featuresApi: { fetchTenants: vi.fn() } }));
describe('useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData', () => {
  beforeEach(() => vi.clearAllMocks());
  it('fetches tenant options only for an open rollout dialog', async () => {
    vi.mocked(featuresApi.fetchTenants).mockResolvedValue({ success: true, message: 'ok', data: [{ id: 'gym-1', name: 'Gym One', plan: 'pro' }] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData(true), { wrapper });
    await waitFor(() => expect(result.current.tenants).toHaveLength(1));
    expect(featuresApi.fetchTenants).toHaveBeenCalledTimes(1);
    expect(result.current.tenants[0]).toMatchObject({ id: 'gym-1', name: 'Gym One' });
  });
  it('exposes a recoverable error instead of silently presenting a failed load as no tenants', async () => {
    vi.mocked(featuresApi.fetchTenants).mockRejectedValue(new Error('network'));
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutData(true), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.tenants).toEqual([]);
    expect(result.current.refetch).toBeTypeOf('function');
  });
});
