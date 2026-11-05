import { describe, expect, it } from 'vitest';
import { formatSuperadminGymsDate } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormatDate';

describe('formatSuperadminGymsDate', () => {
  it('returns an intentional fallback for missing or invalid optional timestamps', () => {
    expect(formatSuperadminGymsDate(null, 'en-US')).toBe('—');
    expect(formatSuperadminGymsDate('not-a-date', 'en-US')).toBe('—');
  });
  it('formats supported locales without a fixed English date pattern', () => {
    expect(formatSuperadminGymsDate('2026-03-15', 'en-US')).toContain('2026');
    expect(formatSuperadminGymsDate('2026-03-15', 'hi')).toContain('2026');
  });
});
