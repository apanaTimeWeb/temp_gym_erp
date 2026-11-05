import { describe, expect, it } from 'vitest';

import { formatDate, formatDateTime, formatDecimal, formatDuration, formatKPI, formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/utils/SuperadminAccountProfileOverviewFormatters';



describe('Profile formatters', () => {
  it('formats nullish values with the documented display fallback', () => {
    expect(formatNumber(null)).toBe('—');
    expect(formatDate(undefined)).toBe('—');
    expect(formatDuration(null)).toBe('—');
  });

  it('formats numbers and percentages through the feature-local Intl rules', () => {
    expect(formatNumber(1234567)).toBe('12,34,567');
    expect(formatPercent1dp(12.34)).toBe('12.3%');
    expect(formatDecimal(12.3456)).toBe('12.35');
  });

  it('formats dates and durations deterministically from typed values', () => {
    const value = new Date(2026, 0, 2, 13, 45, 0);
    expect(formatDate(value)).toBe('02 Jan 2026');
    expect(formatDateTime(value)).toBe('02 Jan 2026, 13:45');
    expect(formatDuration(3661)).toBe('1h 1m');
  });

  it('accepts numeric epoch-millisecond timestamps as declared by the formatter contract', () => {
    const timestamp = new Date(2026, 0, 2, 12, 0, 0).getTime();
    expect(formatDate(timestamp)).toBe('02 Jan 2026');
    expect(formatDateTime(timestamp)).toBe('02 Jan 2026, 12:00');
  });

  it('formats KPI values compactly without losing the feature contract', () => {
    expect(formatKPI(1500)).toBe('1.5K');
  });
});


describe('profile date locale formatting', () => {
  it('formats date values with the active Hindi locale', () => {
    const previousLanguage = document.documentElement.lang;
    document.documentElement.lang = 'hi-IN';
    try {
      expect(formatDate('2026-10-14T12:00:00.000Z')).toContain('2026');
      expect(formatDate('2026-10-14T12:00:00.000Z')).not.toBe('14 Oct 2026');
    } finally { document.documentElement.lang = previousLanguage; }
  });
});
