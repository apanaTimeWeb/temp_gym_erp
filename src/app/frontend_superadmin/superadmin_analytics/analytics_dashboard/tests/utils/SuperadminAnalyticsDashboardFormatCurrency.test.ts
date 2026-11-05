import { describe, expect, it } from 'vitest';

import { SuperadminAnalyticsFormatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardFormatCurrency';



describe('SuperadminAnalyticsFormatCurrency', () => {
  it('formats backend minor units using the supplied ISO currency', () => {
    expect(SuperadminAnalyticsFormatCurrency(799900, 'INR', 'en-IN')).toContain('7,999');
  });

  it('handles zero-decimal and three-decimal currencies', () => {
    expect(SuperadminAnalyticsFormatCurrency(1234, 'JPY', 'en-IN')).toContain('1,234');
    expect(SuperadminAnalyticsFormatCurrency(1234, 'KWD', 'en-IN')).toContain('1.234');
  });
});
