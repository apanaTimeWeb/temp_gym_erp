import { describe, expect, it } from 'vitest';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_TIER_1_SMALL, SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_TIER_2_MEDIUM, SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/fixtures/SuperadminPlatformConfigurationIntegrationsManagementMockFixtures';

describe('deterministic fixture scale tiers', () => {
  it('provides 10, 100, and 500-record tiers', () => {
    const tiers = [
      [SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_TIER_1_SMALL, 10],
      [SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_TIER_2_MEDIUM, 100],
      [SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_TIER_3_STRESS, 500],
    ] as const;
    for (const [tier, expected] of tiers) {
      expect(tier.integrations).toHaveLength(expected);
      expect(tier.webhooks).toHaveLength(expected);
      expect(tier.keys).toHaveLength(expected);
      expect(tier.tenants).toHaveLength(expected);
    }
  });
});
