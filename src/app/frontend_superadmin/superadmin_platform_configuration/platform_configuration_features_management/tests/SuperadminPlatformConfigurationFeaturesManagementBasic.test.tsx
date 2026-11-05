// RESPONSIBILITY: Renders the SuperadminPlatformConfigurationFeaturesBasic.test UI for the features feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { SUPERADMIN_FEATURE_FLAGS, SUPERADMIN_FEATURE_HISTORY, SUPERADMIN_RELEASE_NOTES, SUPERADMIN_FEATURE_TENANTS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/fixtures/SuperadminPlatformConfigurationFeaturesManagementMockFixtures';
import { resetSuperadminPlatformConfigurationFeaturesMockState } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/mocks/handlers/SuperadminPlatformConfigurationFeaturesManagementMockHandlers';



beforeEach(() => resetSuperadminPlatformConfigurationFeaturesMockState());

describe('Superadmin Features fixture behavior', () => {
  it('contains flags, release notes, tenants, and per-flag history used by the product-management flows', () => {
    expect(SUPERADMIN_FEATURE_FLAGS.length).toBeGreaterThan(1);
    expect(SUPERADMIN_RELEASE_NOTES.length).toBeGreaterThan(0);
    expect(SUPERADMIN_FEATURE_TENANTS.length).toBeGreaterThan(1);
    expect(SUPERADMIN_FEATURE_FLAGS.every((flag) => flag.id && flag.name && typeof flag.isGlobalEnabled === 'boolean')).toBe(true);
    expect(SUPERADMIN_FEATURE_HISTORY).toHaveProperty(SUPERADMIN_FEATURE_FLAGS[0].id);
    expect(SUPERADMIN_FEATURE_HISTORY[SUPERADMIN_FEATURE_FLAGS[0].id].length).toBeGreaterThan(0);
  });
});
