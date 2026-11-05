import type { TrainerWorkoutExercise } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementTypes';
/** Exact exercise rows copied from the supplied TrainerWorkoutMockData.ts (no speculative fixtures). */
export const TRAINER_EXERCISE_MOCK_FIXTURE: TrainerWorkoutExercise[] = [
  { id: 'ex-1', name: 'Leg Press', category: 'Strength', muscleGroup: ['Quadriceps', 'Glutes'], equipment: 'Machine', difficulty: 'Beginner', isActive: true },
  { id: 'ex-2', name: 'Chest Press Machine', category: 'Strength', muscleGroup: ['Chest', 'Triceps'], equipment: 'Machine', difficulty: 'Beginner', isActive: true },
  { id: 'ex-3', name: 'Lat Pulldown', category: 'Strength', muscleGroup: ['Back', 'Biceps'], equipment: 'Machine', difficulty: 'Beginner', isActive: true },
  { id: 'ex-4', name: 'Barbell Bench Press', category: 'Strength', muscleGroup: ['Chest', 'Triceps', 'Shoulders'], equipment: 'Barbell', difficulty: 'Intermediate', isActive: true },
  { id: 'ex-5', name: 'Overhead Press', category: 'Strength', muscleGroup: ['Shoulders', 'Triceps'], equipment: 'Barbell', difficulty: 'Intermediate', isActive: true },
  { id: 'ex-6', name: 'Plank', category: 'Core', muscleGroup: ['Core'], equipment: 'Bodyweight', difficulty: 'All Levels', isActive: true },
];
