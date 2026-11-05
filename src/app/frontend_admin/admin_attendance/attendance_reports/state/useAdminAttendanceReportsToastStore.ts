"use client";
// RESPONSIBILITY: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
// DATA FLOW: feature API/schema → hook/context → useAdminNavigationLayoutToastStore consumers.

import type { ToastState } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsToastStoreTypes';

import { create } from 'zustand';
import type { AdminToastType } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsToastTypes';
/**
 * @description useAdminNavigationLayoutToastStore: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
 * @dependencies Consumes AdminNavigationLayoutToastStoreTypes, AdminNavigationLayoutToastTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminNavigationLayoutToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message, type, id) => set((state) => {
    // Fail closed if a caller bypasses the required deterministic ID contract.
    if (!id || !id.trim()) return state;
    if (state.toast?.id === id) return state;
    return { toast: { id, message, type } };
  }),
  hideToast: (id) => set((state) => state.toast && (!id || state.toast.id === id) ? { toast: null } : state),
}));
