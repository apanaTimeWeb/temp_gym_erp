import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags';
import type { FeatureFlag } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management.types';

const flags: FeatureFlag[] = [
  { id: 'f1', name: 'Payments', description: 'Card and UPI payments', isGlobalEnabled: true, enabledTenantIds: [] },
  { id: 'f2', name: 'Analytics', description: 'Business reporting', isGlobalEnabled: false, enabledTenantIds: ['gym-2'] },
];

describe('useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags', () => {
  it('filters by name and description while preserving matching resource identity', () => {
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags(flags, 'pay'));
    expect(result.current).toHaveLength(1);
    expect(result.current[0]).toMatchObject({ id: 'f1' });
  });
  it('returns all flags when search is blank', () => {
    const { result } = renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementFilteredFlags(flags, ''));
    expect(result.current).toHaveLength(2);
  });
});
