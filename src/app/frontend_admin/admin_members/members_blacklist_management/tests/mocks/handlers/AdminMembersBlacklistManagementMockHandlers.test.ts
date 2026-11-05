// RESPONSIBILITY: Defines regression tests for AdminMembersBlacklistManagementMockHandlers.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/mocks/handlers/AdminMembersBlacklistManagementMockHandlers.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminBlacklistResourceIdFromPathname } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/handlers/AdminMembersBlacklistManagementMockHandlers';

describe('getAdminBlacklistResourceIdFromPathname', () => {
  it('extracts the resource ID before a remove suffix', () => {
    expect(getAdminBlacklistResourceIdFromPathname('/api/v1/admin/blacklist/blacklist-42/remove')).toBe('blacklist-42');
  });

  it('extracts the resource ID before a propagate suffix', () => {
    expect(getAdminBlacklistResourceIdFromPathname('/api/v1/admin/blacklist/blacklist-42/propagate')).toBe('blacklist-42');
  });

  it('extracts the resource ID for a direct resource route', () => {
    expect(getAdminBlacklistResourceIdFromPathname('/api/v1/admin/blacklist/blacklist-42')).toBe('blacklist-42');
  });
});
