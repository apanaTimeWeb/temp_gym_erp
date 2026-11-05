// RESPONSIBILITY: Defines regression tests for useAdminGymsBranchesDirectoryStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_branches/branches_directory/tests/store/useAdminGymsBranchesDirectoryStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminBranchesStore } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/state/useAdminGymsBranchesDirectoryStore';

describe('useAdminBranchesStore', () => {
  beforeEach(() => useAdminBranchesStore.setState({ selectedBranchId: null, detailView: null, search: '', statusFilter: 'all', timeRange: 'monthly' }));

  it('tracks the selected branch for detail rendering', () => {
    useAdminBranchesStore.getState().setSelectedBranchId('branch-7');
    expect(useAdminBranchesStore.getState().selectedBranchId).toBe('branch-7');
  });

  it('tracks branch detail view state independently from server data', () => {
    useAdminBranchesStore.getState().setDetailView('revenue');
    expect(useAdminBranchesStore.getState().detailView).toBe('revenue');
  });

  it('stores filter and time-range preferences', () => {
    const store = useAdminBranchesStore.getState();
    store.setSearch('Jaipur');
    store.setStatusFilter('active');
    store.setTimeRange('yearly');
    expect(useAdminBranchesStore.getState()).toMatchObject({ search: 'Jaipur', statusFilter: 'active', timeRange: 'yearly' });
  });
});
