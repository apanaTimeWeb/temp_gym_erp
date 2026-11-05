// RESPONSIBILITY: Defines regression tests for useAdminMembersBlacklistManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/store/useAdminMembersBlacklistManagementStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_members/members_blacklist_management/state/useAdminMembersBlacklistManagementStore';

describe('useAdminBlacklistStore', () => {
  beforeEach(() => useAdminBlacklistStore.setState({ currentPage: 4, showModal: false, search: '', scopeFilter: 'all', gymFilter: 'all', activeTab: 'all' }));

  it('resets pagination when blacklist filters change', () => {
    useAdminBlacklistStore.getState().setSearch('blocked');
    expect(useAdminBlacklistStore.getState().currentPage).toBe(1);
    useAdminBlacklistStore.setState({ currentPage: 2 });
    useAdminBlacklistStore.getState().setScopeFilter('global');
    expect(useAdminBlacklistStore.getState().currentPage).toBe(1);
    useAdminBlacklistStore.setState({ currentPage: 5 });
    useAdminBlacklistStore.getState().setGymFilter('gym-2');
    expect(useAdminBlacklistStore.getState().currentPage).toBe(1);
  });

  it('controls the blacklist modal and active tab', () => {
    const store = useAdminBlacklistStore.getState();
    store.setShowModal(true);
    store.setActiveTab('cross-branch');
    expect(useAdminBlacklistStore.getState()).toMatchObject({ showModal: true, activeTab: 'cross-branch' });
  });
});
