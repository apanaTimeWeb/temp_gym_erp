import { describe, expect, it } from 'vitest';

import { formatMemberMonthYear } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryDateFormatters';

describe('formatMemberMonthYear', () => {
  it('formats valid dates in the requested locale', () => {
    expect(formatMemberMonthYear('2026-01-02T12:00:00.000Z', 'en-IN')).toContain('January 2026');
    expect(formatMemberMonthYear('2026-01-02T12:00:00.000Z', 'hi-IN')).toContain('2026');
  });
  it('returns the standard placeholder for an invalid date', () => {
    expect(formatMemberMonthYear('not-a-date', 'en-IN')).toBe('—');
  });
});
