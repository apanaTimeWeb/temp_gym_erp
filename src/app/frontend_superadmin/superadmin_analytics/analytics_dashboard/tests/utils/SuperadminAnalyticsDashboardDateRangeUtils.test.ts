import { describe, expect, it } from 'vitest';

import { SUPERADMIN_ANALYTICS_DATE_RANGES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_range.constants';
import { getSuperadminAnalyticsPresetRange, hasValidAnalyticsCustomRange, isSuperadminAnalyticsDateRange, isValidAnalyticsDateOnly } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardDateRangeUtils';

describe('Superadmin Analytics date range utilities', () => {
  const now = new Date(2026, 8, 20);

  it('computes deterministic this-month, last-month and this-year calendar boundaries', () => {
    expect(getSuperadminAnalyticsPresetRange('this_month', now)).toEqual({ from: '2026-09-01', to: '2026-09-20' });
    expect(getSuperadminAnalyticsPresetRange('last_month', now)).toEqual({ from: '2026-08-01', to: '2026-08-31' });
    expect(getSuperadminAnalyticsPresetRange('this_year', now)).toEqual({ from: '2026-01-01', to: '2026-12-31' });
  });

  it('uses rolling three/six month ranges ending today', () => {
    expect(getSuperadminAnalyticsPresetRange('last_3_months', now)).toEqual({ from: '2026-06-20', to: '2026-09-20' });
    expect(getSuperadminAnalyticsPresetRange('last_6_months', now)).toEqual({ from: '2026-03-20', to: '2026-09-20' });
    expect(getSuperadminAnalyticsPresetRange('last_3_months', new Date(2026, 4, 31))).toEqual({ from: '2026-02-28', to: '2026-05-31' });
  });

  it('returns ordered date bounds for every predefined calendar preset', () => {
    for (const preset of ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year']) {
      const range = getSuperadminAnalyticsPresetRange(preset, now);
      expect(isValidAnalyticsDateOnly(range.from)).toBe(true);
      expect(isValidAnalyticsDateOnly(range.to)).toBe(true);
      expect(range.from <= range.to).toBe(true);
    }
    expect(getSuperadminAnalyticsPresetRange('monthly', now)).toEqual({ from: '', to: '' });
    expect(getSuperadminAnalyticsPresetRange('yearly', now)).toEqual({ from: '', to: '' });
    expect(getSuperadminAnalyticsPresetRange('unrecognized', now)).toEqual({ from: '', to: '' });
  });

  it('accepts only known URL ranges and strict ordered calendar-date pairs', () => {
    expect(isSuperadminAnalyticsDateRange('last_3_months')).toBe(true);
    expect(isSuperadminAnalyticsDateRange('malicious-range')).toBe(false);
    expect(SUPERADMIN_ANALYTICS_DATE_RANGES).not.toContain('daily');
    expect(isValidAnalyticsDateOnly('2026-02-28')).toBe(true);
    expect(isValidAnalyticsDateOnly('2026-02-31')).toBe(false);
    expect(hasValidAnalyticsCustomRange('2026-10-01', '2026-10-15')).toBe(true);
    expect(hasValidAnalyticsCustomRange('2026-10-15', '2026-10-01')).toBe(false);
    expect(hasValidAnalyticsCustomRange('2026-10-01', '')).toBe(false);
  });
});
