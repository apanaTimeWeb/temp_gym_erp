export const TRAINER_WORKOUT_LEVEL_OPTIONS = [
  { labelKey: 'TEXT_BEGINNER', value: 'Beginner' },
  { labelKey: 'TEXT_INTERMEDIATE', value: 'Intermediate' },
  { labelKey: 'TEXT_ADVANCED', value: 'Advanced' },
] as const;

export const TRAINER_WORKOUT_DEFAULT_EXERCISE = {
  name: '',
  sets: 3,
  reps: '10',
  weight: '',
  restTime: '60s',
} as const;
