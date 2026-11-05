import { describe, expect, it } from 'vitest';

import { formatDate, formatDateTime, formatDecimal, formatDuration, formatKPI, formatNumber, formatPercent1dp } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/utils/SuperadminSystemOpsBackupsFormatters';



describe('SystemOpsBackups formatters', () => {
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

  it('formats KPI values compactly without losing the feature contract', () => {
    expect(formatKPI(1500)).toBe('1.5K');
  });
});

  it('formats timestamps with the active document locale', () => {
    const originalDocument = globalThis.document;
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement: { lang: 'hi-IN' } } });
    const hindi = formatDateTime('2026-10-01T10:30:00Z');
    Object.defineProperty(globalThis, 'document', { configurable: true, value: { documentElement: { lang: 'en-IN' } } });
    const english = formatDateTime('2026-10-01T10:30:00Z');
    expect(hindi).not.toBe(english);
    Object.defineProperty(globalThis, 'document', { configurable: true, value: originalDocument });
  });
