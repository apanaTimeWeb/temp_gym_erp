'use client';
// DATA FLOW: Local exercise-selection events → module-scoped Zustand store → Exercise Management components; server records remain in TanStack Query.
import { create } from 'zustand';
import type { TrainerWorkoutState } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/state/TrainerCoachingExerciseManagementStoreTypes';
export const useTrainerWorkoutStore = create<TrainerWorkoutState>((set) => ({
 showExModal: false, setShowExModal: value => set({ showExModal: value }),
 editExerciseId: null, setEditExerciseId: value => set({ editExerciseId: value }),
}));
