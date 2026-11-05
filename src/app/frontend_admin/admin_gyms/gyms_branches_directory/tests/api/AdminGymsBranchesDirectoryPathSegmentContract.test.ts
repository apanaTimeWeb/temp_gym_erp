import { describe, expect, it } from 'vitest';
import { ADMIN_BRANCHES_DETAIL_URL } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/config/admin_gyms_branches_directory.url_config';

describe('AdminGymsBranchesDirectory URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_BRANCHES_DETAIL_URL('valid-1')).toBe("/admin/branches/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_BRANCHES_DETAIL_URL('a/b?x#y')).toBe("/admin/branches/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_BRANCHES_DETAIL_URL(id)).toThrow(TypeError);
  });
});
