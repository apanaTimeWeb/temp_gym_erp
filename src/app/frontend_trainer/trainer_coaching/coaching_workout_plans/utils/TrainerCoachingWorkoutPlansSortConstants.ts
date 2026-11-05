// RESPONSIBILITY: Defines server-side sort fields for Trainer TrainerWorkoutWorkout browseable datasets.
export const TRAINER_WORKOUT_SORT_FIELDS = {
  NAME: 'name',
  CATEGORY: 'category',
  DIFFICULTY: 'difficulty',
} as const;
export const TRAINER_WORKOUT_SORT_DIRECTIONS = { ASC: 'asc', DESC: 'desc' } as const;
