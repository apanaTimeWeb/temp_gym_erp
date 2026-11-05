import { describe, expect, it } from 'vitest';

import { getSuperadminAnalyticsReportsPresetRange, isValidSuperadminAnalyticsReportsDateParam } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterDateRangeUtils';

describe('getSuperadminAnalyticsReportsPresetRange', () => {
  it('uses month-to-date and rolling three/six month ranges', () => {
    const now = new Date(2026, 9, 15);
    expect(getSuperadminAnalyticsReportsPresetRange('THIS_MONTH', now)).toEqual({ from: '2026-10-01', to: '2026-10-15' });
    expect(getSuperadminAnalyticsReportsPresetRange('LAST_3_MONTHS', now)).toEqual({ from: '2026-07-15', to: '2026-10-15' });
    expect(getSuperadminAnalyticsReportsPresetRange('LAST_6_MONTHS', now)).toEqual({ from: '2026-04-15', to: '2026-10-15' });
  });
  it('clamps rolling month subtraction and keeps last-month calendar bounds', () => {
    expect(getSuperadminAnalyticsReportsPresetRange('LAST_3_MONTHS', new Date(2026, 4, 31))).toEqual({ from: '2026-02-28', to: '2026-05-31' });
    expect(getSuperadminAnalyticsReportsPresetRange('LAST_MONTH', new Date(2026, 0, 15))).toEqual({ from: '2025-12-01', to: '2025-12-31' });
  });
  it('does not invent bounds for custom or unknown presets', () => {
    expect(getSuperadminAnalyticsReportsPresetRange('CUSTOM', new Date(2026, 9, 15))).toEqual({ from: '', to: '' });
    expect(getSuperadminAnalyticsReportsPresetRange('UNKNOWN', new Date(2026, 9, 15))).toEqual({ from: '', to: '' });
  });
});


describe('isValidSuperadminAnalyticsReportsDateParam', () => {
  it('accepts valid date-only values independently of local timezone offsets', () => {
    expect(isValidSuperadminAnalyticsReportsDateParam('2026-10-30')).toBe(true);
    expect(isValidSuperadminAnalyticsReportsDateParam('2024-02-29')).toBe(true);
  });

  it('rejects malformed and impossible calendar dates', () => {
    expect(isValidSuperadminAnalyticsReportsDateParam('2026-02-29')).toBe(false);
    expect(isValidSuperadminAnalyticsReportsDateParam('2026-13-01')).toBe(false);
    expect(isValidSuperadminAnalyticsReportsDateParam('2026-1-01')).toBe(false);
  });
});
