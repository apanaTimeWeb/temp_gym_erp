import { afterEach, describe, expect, it } from 'vitest';
import { formatSuperadminAnalyticsReportsCancellationDate } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/utils/SuperadminAnalyticsReportsCenterFormatDate';

const originalTimezone = process.env.TZ;
afterEach(() => { process.env.TZ = originalTimezone; });

describe('Reports Center cancellation date formatting', () => {
  it('preserves date-only calendar values in a negative UTC offset', () => {
    process.env.TZ = 'America/Los_Angeles';
    expect(formatSuperadminAnalyticsReportsCancellationDate('2026-09-15', 'en')).toBe('Sep 15, 2026');
  });
  it('preserves Hindi locale formatting and handles empty/invalid values', () => {
    expect(formatSuperadminAnalyticsReportsCancellationDate('2026-09-15', 'hi')).toContain('2026');
    expect(formatSuperadminAnalyticsReportsCancellationDate(null, 'en')).toBe('—');
    expect(formatSuperadminAnalyticsReportsCancellationDate('not-a-date', 'en')).toBe('—');
  });
});
