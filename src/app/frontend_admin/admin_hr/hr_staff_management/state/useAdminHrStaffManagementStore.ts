"use client";
// RESPONSIBILITY: Owns only transient HR staff modal and selection state.
import { create } from 'zustand';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import type { AdminHrUiStoreState } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementStoreTypes';

export const useAdminHrStore = create<AdminHrUiStoreState>((set) => ({
  visibleColumns: ['name', 'role', 'phone', 'salary', 'status', 'actions'],
  showModal: false,
  showProfileModal: false,
  editId: null,
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  setShowModal: (showModal) => set(showModal ? { showModal: true, showProfileModal: false } : { showModal: false }),
  setShowProfileModal: (showProfileModal) => set(showProfileModal ? { showProfileModal: true, showModal: false } : { showProfileModal: false }),
  setEditId: (editId) => set({ editId }),
  openAdd: () => set({ editId: null, showModal: true, showProfileModal: false }),
  openEdit: (staff: Staff) => set({ editId: staff.id, showModal: true, showProfileModal: false }),
  openProfile: (staff: Staff) => set({ editId: staff.id, showProfileModal: true, showModal: false }),
}));
