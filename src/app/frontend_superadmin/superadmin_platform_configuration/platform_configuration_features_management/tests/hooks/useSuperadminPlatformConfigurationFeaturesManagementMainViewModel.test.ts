import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformConfigurationFeaturesManagementMainViewModel } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementMainViewModel';



vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(false) }) }));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard', () => ({ useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementData', () => ({
  useSuperadminPlatformConfigurationFeaturesManagementData: () => ({ data: { flags: [] }, isPending: false, isError: false, updateFeatureFlagStatus: vi.fn(), updateFlag: vi.fn() }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags', () => ({ useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags: (flags: unknown[]) => flags }));

describe('useSuperadminPlatformConfigurationFeaturesManagementMainViewModel', () => {
  it('starts on the flags tab with an empty search and a feature-owned empty result set', () => {
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementMainViewModel());
    expect(result.current.activeTab).toBe('FLAGS');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.filteredFlags).toEqual([]);
  });
});
