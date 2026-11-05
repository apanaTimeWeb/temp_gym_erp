import { describe, expect, it } from 'vitest';
import { SUPERADMIN_SETTINGS_GOVERNANCE_TIER_1_SMALL, SUPERADMIN_SETTINGS_GOVERNANCE_TIER_2_MEDIUM, SUPERADMIN_SETTINGS_GOVERNANCE_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general/mocks/fixtures/SuperadminPlatformConfigurationSettingsGeneralV1MockFixtures';

describe('deterministic fixture scale tiers', () => {
  it('provides 10, 100, and 500-record tiers', () => {
    const tiers = [
      [SUPERADMIN_SETTINGS_GOVERNANCE_TIER_1_SMALL, 10],
      [SUPERADMIN_SETTINGS_GOVERNANCE_TIER_2_MEDIUM, 100],
      [SUPERADMIN_SETTINGS_GOVERNANCE_TIER_3_STRESS, 500],
    ] as const;
    for (const [tier, expected] of tiers) {
      expect(tier.billing).toHaveLength(expected);
      expect(tier.security).toHaveLength(expected);
      expect(tier.data).toHaveLength(expected);
      expect(tier.communication).toHaveLength(expected);
    }
  });
});
