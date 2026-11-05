import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.api';
import { useSuperadminPlatformConfigurationSettingsGeneralPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralPage';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.api', () => ({ settingsApi: { fetchSettings: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation', () => ({
  useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation: () => ({ updateSetting: vi.fn(), isUpdating: false, updateError: null, variables: undefined }),
}));

describe('useSuperadminPlatformConfigurationSettingsGeneralPage', () => {
  it('loads settings through TanStack Query and exposes the dedicated update contract', async () => {
    vi.mocked(settingsApi.fetchSettings).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'theme', key: 'theme', value: 'dark', description: 'Theme mode', category: 'system', dataType: 'string' }, { id: 'stripe-secret', key: 'STRIPE_WEBHOOK_SECRET', value: 'whsec_sensitive-server-value', description: 'Webhook secret', category: 'integrations', dataType: 'string' }] });
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminPlatformConfigurationSettingsGeneralPage(), { wrapper });
    await waitFor(() => expect(result.current.query.isPending).toBe(false));
    expect(settingsApi.fetchSettings).toHaveBeenCalledTimes(1);
    expect(result.current.query.data?.data).toEqual([{ id: 'theme', key: 'theme', value: 'dark', description: 'Theme mode', category: 'system', dataType: 'string' }, { id: 'stripe-secret', key: 'STRIPE_WEBHOOK_SECRET', value: '', description: 'Webhook secret', category: 'integrations', dataType: 'string' }]);
    expect(JSON.stringify(result.current.query.data)).not.toContain('whsec_sensitive-server-value');
    expect(result.current.updateSetting).toEqual(expect.any(Function));
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(settingsApi.fetchSettings).mockResolvedValue({ success: false, message: 'settings unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-settings' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminPlatformConfigurationSettingsGeneralPage(), { wrapper });
    await waitFor(() => expect(result.current.query.isError).toBe(true));
    expect(result.current.query.data).toBeUndefined();
  });
});
