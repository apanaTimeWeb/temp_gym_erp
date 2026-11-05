'use client';
import { create } from 'zustand';
import type { SuperadminGymGhostLoginState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_ghost_login.types';

/**
 * Transient UI state only. The server-issued Ghost Login cookie and server APIs own
 * the session; tenant records and contact fields must never be persisted in browser storage.
 */
export const useSuperadminGymsDirectoryGymGhostLoginStore = create<SuperadminGymGhostLoginState>()(
  (set) => ({
    ghostTenantId: null,
    startGhostLogin: (tenantId: string) => set({ ghostTenantId: tenantId }),
    clearGhostLogin: () => set({ ghostTenantId: null }),
  }),
);
