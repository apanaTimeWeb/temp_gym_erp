import { z } from 'zod';

export const TrainerWorkoutWorkoutExerciseSchema = z.object({
  exerciseId: z.string().optional(),
  name: z.string().trim().min(1, 'ERR_NAME_REQUIRED'),
  sets: z.coerce.number().int().min(1),
  reps: z.union([z.string().trim().min(1, 'ERR_REPS_REQUIRED'), z.coerce.number().positive().transform(v => String(v))]),
  weight: z.string().optional().default(''),
  restTime: z.string().optional().default(''),
  sortOrder: z.coerce.number().default(0),
});

export const TrainerWorkoutWorkoutSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'ERR_NAME_REQUIRED'),
  level: z.string(),
  days: z.coerce.number().int().min(1, 'ERR_POSITIVE_NUMBER').max(7, 'ERR_MAX_DAYS_PER_WEEK'),
  exercises: z.coerce.number().min(0, 'ERR_POSITIVE_NUMBER'),
  focus: z.string().min(2, 'ERR_FOCUS_REQUIRED'),
  duration: z.string().min(2, 'ERR_DURATION_REQUIRED'),
  tags: z.array(z.string()).or(z.string().transform(s => s.split(',').map(t => t.trim()).filter(Boolean))),
  goal: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  instructions: z.string().optional(),
  assignedMemberId: z.string().optional(),
  workoutExercises: z.array(TrainerWorkoutWorkoutExerciseSchema).optional(),
  isActive: z.boolean().optional(),
});


const TrainerWorkoutOptionalHttpUrlSchema = z.string().trim().optional().refine((value) => {
  if (!value) return true;
  try { const parsed = new URL(value); return parsed.protocol === 'http:' || parsed.protocol === 'https:'; } catch { return false; }
}, 'ERR_INVALID_MEDIA_URL');

const isValidDateOnly = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year!, month! - 1, day!));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month! - 1 && date.getUTCDate() === day;
};

export const TrainerWorkoutExerciseSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'ERR_NAME_REQUIRED'),
  category: z.string().optional(),
  muscleGroup: z.array(z.string()).optional(),
  equipment: z.string().optional(),
  difficulty: z.string(),
  instructions: z.string().optional(),
  videoUrl: TrainerWorkoutOptionalHttpUrlSchema,
  imageUrl: TrainerWorkoutOptionalHttpUrlSchema,
  isActive: z.boolean(),
  sets: z.number().optional(),
  reps: z.string().optional(),
  duration: z.string().optional(),
  description: z.string().optional(),
});

export const TrainerWorkoutCreateWorkoutPlanSchema = TrainerWorkoutWorkoutSchema.omit({ id: true, isActive: true }).extend({
  tags: z.string().optional(), // DTO takes string for tags
  // A plan form calculates this from workoutExercises; existing plans may retain an aggregate count.
  exercises: z.coerce.number().int().min(0, 'ERR_POSITIVE_NUMBER'),
}).superRefine((data, context) => {
  const effectiveExerciseCount = data.workoutExercises === undefined ? data.exercises : data.workoutExercises.length;
  if (effectiveExerciseCount < 1) context.addIssue({ code: z.ZodIssueCode.custom, path: ['exercises'], message: 'ERR_POSITIVE_NUMBER' });
  if (data.startDate && !isValidDateOnly(data.startDate)) context.addIssue({ code: z.ZodIssueCode.custom, path: ['startDate'], message: 'ERR_INVALID_START_DATE' });
  if (data.endDate && !isValidDateOnly(data.endDate)) context.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'ERR_INVALID_END_DATE' });
  if (data.startDate && data.endDate && isValidDateOnly(data.startDate) && isValidDateOnly(data.endDate) && data.startDate > data.endDate) context.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'ERR_END_DATE_BEFORE_START' });
});

export const TrainerWorkoutCreateExerciseSchema = TrainerWorkoutExerciseSchema.omit({ id: true, isActive: true }).extend({
  muscle: z.string().min(2, 'ERR_PRIMARY_MUSCLE_REQUIRED'),
});

const TrainerWorkoutOptionalDateOnlySchema = z.string().optional().refine(
  (value) => value === undefined || value === '' || isValidDateOnly(value),
  'ERR_INVALID_DATE',
);

/** Only fields editable through PATCH are accepted; identity and server-owned fields are excluded. */
export const TrainerWorkoutUpdateWorkoutSchema = TrainerWorkoutWorkoutSchema.omit({ id: true, isActive: true }).partial().extend({
  tags: z.union([z.array(z.string()), z.string()]).optional(),
  startDate: TrainerWorkoutOptionalDateOnlySchema,
  endDate: TrainerWorkoutOptionalDateOnlySchema,
}).strict().superRefine((data, context) => {
  if (data.startDate && data.endDate && isValidDateOnly(data.startDate) && isValidDateOnly(data.endDate) && data.startDate > data.endDate) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['endDate'], message: 'ERR_END_DATE_BEFORE_START' });
  }
});
export const TrainerWorkoutUpdateExerciseSchema = TrainerWorkoutCreateExerciseSchema.partial().strict();


export const TrainerWorkoutEMPTY_WORKOUT_FORM: z.input<typeof TrainerWorkoutCreateWorkoutPlanSchema> = { 
  name: '', 
  level: 'Beginner', 
  days: 0, 
  exercises: 0, 
  focus: '', 
  duration: '', 
  tags: '',
  goal: '',
  startDate: '',
  endDate: '',
  instructions: '',
  assignedMemberId: '',
  workoutExercises: []
};

export const TrainerWorkoutEMPTY_EXERCISE_FORM: z.input<typeof TrainerWorkoutCreateExerciseSchema> = { 
  name: '', 
  muscle: '', 
  equipment: 'Barbell', 
  difficulty: 'Beginner',
  instructions: '',
  videoUrl: ''
};
