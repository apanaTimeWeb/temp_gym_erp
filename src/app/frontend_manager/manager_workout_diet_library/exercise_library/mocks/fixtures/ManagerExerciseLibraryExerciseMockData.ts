import type { ExerciseSnapshot } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/types/manager_workout_plans_snapshot.types';

/** Deterministic synthetic exercise catalogue; deliberately exceeds the ten-row page size. */
export const MOCK_MANAGER_WORKOUT_EXERCISES: ExerciseSnapshot[] = [
  { id: 'ex1', name: 'Bench Press', muscleGroup: ['Chest'], difficulty: 'INTERMEDIATE', equipment: 'Barbell' },
  { id: 'ex2', name: 'Squat', muscleGroup: ['Legs'], difficulty: 'ADVANCED', equipment: 'Barbell' },
  { id: 'ex3', name: 'Push Up', muscleGroup: ['Chest', 'Arms'], difficulty: 'BEGINNER', equipment: 'Bodyweight' },
  { id: 'ex4', name: 'Dumbbell Row', muscleGroup: ['Back'], difficulty: 'INTERMEDIATE', equipment: 'Dumbbell' },
  { id: 'ex5', name: 'Lat Pulldown', muscleGroup: ['Back'], difficulty: 'BEGINNER', equipment: 'Machine' },
  { id: 'ex6', name: 'Overhead Press', muscleGroup: ['Shoulders'], difficulty: 'ADVANCED', equipment: 'Barbell' },
  { id: 'ex7', name: 'Goblet Squat', muscleGroup: ['Legs'], difficulty: 'BEGINNER', equipment: 'Kettlebell' },
  { id: 'ex8', name: 'Cable Fly', muscleGroup: ['Chest'], difficulty: 'INTERMEDIATE', equipment: 'Cables' },
  { id: 'ex9', name: 'Dumbbell Curl', muscleGroup: ['Arms'], difficulty: 'BEGINNER', equipment: 'Dumbbell' },
  { id: 'ex10', name: 'Romanian Deadlift', muscleGroup: ['Hamstrings'], difficulty: 'ADVANCED', equipment: 'Barbell' },
  { id: 'ex11', name: 'Leg Press', muscleGroup: ['Legs'], difficulty: 'INTERMEDIATE', equipment: 'Machine' },
  { id: 'ex12', name: 'Kettlebell Swing', muscleGroup: ['Glutes'], difficulty: 'ADVANCED', equipment: 'Kettlebell' },
];
