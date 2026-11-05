import { describe, expect, it } from 'vitest';
import { MOCK_WHITE_LABEL_DOMAINS_TIER_1_SMALL, MOCK_WHITE_LABEL_DOMAINS_TIER_2_MEDIUM, MOCK_WHITE_LABEL_DOMAINS_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings/mocks/fixtures/SuperadminPlatformConfigurationWhiteLabelingSettingsMockFixtures';

describe('deterministic fixture scale tiers', () => {
  it('provides 10, 100, and 500-record tiers', () => {
    const tiers = [
      [MOCK_WHITE_LABEL_DOMAINS_TIER_1_SMALL, 10],
      [MOCK_WHITE_LABEL_DOMAINS_TIER_2_MEDIUM, 100],
      [MOCK_WHITE_LABEL_DOMAINS_TIER_3_STRESS, 500],
    ] as const;
    for (const [tier, expected] of tiers) {
      expect(tier).toHaveLength(expected);
    }
  });
});
