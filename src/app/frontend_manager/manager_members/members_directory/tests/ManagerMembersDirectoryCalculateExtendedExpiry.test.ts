import { describe, it, expect } from 'vitest';
import { ManagerMembersDirectoryCalculateExtendedExpiry } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculateExtendedExpiry';

describe('ManagerMembersDirectoryCalculateExtendedExpiry', () => {
  it('correctly extends expiry date by freeze days', () => {
    const result = ManagerMembersDirectoryCalculateExtendedExpiry('2026-12-01', 15, '2026-11-01');
    expect(result.freezeUntil).toBe('2026-11-16');
    expect(result.extendedExpiryDate).toBe('2026-12-16');
  });

  it('clamps freeze days between 1 and 180', () => {
    const minResult = ManagerMembersDirectoryCalculateExtendedExpiry('2026-12-01', 0, '2026-11-01');
    expect(minResult.freezeUntil).toBe('2026-11-02');
    expect(minResult.extendedExpiryDate).toBe('2026-12-02');

    const maxResult = ManagerMembersDirectoryCalculateExtendedExpiry('2026-12-01', 500, '2026-11-01');
    expect(maxResult.freezeUntil).toBe('2027-04-30');
  });

  it('handles invalid dates gracefully by falling back to current date', () => {
    const result = ManagerMembersDirectoryCalculateExtendedExpiry('invalid-date', 10);
    expect(result.freezeUntil).toBeTruthy();
    expect(result.extendedExpiryDate).toBeTruthy();
  });
});
