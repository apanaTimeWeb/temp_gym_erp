import { describe, expect, it } from 'vitest';
import { ADMIN_MEMBERS_DETAIL_URL } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';

describe('AdminMembersDirectory URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_MEMBERS_DETAIL_URL('valid-1')).toBe("/admin/members/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_MEMBERS_DETAIL_URL('a/b?x#y')).toBe("/admin/members/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_MEMBERS_DETAIL_URL(id)).toThrow(TypeError);
  });
});
