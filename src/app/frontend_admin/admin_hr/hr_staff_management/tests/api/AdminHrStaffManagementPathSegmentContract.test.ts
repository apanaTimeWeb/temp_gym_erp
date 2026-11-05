import { describe, expect, it } from 'vitest';
import { ADMIN_HR_STAFF_GET_ONE_URL } from '@/app/frontend_admin/admin_hr/hr_staff_management/config/admin_hr_staff_management.url_config';

describe('AdminHrStaffManagement URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_HR_STAFF_GET_ONE_URL('valid-1')).toBe("/admin/hr/staff/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_HR_STAFF_GET_ONE_URL('a/b?x#y')).toBe("/admin/hr/staff/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_HR_STAFF_GET_ONE_URL(id)).toThrow(TypeError);
  });
});
