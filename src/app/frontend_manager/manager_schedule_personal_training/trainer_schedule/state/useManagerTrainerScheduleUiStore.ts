// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ManagerToastType } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/ManagerTrainerScheduleLocalToastTypes';

import type { TrainerShift } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/types/manager_trainer_schedule.types';


interface ManagerTrainerScheduleUiState {
  toast: { message: string; type: ManagerToastType } | null;
  shiftModal: { open: boolean; editShift: TrainerShift | null; trainerId: string | null };
  showToast: (message: string, type: ManagerToastType) => void;
  hideToast: () => void;
  openAddShift: (trainerId: string) => void;
  openEditShift: (shift: TrainerShift) => void;
  closeShiftModal: () => void;
}

/**
 * @description Coordinates schedule feature state and its documented UI/API boundary through useManagerTrainerScheduleUiStore.
 * @dependencies Uses ManagerToastTypes, ManagerTrainerScheduleTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerTrainerScheduleUiStore = create<ManagerTrainerScheduleUiState>((set) => ({
  toast: null,
  shiftModal: { open: false, editShift: null, trainerId: null },
  showToast: (message, type) => set({ toast: { message, type } }),
  hideToast: () => set({ toast: null }),
  openAddShift: (trainerId) => set({ shiftModal: { open: true, editShift: null, trainerId } }),
  openEditShift: (shift) => set({ shiftModal: { open: true, editShift: shift, trainerId: shift.trainerId } }),
  closeShiftModal: () => set({ shiftModal: { open: false, editShift: null, trainerId: null } }) }));
