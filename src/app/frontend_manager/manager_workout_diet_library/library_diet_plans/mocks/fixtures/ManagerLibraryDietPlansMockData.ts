import type { Exercise } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/types/manager_library_diet_plans.types';

/**
 * @description Provides the ManagerLibraryDietPlansMockData implementation for the library module.
 * @dependencies @/app/frontend_manager/manager_workout_diet_library/manager_library_types/ManagerLibraryDietPlansTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_MANAGER_EXERCISES: Exercise[] = [
  {
    id: 'ex-201',
    name: 'Bench Press',
    muscleGroup: ['Chest', 'Triceps', 'Shoulders'],
    category: 'Barbell',
    difficulty: 'INTERMEDIATE',
    isActive: true
  },
  {
    id: 'ex-202',
    name: 'Squat',
    muscleGroup: ['Quadriceps', 'Hamstrings', 'Glutes'],
    category: 'Barbell',
    difficulty: 'INTERMEDIATE',
    isActive: true
  },
  {
    id: 'ex-203',
    name: 'Push-up',
    muscleGroup: ['Chest', 'Triceps', 'Core'],
    category: 'Bodyweight',
    difficulty: 'BEGINNER',
    isActive: true
  },
  {
    id: 'ex-204',
    name: 'Pull-up',
    muscleGroup: ['Back', 'Biceps'],
    category: 'Bodyweight',
    difficulty: 'ADVANCED',
    isActive: true
  },
  {
    id: 'ex-205',
    name: 'Dumbbell Curl',
    muscleGroup: ['Biceps'],
    category: 'Dumbbells',
    difficulty: 'BEGINNER',
    isActive: true
  }
];
