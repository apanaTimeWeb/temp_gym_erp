// RESPONSIBILITY: Renders the SuperadminAnalyticsBasic.test UI for the analytics feature. Business/data orchestration is delegated to module-owned hooks.
import { describe, expect, it } from 'vitest';

import { MOCK_MONTHLY_DATA, MOCK_PLAN_REVENUE, MOCK_REVENUE_METRICS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/fixtures/SuperadminAnalyticsDashboardMockFixtures';



describe('Superadmin Analytics fixture behavior', () => {
  it('contains metrics and chart series with distinct categories for the analytics UI', () => {
    expect(MOCK_REVENUE_METRICS).toMatchObject({ currency: 'INR', activeTenants: 125, mrrDeltaPercent: 5.2 });
    expect(MOCK_MONTHLY_DATA.length).toBeGreaterThan(1);
    expect(MOCK_PLAN_REVENUE.length).toBeGreaterThan(1);
    expect(MOCK_MONTHLY_DATA.every((point) => point.month && typeof point.mrr === 'number')).toBe(true);
    expect(MOCK_PLAN_REVENUE.every((plan) => plan.plan && typeof plan.revenue === 'number')).toBe(true);
  });
});
