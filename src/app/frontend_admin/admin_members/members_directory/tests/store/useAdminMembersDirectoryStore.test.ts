// RESPONSIBILITY: Defines regression tests for useAdminMembersDirectoryStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/store/useAdminMembersDirectoryStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { MEMBER_STATUS_OPTIONS } from '@/app/frontend_admin/admin_members/members_directory/constants/AdminMembersDirectoryConstants';
import { useAdminMembersStore } from '@/app/frontend_admin/admin_members/members_directory/state/useAdminMembersDirectoryStore';

describe('useAdminMembersStore', () => {
  beforeEach(() => useAdminMembersStore.setState({ currentPage: 4, search: '', statusFilter: 'all', branchFilter: 'all', expiryFilter: 'all', genderFilter: 'all', planFilter: 'all' }));

  it('resets pagination when the member search changes', () => {
    useAdminMembersStore.getState().setSearch('Ravi');
    expect(useAdminMembersStore.getState()).toMatchObject({ search: 'Ravi', currentPage: 1 });
  });

  it('resets pagination when status or branch filters change', () => {
    useAdminMembersStore.getState().setStatusFilter(MEMBER_STATUS_OPTIONS[1]?.value ?? MEMBER_STATUS_OPTIONS[0]?.value ?? '');
    expect(useAdminMembersStore.getState().currentPage).toBe(1);
    useAdminMembersStore.setState({ currentPage: 3 });
    useAdminMembersStore.getState().setBranchFilter('branch-2');
    expect(useAdminMembersStore.getState().currentPage).toBe(1);
  });

  it('keeps server records out of the UI store', () => {
    expect('members' in useAdminMembersStore.getState()).toBe(false);
  });
});
