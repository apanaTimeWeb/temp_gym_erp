import { describe, expect, it } from 'vitest';
import { formatSuperadminInfrastructureUptimeAxisTime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/utils/SuperadminSystemOpsInfrastructureUptimeUtils';

describe('formatSuperadminInfrastructureUptimeAxisTime', () => {
  it('formats valid timestamps with the requested locale', () => {
    const timestamp = '2026-09-20T10:15:00.000Z';
    expect(formatSuperadminInfrastructureUptimeAxisTime(timestamp, 'en-IN')).toBe('10:15');
    expect(formatSuperadminInfrastructureUptimeAxisTime(timestamp, 'hi-IN')).not.toBe('');
    expect(formatSuperadminInfrastructureUptimeAxisTime(timestamp, 'ar-EG')).toBe('١٠:١٥');
  });
  it('returns an empty label for missing or invalid timestamps', () => {
    expect(formatSuperadminInfrastructureUptimeAxisTime('', 'en-IN')).toBe('');
    expect(formatSuperadminInfrastructureUptimeAxisTime('not-a-date', 'en-IN')).toBe('');
  });
  it('falls back to a supported locale for invalid locale identifiers', () => {
    expect(formatSuperadminInfrastructureUptimeAxisTime('2026-09-20T10:15:00.000Z', 'invalid_locale')).toBe('10:15');
  });
});
