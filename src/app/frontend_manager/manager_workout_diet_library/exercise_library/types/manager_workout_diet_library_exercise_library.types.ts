import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';

export type Exercise = ExerciseSnapshot;

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: number | string;
}

export interface WorkoutDay {
  day: number;
  focus: string;
  isRest: boolean;
  exercises?: WorkoutExercise[];
}

/** Workout reference shape retained for the existing local UI store. */
export interface Workout {
  id: string;
  name: string;
  level: string;
  days: number | WorkoutDay[];
  exercises: number;
  focus: string;
  duration: string;
  tags: string[];
  isActive?: boolean;
}

export type ManagerWorkoutPlansViewId = 'view-workout-plans' | 'view-assigned-plans' | 'exercise-library';
