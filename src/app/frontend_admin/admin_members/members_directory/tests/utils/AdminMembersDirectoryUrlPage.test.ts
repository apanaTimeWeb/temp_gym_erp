import { describe, expect, it } from 'vitest';
import { normalizeAdminMembersDirectoryUrlPage } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryUrlPage';

describe('AdminMembersDirectory URL-sync pagination', () => {
  it('accepts only canonical positive safe integer pages', () => {
    expect(normalizeAdminMembersDirectoryUrlPage('9')).toBe(9);
    expect(normalizeAdminMembersDirectoryUrlPage(2)).toBe(2);
    for (const raw of [undefined, null, '', '0', '1.5', '1e5', '-3', 'Infinity', 'NaN', '9007199254740992', ' 2 ', Number.POSITIVE_INFINITY]) {
      expect(normalizeAdminMembersDirectoryUrlPage(raw)).toBe(1);
    }
  });
});
