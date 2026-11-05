/** Workout-plan entity shape owned by the Workout Plan Management leaf. */
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
