// RESPONSIBILITY: Verifies plan-revenue number, percentage, and compact KPI display formatters.
// DATA FLOW: typed metric values and UI locale → plan revenue formatters → formatted display strings.

import { describe, expect, it } from 'vitest';
import { formatKPI, formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatters';

describe('Plan revenue formatters', () => {
  it('uses the supplied locale for number and percentage output', () => {
    expect(formatNumber(1234, 'en-US')).toBe('1,234');
    expect(formatPercent1dp(82.36, 'en-US')).toBe('82.4');
  });

  it('uses compact notation for dashboard KPIs', () => {
    expect(formatKPI(1200, 'en-US')).toBe('1.2K');
  });
});
