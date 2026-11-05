"use client";
// RESPONSIBILITY: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
// DATA FLOW: feature API/schema → hook/context → useAdminNavigationLayoutToastStore consumers.

import type { ToastState } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerToastStoreTypes';

import { create } from 'zustand';
import type { AdminToastType } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerToastTypes';
/**
 * @description useAdminNavigationLayoutToastStore: Global store for Admin Toast notifications, enforcing deduplication via stable IDs.
 * @dependencies Consumes AdminNavigationLayoutToastStoreTypes, AdminNavigationLayoutToastTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminNavigationLayoutToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message, type, id) => set((state) => {
    const stableId = id || message; // Use message as stable ID if none provided
    if (state.toast && state.toast.id === stableId) {
      return state; // Deduplicate: do not update state if identical toast is already showing
    }
    return { toast: { id: stableId, message, type } };
  }),
  hideToast: (id) => set((state) => state.toast && (!id || state.toast.id === id) ? { toast: null } : state),
}));
