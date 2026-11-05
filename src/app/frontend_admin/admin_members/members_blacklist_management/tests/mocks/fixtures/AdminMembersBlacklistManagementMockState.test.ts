// RESPONSIBILITY: Defines regression tests for AdminMembersBlacklistManagementMockState.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/mocks/fixtures/AdminMembersBlacklistManagementMockState.test.ts)

import { describe, expect, it } from 'vitest';
import { getAdminBlacklistMockState, resetAdminBlacklistMockState } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/fixtures/AdminMembersBlacklistManagementMockState';
import { MOCK_BLACKLIST_EXPANDED } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/fixtures/AdminMembersBlacklistManagementMockFixtures';

describe('Admin blacklist mock state', () => {
  it('starts from a cloned seed and can be reset deterministically', () => {
    resetAdminBlacklistMockState();
    const state = getAdminBlacklistMockState();
    expect(state).toHaveLength(MOCK_BLACKLIST_EXPANDED.length);
    state.splice(0, 1);
    expect(getAdminBlacklistMockState()).toHaveLength(MOCK_BLACKLIST_EXPANDED.length - 1);
    resetAdminBlacklistMockState();
    expect(getAdminBlacklistMockState()).toHaveLength(MOCK_BLACKLIST_EXPANDED.length);
  });
});
