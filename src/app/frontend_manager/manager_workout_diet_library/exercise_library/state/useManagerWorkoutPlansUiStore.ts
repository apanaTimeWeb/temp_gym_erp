// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import { EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans_form_defaults.constants';
import type { WorkoutFormValues, ExerciseFormValues } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_form.types';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';
import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_diet_library_exercise_library.types';


interface ManagerWorkoutPlansUiState {
  showWkModal: boolean;
  editWkId: string | null;
  wkForm: WorkoutFormValues;
  showExModal: boolean;
  editExId: string | null;
  exForm: ExerciseFormValues;
  setShowWkModal: (value: boolean) => void;
  setEditWkId: (value: string | null) => void;
  setWkForm: (value: WorkoutFormValues) => void;
  setShowExModal: (value: boolean) => void;
  setEditExId: (value: string | null) => void;
  setExForm: (value: ExerciseFormValues) => void;
  openAddWk: () => void;
  openEditWk: (workout: Workout) => void;
  openAddEx: () => void;
  openEditEx: (exercise: ExerciseSnapshot) => void;
}

/**
 * @description Coordinates workout feature state and its documented UI/API boundary through useManagerWorkoutPlansUiStore.
 * @dependencies Uses ManagerWorkoutPlansFormTypes, ManagerWorkoutPlansSnapshotTypes, ManagerWorkoutPlansTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerWorkoutPlansUiStore = create<ManagerWorkoutPlansUiState>((set) => ({
  showWkModal: false,
  editWkId: null,
  wkForm: EMPTY_WORKOUT_FORM,
  showExModal: false,
  editExId: null,
  exForm: EMPTY_EXERCISE_FORM,
  setShowWkModal: (showWkModal) => set({ showWkModal }),
  setEditWkId: (editWkId) => set({ editWkId }),
  setWkForm: (wkForm) => set({ wkForm }),
  setShowExModal: (showExModal) => set({ showExModal }),
  setEditExId: (editExId) => set({ editExId }),
  setExForm: (exForm) => set({ exForm }),
  openAddWk: () => set({ editWkId: null, wkForm: EMPTY_WORKOUT_FORM, showWkModal: true }),
  openEditWk: (workout) => set({
    editWkId: workout.id,
    wkForm: {
      name: workout.name,
      level: workout.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      days: Array.isArray(workout.days) ? workout.days.length : workout.days,
      exercises: workout.exercises,
      focus: workout.focus,
      duration: workout.duration,
      tags: workout.tags.join(', ') },
    showWkModal: true }),
  openAddEx: () => set({ editExId: null, exForm: EMPTY_EXERCISE_FORM, showExModal: true }),
  openEditEx: (exercise) => set({
    editExId: exercise.id,
    exForm: {
      name: exercise.name,
      muscle: Array.isArray(exercise.muscleGroup) ? exercise.muscleGroup.join(', ') : (exercise.muscleGroup || ''),
      equipment: exercise.equipment || '',
      difficulty: exercise.difficulty as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" },
    showExModal: true }) }));
