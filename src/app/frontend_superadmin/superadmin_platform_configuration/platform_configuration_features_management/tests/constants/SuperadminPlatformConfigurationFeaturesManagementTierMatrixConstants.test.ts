// RESPONSIBILITY: Verifies the exact canonical configuration rendered by the Features tier matrix.
import { describe, expect, it } from 'vitest';

import {
  SUPERADMIN_FEATURE_DEFINITIONS,
  SUPERADMIN_FEATURE_IDS,
  SUPERADMIN_FEATURE_TIER_DEFINITIONS,
  SUPERADMIN_FEATURE_TIER_IDS,
  SUPERADMIN_FEATURE_TIER_MATRIX,
} from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/constants/superadmin_platform_configuration_features_management_tier_matrix.constants';

describe('SuperadminPlatformConfigurationFeaturesTierMatrixConstants', () => {
  it('keeps tier definitions aligned with canonical tier IDs in the same order', () => {
    expect(SUPERADMIN_FEATURE_TIER_DEFINITIONS.map((tier) => tier.id)).toEqual(SUPERADMIN_FEATURE_TIER_IDS);
    expect(SUPERADMIN_FEATURE_TIER_IDS).toEqual(['basic', 'pro', 'enterprise']);
    expect(SUPERADMIN_FEATURE_TIER_DEFINITIONS.map((tier) => tier.labelKey)).toEqual(['ui.tier_basic', 'ui.tier_pro', 'ui.tier_enterprise']);
  });

  it('keeps rendered feature definitions aligned with canonical feature IDs', () => {
    expect(SUPERADMIN_FEATURE_DEFINITIONS.map((feature) => feature.id)).toEqual(SUPERADMIN_FEATURE_IDS);
    expect(new Set(SUPERADMIN_FEATURE_IDS).size).toBe(SUPERADMIN_FEATURE_IDS.length);
    expect(SUPERADMIN_FEATURE_IDS).toHaveLength(6);
    expect(SUPERADMIN_FEATURE_DEFINITIONS.map((feature) => feature.labelKey)).toEqual([
      'ui.feature_hr_management', 'ui.feature_payroll', 'ui.feature_custom_domain',
      'ui.feature_whitelabel', 'ui.feature_advanced_analytics', 'ui.feature_franchise_management',
    ]);
  });

  it('defines a boolean availability value for every feature and tier', () => {
    for (const featureId of SUPERADMIN_FEATURE_IDS) {
      expect(Object.keys(SUPERADMIN_FEATURE_TIER_MATRIX[featureId]).sort()).toEqual([...SUPERADMIN_FEATURE_TIER_IDS].sort());
      for (const tierId of SUPERADMIN_FEATURE_TIER_IDS) {
        expect(typeof SUPERADMIN_FEATURE_TIER_MATRIX[featureId][tierId]).toBe('boolean');
      }
    }
  });
});
