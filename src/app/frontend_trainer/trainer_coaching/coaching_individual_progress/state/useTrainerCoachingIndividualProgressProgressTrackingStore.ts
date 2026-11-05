"use client";
// DATA FLOW: Progress UI interactions → module-scoped Zustand store → selected IDs/modal/metric UI state.
// RESPONSIBILITY: Owns UI-only coordination; TanStack Query remains the owner of progress records.
import { create } from 'zustand';

import { TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressProgressTrackingConstants';

import type { TrainerProgressTrackingStore } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/state/TrainerCoachingIndividualProgressProgressTrackingStoreTypes';

/**
 * @description Stores only Progress Tracking UI state and stable entity IDs; it never duplicates server records.
 * @dependencies TanStack Query owns progress entries and member data used to resolve selected IDs.
 * @edge-case Cache refreshes cannot leave stale progress-entry objects in client state because the store retains IDs only.
 */
export const useTrainerProgressTrackingStore = create<TrainerProgressTrackingStore>((set) => ({
  activeMetric: 'weight',
  setActiveMetric: (activeMetric) => set({ activeMetric }),
  showModal: false,
  setShowModal: (showModal) => set({ showModal }),
  editingEntryId: null,
  setEditingEntryId: (editingEntryId) => set({ editingEntryId }),
  activeComparisonMetric: 'weightChangeKg',
  setActiveComparisonMetric: (activeComparisonMetric) => set({ activeComparisonMetric }),
  selectedComparisonIds: [],
  toggleComparisonMember: (memberId) => set((state) => {
    const ids = state.selectedComparisonIds;
    if (ids.includes(memberId)) return { selectedComparisonIds: ids.filter(id => id !== memberId) };
    if (ids.length >= TRAINER_PROGRESS_TRACKING_COMPARISON_MAX_MEMBERS) return state;
    return { selectedComparisonIds: [...ids, memberId] };
  }),
}));
