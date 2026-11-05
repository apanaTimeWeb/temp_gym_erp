import type { Workout } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/types/manager_workout_diet_library_assigned_workout_plans.types';
import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/types/manager_workout_plans_snapshot.types';

/**
 * @description Provides the ManagerAssignedWorkoutPlansMockData implementation for the workout module.
 * @dependencies @/app/frontend_manager/manager_workout/manager_workout_types/ManagerWorkoutPlansTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_MANAGER_WORKOUT_PLANSS: Workout[] = [
  {
    id: 'wk-101',
    name: 'Beginner Full Body',
    level: 'BEGINNER',
    days: 3,
    exercises: 8,
    focus: 'General Fitness',
    duration: '45 min',
    tags: ['Full Body', 'No Equipment', 'Weight Loss']
  },
  {
    id: 'wk-102',
    name: 'Advanced Hypertrophy',
    level: 'ADVANCED',
    days: 5,
    exercises: 12,
    focus: 'Muscle Gain',
    duration: '90 min',
    tags: ['Hypertrophy', 'Free Weights', 'Dumbbells']
  },
  {
    id: 'wk-103',
    name: 'Intermediate Upper/Lower Split',
    level: 'INTERMEDIATE',
    days: 4,
    exercises: 10,
    focus: 'Strength',
    duration: '60 min',
    tags: ['Upper/Lower', 'Barbell', 'Strength']
  },
  {
    id: 'wk-104',
    name: 'Cardio Blast',
    level: 'ALL',
    days: 2,
    exercises: 6,
    focus: 'Endurance',
    duration: '30 min',
    tags: ['HIIT', 'Cardio', 'Stamina']
  },
  {
    id: 'wk-105',
    name: 'Core Strengthening',
    level: 'BEGINNER',
    days: 2,
    exercises: 5,
    focus: 'Core',
    duration: '20 min',
    tags: ['Abs', 'Core', 'Stability']
  }
];

/** Assignment-leaf-owned read-only exercise reference fixtures. */
export const MOCK_MANAGER_ASSIGNED_EXERCISES: ExerciseSnapshot[] = [
  { id: 'assigned-ex-1', name: 'Bench Press', muscleGroup: ['Chest'], difficulty: 'INTERMEDIATE', equipment: 'Barbell' },
  { id: 'assigned-ex-2', name: 'Squat', muscleGroup: ['Legs'], difficulty: 'ADVANCED', equipment: 'Barbell' },
  { id: 'assigned-ex-3', name: 'Push Up', muscleGroup: ['Chest', 'Arms'], difficulty: 'BEGINNER', equipment: 'Bodyweight' },
];
