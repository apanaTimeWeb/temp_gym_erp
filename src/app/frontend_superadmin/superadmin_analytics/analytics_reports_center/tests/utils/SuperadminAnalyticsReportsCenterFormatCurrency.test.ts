import { describe, expect, it } from 'vitest';

import { formatCurrency } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatCurrency';



describe('SuperadminAnalyticsReportsFormatCurrency', () => {
  it('formats the canonical minor-unit amount', () => {
    expect(formatCurrency(2500, 'INR', 'en-IN')).toContain('25.00');
  });
});
