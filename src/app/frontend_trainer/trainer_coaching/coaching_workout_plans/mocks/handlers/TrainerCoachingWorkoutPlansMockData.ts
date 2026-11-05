import type { TrainerWorkoutWorkout, TrainerWorkoutExercise } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';

export const TRAINER_WORKOUT_MOCK_WORKOUTS: TrainerWorkoutWorkout[] = [
  {
    id: 'wk-1',
    name: 'Full Body Fundamentals',
    level: 'Beginner',
    days: 3,
    exercises: 3,
    focus: 'General Fitness',
    duration: '45 mins',
    tags: ['Full Body', 'Beginner', 'Machines'],
    goal: 'Build basic strength and familiarity with gym equipment.',
    isActive: true,
    workoutExercises: [
      { exerciseId: 'ex-1', name: 'Leg Press', sets: 3, reps: '10-12', weight: '', restTime: '60s', sortOrder: 0 },
      { exerciseId: 'ex-2', name: 'Chest Press Machine', sets: 3, reps: '10-12', weight: '', restTime: '60s', sortOrder: 1 },
      { exerciseId: 'ex-3', name: 'Lat Pulldown', sets: 3, reps: '10-12', weight: '', restTime: '60s', sortOrder: 2 },
    ]
  },
  {
    id: 'wk-2',
    name: 'Upper Body Power',
    level: 'Intermediate',
    days: 2,
    exercises: 2,
    focus: 'Strength',
    duration: '60 mins',
    tags: ['Upper Body', 'Strength', 'Free Weights'],
    isActive: true,
    workoutExercises: [
      { exerciseId: 'ex-4', name: 'Barbell Bench Press', sets: 4, reps: '5-8', weight: '', restTime: '90s', sortOrder: 0 },
      { exerciseId: 'ex-5', name: 'Overhead Press', sets: 3, reps: '8-10', weight: '', restTime: '90s', sortOrder: 1 },
    ]
  },
  {
    id: 'wk-3',
    name: 'Core & Cardio Blast',
    level: 'All Levels',
    days: 2,
    exercises: 0,
    focus: 'Cardio',
    duration: '30 mins',
    tags: ['Core', 'HIIT', 'Bodyweight'],
    isActive: true,
    workoutExercises: []
  },
];

export const TRAINER_WORKOUT_MOCK_EXERCISES: TrainerWorkoutExercise[] = [
  { id: 'ex-1', name: 'Leg Press', category: 'Strength', muscleGroup: ['Quadriceps', 'Glutes'], equipment: 'Machine', difficulty: 'Beginner', isActive: true },
  { id: 'ex-2', name: 'Chest Press Machine', category: 'Strength', muscleGroup: ['Chest', 'Triceps'], equipment: 'Machine', difficulty: 'Beginner', isActive: true },
  { id: 'ex-3', name: 'Lat Pulldown', category: 'Strength', muscleGroup: ['Back', 'Biceps'], equipment: 'Machine', difficulty: 'Beginner', isActive: true },
  { id: 'ex-4', name: 'Barbell Bench Press', category: 'Strength', muscleGroup: ['Chest', 'Triceps', 'Shoulders'], equipment: 'Barbell', difficulty: 'Intermediate', isActive: true },
  { id: 'ex-5', name: 'Overhead Press', category: 'Strength', muscleGroup: ['Shoulders', 'Triceps'], equipment: 'Barbell', difficulty: 'Intermediate', isActive: true },
  { id: 'ex-6', name: 'Plank', category: 'Core', muscleGroup: ['Core'], equipment: 'Bodyweight', difficulty: 'All Levels', isActive: true },
];
