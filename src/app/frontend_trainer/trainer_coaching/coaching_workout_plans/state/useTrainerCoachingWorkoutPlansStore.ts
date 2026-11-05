"use client";
// RESPONSIBILITY: Zustand store for Workout UI-only state; server records remain in TanStack Query.
// DATA FLOW: UI intent → selected IDs / modal flags / local draft → workout views and form orchestration.
import { create } from 'zustand';

import type { TrainerWorkoutState } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/state/TrainerCoachingWorkoutPlansStoreTypes';

/**
 * @description Owns only Workout UI coordination state. It never stores API response entities.
 * @dependencies TanStack Query remains the single owner of Workout and Exercise server records.
 * @edge-case Selection state is represented by stable IDs so cache refreshes cannot leave stale entity copies in Zustand.
 */
export const useTrainerWorkoutStore = create<TrainerWorkoutState>((set) => ({
  showWkModal: false,
  setShowWkModal: (show) => set({ showWkModal: show }),
  editWorkoutId: null,
  setEditWorkoutId: (workoutId) => set({ editWorkoutId: workoutId }),
  showExModal: false,
  setShowExModal: (show) => set({ showExModal: show }),
  editExerciseId: null,
  setEditExerciseId: (exerciseId) => set({ editExerciseId: exerciseId }),
  showDetailDrawer: false,
  setShowDetailDrawer: (show) => set({ showDetailDrawer: show }),
  showAssignModal: false,
  setShowAssignModal: (show) => set({ showAssignModal: show }),
}));
