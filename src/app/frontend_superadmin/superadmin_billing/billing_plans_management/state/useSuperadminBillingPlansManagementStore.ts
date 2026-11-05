'use client';
// DATA FLOW: Superadmin UI → useSuperadminBillingPlansManagementStore → Superadmin module API/state → consuming component
// RESPONSIBILITY: Zustand store for the Plans module. Manages only modal UI state.
// DATA FLOW: Component -> useSuperadminBillingPlansManagementStore.ts -> UI Components
import { create } from 'zustand';

import type { SuperadminBillingPlansStoreState } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management_store.types';


/**
 * Purpose: Zustand store for the Plans module. Manages only modal UI state.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Owns module-scoped client UI state for plans.
 * @dependencies Contains UI-only shared state; server data remains in TanStack Query.
 * @edge-case Must not become a second server-state cache.
 */
// DATA FLOW: Feature UI events → useSuperadminBillingPlansManagementStore → subscribing module components.
/**
 * @description Owns the feature-local state slice and actions used by this store.
 * @dependencies State is typed by the module-local store interface; server-owned data remains in the feature query layer and must not be duplicated here.
 * @edge-case Keep initial and reset state valid, prevent tenant/session state leakage, and preserve deterministic behavior when actions are repeated.
 */
export const useSuperadminBillingPlansManagementStore = create<SuperadminBillingPlansStoreState>((set) => ({
    isCreateModalOpen: false,
    isEditModalOpen: false,
    selectedPlan: null,
    openCreateModal: () => set({ isCreateModalOpen: true }),
    closeCreateModal: () => set({ isCreateModalOpen: false }),
    openEditModal: (plan) => set({ selectedPlan: plan, isEditModalOpen: true }),
    closeEditModal: () => set({ isEditModalOpen: false, selectedPlan: null }),
}));
