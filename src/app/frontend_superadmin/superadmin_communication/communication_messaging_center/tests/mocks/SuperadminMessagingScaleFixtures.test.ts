import { describe, expect, it } from 'vitest';
import { MOCK_SUPERADMIN_MESSAGING_TIER_1_SMALL, MOCK_SUPERADMIN_MESSAGING_TIER_2_MEDIUM, MOCK_SUPERADMIN_MESSAGING_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/mocks/fixtures/SuperadminCommunicationMessagingCenterMockFixtures';

describe('deterministic fixture scale tiers', () => {
  it('provides 10, 100, and 500-record tiers', () => {
    const tiers = [
      [MOCK_SUPERADMIN_MESSAGING_TIER_1_SMALL, 10],
      [MOCK_SUPERADMIN_MESSAGING_TIER_2_MEDIUM, 100],
      [MOCK_SUPERADMIN_MESSAGING_TIER_3_STRESS, 500],
    ] as const;
    for (const [tier, expected] of tiers) {
      expect(tier.messages).toHaveLength(expected);
      expect(tier.tenants).toHaveLength(expected);
    }
  });
});
