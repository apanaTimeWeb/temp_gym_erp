// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// DATA FLOW: guarded form dirty state → TrainerInfrastructureNavigationGuardStoreState → guarded navigation decision.
// RESPONSIBILITY: Owns only the Trainer shell's module-scoped dirty-form registry used to protect in-app navigation.
import { create } from 'zustand';

import type { TrainerInfrastructureNavigationGuardStoreState } from '@/app/frontend_trainer/trainer_account/account_personal_profile/state/TrainerAccountPersonalProfileTrainerInfrastructureNavigationGuardStoreState';




/**
 * Maintains the Trainer shell's UI-only dirty-source registry used by guarded navigation.
 * State is module-local to the Trainer shell; it never stores API responses.
 * The registry is cleared by each form owner when its mutation completes or the draft is abandoned.
 */
/**
 * @description Manages TrainerInfrastructureNavigationGuardStore state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerInfrastructureNavigationGuardStore = create<TrainerInfrastructureNavigationGuardStoreState>((set, get) => ({
  dirtySources: {},
  setSourceDirty: (sourceId, isDirty) => set((state) => {
    const next = { ...state.dirtySources };
    if (isDirty) next[sourceId] = true;
    else delete next[sourceId];
    return { dirtySources: next };
  }),
  hasDirtySources: () => Object.keys(get().dirtySources).length > 0,
}));
