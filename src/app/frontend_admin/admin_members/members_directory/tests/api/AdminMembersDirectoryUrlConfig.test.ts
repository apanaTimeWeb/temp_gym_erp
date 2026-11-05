// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryUrlConfig.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/api/AdminMembersDirectoryUrlConfig.test.ts)

import { describe, expect, it } from 'vitest';
import { ADMIN_MEMBERS_ROUTES, ADMIN_MEMBERS_API } from '@/app/frontend_admin/admin_members/members_directory/config/admin_members_directory.url_config';

describe('Admin members URL configuration', () => {
  it('preserves the selected member identity in the detail route', () => {
    expect(ADMIN_MEMBERS_ROUTES.detail('member/42')).toBe('/frontend_admin/admin_members/members_directory?memberId=member%2F42');
    expect(ADMIN_MEMBERS_API.detail('member/42')).toBe('/admin/members/member%2F42');
  });
});
