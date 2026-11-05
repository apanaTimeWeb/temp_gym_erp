// RESPONSIBILITY: Zustand store for Attendance module UI-only ephemeral state.
// DATA FLOW: Component events → useTrainerAttendanceStore (UI only) — NO server data stored here.
import { create } from 'zustand';

import type { TrainerAttendanceStore } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/state/TrainerOperationsMemberAttendanceAttendanceStoreTypes';




/**
 * Stores Attendance UI-only view and modal state for the Trainer role.
 * Attendance records, loading states, and API responses remain in TanStack Query.
 */
/**
 * @description Manages TrainerAttendanceStore state and data flow for the attendance feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerAttendanceStore = create<TrainerAttendanceStore>((set) => ({
  showModal: false,
  setShowModal: (show) => set({ showModal: show }),
  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false }),

  viewMode: 'calendar',
  setViewMode: (viewMode) => set({ viewMode }),

}));
