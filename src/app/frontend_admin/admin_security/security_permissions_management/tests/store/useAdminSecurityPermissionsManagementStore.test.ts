// RESPONSIBILITY: Defines regression tests for useAdminSecurityPermissionsManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_permissions/permissions_management/tests/store/useAdminSecurityPermissionsManagementStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/state/useAdminSecurityPermissionsManagementStore';

describe('useAdminPermissionsStore', () => {
  beforeEach(() => useAdminPermissionsStore.setState({ activeRole: 'all', staffSearch: '', editingStaffId: null }));

  it('tracks role filter and staff search as client UI state', () => {
    const store = useAdminPermissionsStore.getState();
    store.setActiveRole('manager');
    store.setStaffSearch('Asha');
    expect(useAdminPermissionsStore.getState()).toMatchObject({ activeRole: 'manager', staffSearch: 'Asha' });
  });

  it('tracks the staff record being edited without storing permissions data', () => {
    useAdminPermissionsStore.getState().setEditingStaffId('staff-5');
    const state = useAdminPermissionsStore.getState();
    expect(state.editingStaffId).toBe('staff-5');
    expect('permissions' in state).toBe(false);
  });
});
