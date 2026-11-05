import { describe, expect, it } from 'vitest';
import { MOCK_ANALYTICS_REPORTS_TIER_1_SMALL, MOCK_ANALYTICS_REPORTS_TIER_2_MEDIUM, MOCK_ANALYTICS_REPORTS_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/mocks/fixtures/SuperadminAnalyticsReportsCenterMockFixtures';

describe('deterministic fixture scale tiers', () => {
  it('provides 10, 100, and 500-record tiers', () => {
    const tiers = [
      [MOCK_ANALYTICS_REPORTS_TIER_1_SMALL, 10],
      [MOCK_ANALYTICS_REPORTS_TIER_2_MEDIUM, 100],
      [MOCK_ANALYTICS_REPORTS_TIER_3_STRESS, 500],
    ] as const;
    for (const [tier, expected] of tiers) {
      expect(tier.revenue).toHaveLength(expected);
      expect(tier.cancellations).toHaveLength(expected);
      expect(tier.health).toHaveLength(expected);
    }
  });
});
