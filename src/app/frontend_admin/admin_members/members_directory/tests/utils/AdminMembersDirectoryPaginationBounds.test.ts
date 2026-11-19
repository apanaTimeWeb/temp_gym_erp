import { describe, expect, it } from 'vitest';
import { normalizeAdminMembersDirectoryMockPagination } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryMockPagination';

describe('RBG137 mock member pagination bounds', () => {
  it('retains valid page indexes and default limits', () => {
    expect(normalizeAdminMembersDirectoryMockPagination('3', 1)).toBe(3);
    expect(normalizeAdminMembersDirectoryMockPagination(null, 10, 100)).toBe(10);
  });
  it('enforces list page-size ceilings without changing the page-index default ceiling', () => {
    expect(normalizeAdminMembersDirectoryMockPagination('9999', 10, 100)).toBe(100);
    expect(normalizeAdminMembersDirectoryMockPagination('99999999', 1)).toBe(100000);
  });
  it('rejects invalid input safely', () => {
    for (const raw of ['-1', '0', 'Infinity', '1e9', ' 4 ', 'NaN']) {
      expect(normalizeAdminMembersDirectoryMockPagination(raw, 7, 100)).toBe(7);
    }
  });
});
