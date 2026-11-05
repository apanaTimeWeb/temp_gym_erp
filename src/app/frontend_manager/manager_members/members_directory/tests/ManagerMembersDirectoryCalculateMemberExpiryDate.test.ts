import { describe, expect, it } from 'vitest';

import { BILLING_CYCLE_CUSTOM, BILLING_CYCLE_ONE_MONTH, BILLING_CYCLE_THREE_MONTHS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_billing_cycle.constants';
import { ManagerMembersDirectoryCalculateMemberExpiryDate } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculateMemberExpiryDate';

describe('ManagerMembersDirectoryCalculateMemberExpiryDate', () => {
  it('adds a one-month cycle without mutating the input Date', () => {
    const start = new Date('2026-01-15T00:00:00.000Z');
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate(start, BILLING_CYCLE_ONE_MONTH)).toBe('2026-02-15');
    expect(start.toISOString()).toBe('2026-01-15T00:00:00.000Z');
  });

  it('adds multi-month and custom-day cycles', () => {
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('2026-01-15', BILLING_CYCLE_THREE_MONTHS)).toBe('2026-04-15');
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('2026-01-15', BILLING_CYCLE_CUSTOM, 10)).toBe('2026-01-25');
  });

  it('preserves legacy billing labels for existing member records', () => {
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('2026-01-15', 'Monthly')).toBe('2026-02-15');
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('2026-01-15', 'Quarterly')).toBe('2026-04-15');
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('2026-01-15', 'Semiannual')).toBe('2026-07-15');
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('2026-01-15', 'Annual')).toBe('2027-01-15');
  });

  it('returns null for an invalid start date', () => {
    expect(ManagerMembersDirectoryCalculateMemberExpiryDate('not-a-date', BILLING_CYCLE_ONE_MONTH)).toBeNull();
  });
});
