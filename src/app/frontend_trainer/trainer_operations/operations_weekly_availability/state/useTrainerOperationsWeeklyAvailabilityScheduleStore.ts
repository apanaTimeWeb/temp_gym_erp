// RESPONSIBILITY: Zustand store that manages UI-only state for the Trainer Schedule module.
// DATA FLOW: Schedule UI tab/modal interactions → module-scoped Zustand store → availability/leave UI state.
import { create } from 'zustand';

import type { TrainerScheduleStore } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/types/TrainerOperationsWeeklyAvailabilityScheduleStoreTypes';




/**
 * Owns Schedule UI state shared between the availability and leave-request sections.
 * The store contains no server data or loading states; TanStack Query owns schedule responses and mutations.
 */
/**
 * @description Manages TrainerScheduleStore state and data flow for the schedule feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerScheduleStore = create<TrainerScheduleStore>((set) => ({
  activeTab: 'availability',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  showLeaveModal: false,
  setShowLeaveModal: (show) => set({ showLeaveModal: show }),
  openLeaveModal: () => set({ showLeaveModal: true }),
  closeLeaveModal: () => set({ showLeaveModal: false }),
  
}));
