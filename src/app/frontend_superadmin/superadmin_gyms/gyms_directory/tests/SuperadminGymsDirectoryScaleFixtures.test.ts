import { describe, expect, it } from 'vitest';
import { MOCK_GYMS_TIER_1_SMALL, MOCK_GYMS_TIER_2_MEDIUM, MOCK_GYMS_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/mocks/SuperadminGymsDirectoryMockFixtures';

describe('deterministic fixture scale tiers', () => {
  it('provides 10, 100, and 500-record tiers', () => {
    const tiers = [
      [MOCK_GYMS_TIER_1_SMALL, 10],
      [MOCK_GYMS_TIER_2_MEDIUM, 100],
      [MOCK_GYMS_TIER_3_STRESS, 500],
    ] as const;
    for (const [tier, expected] of tiers) {
      expect(tier).toHaveLength(expected);
    }
  });
});
