// RESPONSIBILITY: Owns UI-only Permissions state. Server responses remain in TanStack Query.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_permissions/permissions_management/state/useAdminSecurityPermissionsManagementStore.ts)

import { create } from 'zustand';
import type { AdminPermissionsStore } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementStoreTypes';
import { createAdminIdempotencyKey } from '@/app/frontend_admin/admin_security/security_permissions_management/utils/AdminSecurityPermissionsManagementCreateIdempotencyKey';
/**
 * @description useAdminPermissionsStore: Owns UI-only Permissions state. Server responses remain in TanStack Query.
 * @dependencies Consumes AdminPermissionsStoreTypes, AdminPermissionsTypes.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminPermissionsStore = create<AdminPermissionsStore>((set, get) => ({
  activeRole: 'all',
  staffSearch: '',
  editingStaffId: null,
  pendingStaffOperations: {},
  idempotencyKeysByIntent: {},
  getSharedIntentKey: (intentId) => {
    const existing = get().idempotencyKeysByIntent[intentId];
    if (Object.prototype.hasOwnProperty.call(get().idempotencyKeysByIntent, intentId) && existing) return existing;
    const key = createAdminIdempotencyKey();
    set((state) => ({ idempotencyKeysByIntent: { ...state.idempotencyKeysByIntent, [intentId]: key } }));
    return key;
  },
  clearSharedIntentKey: (intentId) => set((state) => {
    if (!Object.prototype.hasOwnProperty.call(state.idempotencyKeysByIntent, intentId)) return state;
    const next = { ...state.idempotencyKeysByIntent };
    delete next[intentId];
    return { idempotencyKeysByIntent: next };
  }),
  tryBeginStaffOperation: (staffId) => {
    // Zustand's synchronous set callback serializes competing events across separately mounted hooks.
    if (!staffId.trim()) return false;
    let acquired = false;
    set((state) => {
      if (Object.prototype.hasOwnProperty.call(state.pendingStaffOperations, staffId)) return state;
      acquired = true;
      return { pendingStaffOperations: { ...state.pendingStaffOperations, [staffId]: true } };
    });
    return acquired;
  },
  endStaffOperation: (staffId) => set((state) => {
    if (!Object.prototype.hasOwnProperty.call(state.pendingStaffOperations, staffId)) return state;
    const next = { ...state.pendingStaffOperations };
    delete next[staffId];
    return { pendingStaffOperations: next };
  }),
  setActiveRole: (activeRole) => set({ activeRole }),
  setStaffSearch: (staffSearch) => set({ staffSearch }),
  setEditingStaffId: (editingStaffId) => set({ editingStaffId }),
}));
