import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation';

import type { ReactNode } from 'react';



describe('useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation', () => {
  it('calls the supplied rollout handler with the selected tenants and idempotency key', async () => {
    const onSaveRollout = vi.fn().mockResolvedValue({ success: true, message: 'Saved', data: { ok: true } });
    const keyRef = { current: null as string | null };
    const onSuccess = vi.fn();
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation(onSaveRollout as never, ['tenant-1'], keyRef, onSuccess), { wrapper });
    await act(async () => { await result.current.mutateAsync(); });
    expect(onSaveRollout).toHaveBeenCalledWith(['tenant-1'], expect.any(String));
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(keyRef.current).toBeNull();
  });


  it('keeps a failed rollout visible to the modal and reuses the idempotency key on retry', async () => {
    const onSaveRollout = vi.fn()
      .mockRejectedValueOnce(new Error('Temporary failure'))
      .mockResolvedValueOnce({ success: true, message: 'Saved', data: { ok: true } });
    const keyRef = { current: null as string | null };
    const onSuccess = vi.fn();
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFeatureRolloutMutation(onSaveRollout as never, ['tenant-1'], keyRef, onSuccess), { wrapper });

    await act(async () => { await expect(result.current.mutateAsync()).rejects.toThrow('Temporary failure'); });
    await waitFor(() => expect(result.current.isError).toBe(true));
    const failedAttemptKey = onSaveRollout.mock.calls[0]?.[1];

    await act(async () => { await act(async () => { await result.current.mutateAsync(); }); });
    expect(onSaveRollout.mock.calls[1]?.[1]).toBe(failedAttemptKey);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
