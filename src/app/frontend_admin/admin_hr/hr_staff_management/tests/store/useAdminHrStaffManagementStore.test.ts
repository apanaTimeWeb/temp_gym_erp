import { act } from 'react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useAdminHrStore } from '@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementStore';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';

const staff: Staff = { id: 'staff-1', name: 'Demo Staff', email: 'demo@example.com', phone: '9876543210', role: 'Admin', salary: 25000, branch: 'branch-1', gender: 'OTHER', joinDate: '2026-01-01', isActive: true };

describe('useAdminHrStore', () => {
  beforeEach(() => useAdminHrStore.setState({ visibleColumns: ['name', 'role', 'phone', 'salary', 'status', 'actions'], showModal: false, showProfileModal: false, editId: null }));
  it('opens add and edit staff workflows with incompatible modal state cleared', () => {
    act(() => useAdminHrStore.getState().openEdit(staff));
    expect(useAdminHrStore.getState().editId).toBe('staff-1');
    expect(useAdminHrStore.getState().showModal).toBe(true);
    expect(useAdminHrStore.getState().showProfileModal).toBe(false);
    act(() => useAdminHrStore.getState().openProfile(staff));
    expect(useAdminHrStore.getState().showProfileModal).toBe(true);
    expect(useAdminHrStore.getState().showModal).toBe(false);
  });
  it('opens the add-staff form independently', () => {
    act(() => useAdminHrStore.getState().openAdd());
    expect(useAdminHrStore.getState().showModal).toBe(true);
    expect(useAdminHrStore.getState().editId).toBeNull();
    expect(useAdminHrStore.getState().showProfileModal).toBe(false);
  });
});
