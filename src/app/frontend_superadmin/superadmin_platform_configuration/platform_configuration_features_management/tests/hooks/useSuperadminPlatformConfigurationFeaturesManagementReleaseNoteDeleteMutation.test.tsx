import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.query_keys';
import { useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteDeleteMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteDeleteMutation';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({
  featuresApi: { deleteReleaseNote: vi.fn() },
}));

describe('useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteDeleteMutation', () => {
  it('deletes by the supplied release-note id and invalidates feature queries', async () => {
    vi.mocked(featuresApi.deleteReleaseNote).mockResolvedValue({ success: true, message: 'Deleted', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteDeleteMutation(), { wrapper });

    await result.current.mutateAsync({ id: 'release-1', idempotencyKey: 'delete-intent-1' });

    expect(featuresApi.deleteReleaseNote).toHaveBeenCalledWith('release-1', 'delete-intent-1');
    expect(invalidate).toHaveBeenCalledWith({ queryKey: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS.all });
    client.clear();
  });

  it('preserves cached feature data when deletion fails', async () => {
    vi.mocked(featuresApi.deleteReleaseNote).mockResolvedValue({ success: false, message: 'Rejected' } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidate = vi.spyOn(client, 'invalidateQueries');
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteDeleteMutation(), { wrapper });

    await expect(result.current.mutateAsync({ id: 'release-1', idempotencyKey: 'delete-intent-1' })).rejects.toThrow('Rejected');
    expect(invalidate).not.toHaveBeenCalled();
    client.clear();
  });
});
