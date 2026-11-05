// DATA FLOW: Manager workout-plan UI intent → module-local Zustand state.
'use client';
import { create } from 'zustand';
import { EMPTY_WORKOUT_FORM } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/constants/manager_workout_plans_form_defaults.constants';
import type { WorkoutFormValues } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_plans_form.types';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/types/manager_workout_diet_library_workout_plan_management.types';

interface ManagerWorkoutPlansUiState {
  showWkModal: boolean;
  editWkId: string | null;
  wkForm: WorkoutFormValues;
  setShowWkModal: (value: boolean) => void;
  setEditWkId: (value: string | null) => void;
  setWkForm: (value: WorkoutFormValues) => void;
  openAddWk: () => void;
  openEditWk: (workout: Workout) => void;
}

/**
 * @description Provides module-local Zustand state for opening/closing workout-plan forms and selecting add/edit form data.
 * @dependencies Uses the workout-plan default form constant and the feature-owned Workout/WorkoutFormValues types.
 * @edge-case Opening the add flow clears the edit ID and restores the shared empty form; opening edit maps the selected workout into form fields without performing API work.
 * @returns A Zustand selector/store hook exposing modal visibility, selected edit ID, form values, and their update/open actions.
 */
export const useManagerWorkoutPlansUiStore = create<ManagerWorkoutPlansUiState>((set) => ({
  showWkModal: false,
  editWkId: null,
  wkForm: EMPTY_WORKOUT_FORM,
  setShowWkModal: (showWkModal) => set({ showWkModal }),
  setEditWkId: (editWkId) => set({ editWkId }),
  setWkForm: (wkForm) => set({ wkForm }),
  openAddWk: () => set({ editWkId: null, wkForm: EMPTY_WORKOUT_FORM, showWkModal: true }),
  openEditWk: (workout) => set({
    editWkId: workout.id,
    wkForm: {
      name: workout.name,
      level: workout.level as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
      days: Array.isArray(workout.days) ? workout.days.length : workout.days,
      exercises: workout.exercises,
      focus: workout.focus,
      duration: workout.duration,
      tags: workout.tags.join(', '),
    },
    showWkModal: true,
  }),
}));
