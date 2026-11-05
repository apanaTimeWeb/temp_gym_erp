import { describe, expect, it } from 'vitest';
import { ADMIN_BLACKLIST_DETAIL_URL } from '@/app/frontend_admin/admin_members/members_blacklist_management/config/admin_members_blacklist_management.url_config';

describe('AdminMembersBlacklistManagement URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_BLACKLIST_DETAIL_URL('valid-1')).toBe("/admin/blacklist/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_BLACKLIST_DETAIL_URL('a/b?x#y')).toBe("/admin/blacklist/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_BLACKLIST_DETAIL_URL(id)).toThrow(TypeError);
  });
});
