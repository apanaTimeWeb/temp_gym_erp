import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { settingsApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.api';
import { useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/hooks/useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/api/superadmin_platform_configuration_settings_general.api', () => ({ settingsApi: { updateSetting: vi.fn() } }));

beforeEach(() => vi.clearAllMocks());

describe('useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation', () => {
  it('persists a setting through the feature API and exposes completion state', async () => {
    vi.mocked(settingsApi.updateSetting).mockResolvedValue({ success: true, message: 'Saved', data: { id: 'timezone', value: 'Asia/Kolkata' } } as never);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation(), { wrapper });
    await act(async () => { await result.current.updateSetting({ id: 'timezone', value: 'Asia/Kolkata' }); });
    expect(settingsApi.updateSetting).toHaveBeenCalledWith('timezone', { value: 'Asia/Kolkata' }, expect.any(String));
    expect(result.current.isUpdating).toBe(false);
  });

  it('uses distinct keys for different rows and changed values while retaining a failed intent key for retry', async () => {
    const failure = new Error('network');
    vi.mocked(settingsApi.updateSetting)
      .mockRejectedValueOnce(failure)
      .mockResolvedValue({ success: true, message: 'Saved', data: { id: 'timezone', value: 'UTC' } } as never);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useSuperadminPlatformConfigurationSettingsGeneralUpdateMutation(), { wrapper });
    let firstKey = '';
    await act(async () => { try { await result.current.updateSetting({ id: 'timezone', value: 'Asia/Kolkata' }); } catch { /* expected retryable failure */ } });
    firstKey = vi.mocked(settingsApi.updateSetting).mock.calls[0][2];
    await act(async () => { await result.current.updateSetting({ id: 'timezone', value: 'Asia/Kolkata' }); });
    const retryKey = vi.mocked(settingsApi.updateSetting).mock.calls[1][2];
    await act(async () => { await result.current.updateSetting({ id: 'timezone', value: 'UTC' }); });
    const changedKey = vi.mocked(settingsApi.updateSetting).mock.calls[2][2];
    await act(async () => { await result.current.updateSetting({ id: 'currency', value: 'INR' }); });
    const otherRowKey = vi.mocked(settingsApi.updateSetting).mock.calls[3][2];
    expect(retryKey).toBe(firstKey);
    expect(changedKey).not.toBe(firstKey);
    expect(otherRowKey).not.toBe(changedKey);
  });

});
