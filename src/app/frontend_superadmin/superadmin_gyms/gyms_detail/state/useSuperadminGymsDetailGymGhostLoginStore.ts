'use client';
import { create } from 'zustand';

import type { SuperadminGymGhostLoginState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/types/superadmin_gyms_detail_ghost_login.types';

/**
 * Transient UI state only. Do not persist tenant records or contact fields in browser storage.
 * Server/API behavior remains the authority for Ghost Login; this store does not own a session.
 */
export const useSuperadminGymsDetailGymGhostLoginStore = create<SuperadminGymGhostLoginState>()(
  (set) => ({
    ghostTenantId: null,
    startGhostLogin: (tenantId: string) => set({ ghostTenantId: tenantId }),
    clearGhostLogin: () => set({ ghostTenantId: null }),
  }),
);
