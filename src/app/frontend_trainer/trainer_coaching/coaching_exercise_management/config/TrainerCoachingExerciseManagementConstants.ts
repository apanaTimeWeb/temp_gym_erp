// RESPONSIBILITY: Centralized static UI configuration for Trainer TrainerWorkoutWorkout. Domain values are stable identifiers; labels are localized at render time.
export const TRAINER_WORKOUT_WORKOUT_LEVEL_OPTIONS = [
  { value: 'Beginner', labelKey: 'TEXT_BEGINNER' },
  { value: 'Intermediate', labelKey: 'TEXT_INTERMEDIATE' },
  { value: 'Advanced', labelKey: 'TEXT_ADVANCED' },
  { value: 'All Levels', labelKey: 'TEXT_ALL_LEVELS' },
] as const;
export const TRAINER_WORKOUT_EXERCISE_DIFFICULTY_OPTIONS = TRAINER_WORKOUT_WORKOUT_LEVEL_OPTIONS.slice(0,3);
export const TRAINER_WORKOUT_EQUIPMENT_OPTIONS = [
  { value: 'Barbell', labelKey: 'TEXT_BARBELL' }, { value: 'Dumbbell', labelKey: 'TEXT_DUMBBELL' },
  { value: 'Machine', labelKey: 'TEXT_MACHINE' }, { value: 'Bodyweight', labelKey: 'TEXT_BODYWEIGHT' },
  { value: 'Cables', labelKey: 'TEXT_CABLES' }, { value: 'Kettlebell', labelKey: 'TEXT_KETTLEBELL' },
] as const;
export const TRAINER_WORKOUT_WORKOUT_FOCUS_OPTIONS = ['Hypertrophy','Strength','Bodybuilding','Cardio','Bodyweight'] as const;
export const TRAINER_WORKOUT_EXERCISE_MUSCLE_OPTIONS = ['Quadriceps','Chest','Back','Shoulders','Hamstrings','Posterior Chain','Arms','Core'] as const;
export const TRAINER_WORKOUT_CATEGORY_OPTIONS = {
  WORKOUT: [
    { value: 'All', labelKey: 'TEXT_ALL_CATEGORIES' },
    { value: 'Strength', labelKey: 'TEXT_STRENGTH' },
    { value: 'Cardio', labelKey: 'TEXT_CARDIO' },
    { value: 'Flexibility', labelKey: 'TEXT_FLEXIBILITY' },
  ],
  EXERCISE: [
    { value: 'All', labelKey: 'TEXT_ALL_CATEGORIES' },
    { value: 'Strength', labelKey: 'TEXT_STRENGTH' },
    { value: 'Cardio', labelKey: 'TEXT_CARDIO' },
    { value: 'Mobility', labelKey: 'TEXT_MOBILITY' },
  ],
} as const;
export const TRAINER_WORKOUT_WORKOUT_TAB_OPTIONS = [
  { value: 'plans', labelKey: 'TEXT_WORKOUT_PLANS' },
  { value: 'exercises', labelKey: 'TEXT_EXERCISE_LIBRARY' },
] as const;
export const TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS = [
  { value: 'TrainerWorkoutExercise', labelKey: 'TEXT_EXERCISE' }, { value: 'Primary Muscle', labelKey: 'TEXT_PRIMARY_MUSCLE' },
  { value: 'Equipment', labelKey: 'TEXT_EQUIPMENT' }, { value: 'Difficulty', labelKey: 'TEXT_DIFFICULTY' },
  { value: 'Actions', labelKey: 'TEXT_ACTIONS' },
] as const;
export const TRAINER_WORKOUT_DIFFICULTY_STYLES = { Beginner:'bg-success-bg text-success', Intermediate:'bg-warning-bg text-warning', Advanced:'bg-danger-bg text-danger' } as const;
