'use client';
// DATA FLOW: Superadmin UI → useSuperadminGymsDirectoryStore → Superadmin module API/state → consuming component
// RESPONSIBILITY: Zustand store that manages UI state (modals, view mode) for the Gyms module.
// DATA FLOW: Component -> useSuperadminGymsDirectoryStore.ts -> UI Components
import { create } from 'zustand';

import type { SuperadminGymsState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_store.types';


/**
 * Purpose: Zustand store that manages UI state (modals, view mode) for the Gyms module.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Owns module-scoped client UI state for gyms.
 * @dependencies Contains UI-only shared state; server data remains in TanStack Query.
 * @edge-case Must not become a second server-state cache.
 */
// DATA FLOW: Feature UI events → useSuperadminGymsDirectoryStore → subscribing module components.
/**
 * @description Owns the feature-local state slice and actions used by this store.
 * @dependencies State is typed by the module-local store interface; server-owned data remains in the feature query layer and must not be duplicated here.
 * @edge-case Keep initial and reset state valid, prevent tenant/session state leakage, and preserve deterministic behavior when actions are repeated.
 */
export const useSuperadminGymsDirectoryStore = create<SuperadminGymsState>((set) => ({
    viewMode: 'list',
    selectedGym: null,
    isEditModalOpen: false,
    isWhatsappModalOpen: false,
    isDeleteModalOpen: false,
    gymToDelete: null,
    setViewMode: (viewMode) => set({ viewMode }),
    openEditModal: (gym) => set({ selectedGym: gym, isEditModalOpen: true }),
    closeEditModal: () => set((state) => ({ isEditModalOpen: false, selectedGym: state.isWhatsappModalOpen ? state.selectedGym : null })),
    openWhatsappModal: (gym) => set({ selectedGym: gym, isWhatsappModalOpen: true }),
    closeWhatsappModal: () => set((state) => ({ isWhatsappModalOpen: false, selectedGym: state.isEditModalOpen ? state.selectedGym : null })),
    openDeleteModal: (gym) => set({ gymToDelete: gym, isDeleteModalOpen: true }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false, gymToDelete: null }),
}));
