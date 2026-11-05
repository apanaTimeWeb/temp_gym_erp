import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminPlatformConfigurationWhiteLabelingApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.api';
import { useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/hooks/useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/api/superadmin_platform_configuration_white_labeling_settings.api', () => ({ SuperadminPlatformConfigurationWhiteLabelingApi: { getDomains: vi.fn(), updateDomainStatus: vi.fn() } }));

describe('useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains', () => {
  it('delivers the domain response through the feature Query key boundary', async () => {
    vi.mocked(SuperadminPlatformConfigurationWhiteLabelingApi.getDomains).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'domain-1', domain: 'example.com' }], meta: { total: 1, page: 1, limit: 20, totalPages: 1 } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains({ search: '', status: 'all' }), { wrapper });
    await waitFor(() => expect(result.current.data?.data).toEqual([{ id: 'domain-1', domain: 'example.com' }]));
    expect(SuperadminPlatformConfigurationWhiteLabelingApi.getDomains).toHaveBeenCalledWith({ search: '', status: 'all' });
    expect(result.current.data?.meta).toEqual({ total: 1, page: 1, limit: 20, totalPages: 1 });
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(SuperadminPlatformConfigurationWhiteLabelingApi.getDomains).mockResolvedValue({ success: false, message: 'domains unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-domains' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationWhiteLabelingSettingsDomains({ search: '', status: 'all' }), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
