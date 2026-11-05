// RESPONSIBILITY: Verifies path segment encoding for verified Staff CRUD route definitions.
import { describe, expect, it } from 'vitest';
import { ADMIN_HR_STAFF_GET_ONE_URL, ADMIN_HR_STAFF_UPDATE_URL, ADMIN_HR_STAFF_DELETE_URL } from '@/app/frontend_admin/admin_hr/hr_staff_management/config/admin_hr_staff_management.url_config';

describe('staff ID path-segment escaping', () => {
  it('encodes slashes, fragments, queries and whitespace without changing the route template', () => {
    const identifier = 'branch/12?test# name';
    const encoded = 'branch%2F12%3Ftest%23%20name';
    expect(ADMIN_HR_STAFF_GET_ONE_URL(identifier)).toBe(`/admin/hr/staff/${encoded}`);
    expect(ADMIN_HR_STAFF_UPDATE_URL(identifier)).toBe(`/admin/hr/staff/${encoded}`);
    expect(ADMIN_HR_STAFF_DELETE_URL(identifier)).toBe(`/admin/hr/staff/${encoded}`);
  });
});
