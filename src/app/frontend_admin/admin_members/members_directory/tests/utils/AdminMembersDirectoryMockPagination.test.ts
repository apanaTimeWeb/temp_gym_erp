import { describe, expect, it } from 'vitest';
import { normalizeAdminMembersDirectoryMockPagination } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryMockPagination';

describe('AdminMembersDirectory mock HTTP pagination', () => {
  it('retains valid positive integer pagination and existing default values', () => {
    expect(normalizeAdminMembersDirectoryMockPagination(null, 10)).toBe(10);
    expect(normalizeAdminMembersDirectoryMockPagination('2', 1)).toBe(2);
    expect(normalizeAdminMembersDirectoryMockPagination('3', 8)).toBe(3);
  });
  it('rejects malformed values without unsafe offsets or infinite metadata', () => {
    for (const raw of ['0', '-1', '1.5', '1e5', 'Infinity', 'NaN', '', ' 2 ', '9007199254740992']) {
      expect(normalizeAdminMembersDirectoryMockPagination(raw, 8)).toBe(8);
    }
  });
});
