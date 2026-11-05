import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api';
import { useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteCreateMutation } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteCreateMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/api/superadmin_platform_configuration_features_management.api', () => ({ featuresApi: { createReleaseNote: vi.fn() } }));

describe('useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteCreateMutation', () => {
  it('creates a release note through the feature API', async () => {
    vi.mocked(featuresApi.createReleaseNote).mockResolvedValue({ success: true, message: 'Created', data: { id: 'note-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementReleaseNoteCreateMutation(), { wrapper });
    await result.current.mutateAsync({ data: { title: 'Release', version: 'v1', content: 'Content' }, idempotencyKey: 'key-1' } as never);
    expect(featuresApi.createReleaseNote).toHaveBeenCalledWith(expect.objectContaining({ title: 'Release' }), 'key-1');
  });
});
