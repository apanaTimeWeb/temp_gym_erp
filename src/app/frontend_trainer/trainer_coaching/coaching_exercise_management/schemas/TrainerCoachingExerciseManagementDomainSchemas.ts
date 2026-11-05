import { z } from 'zod';

const TrainerWorkoutOptionalHttpUrlSchema = z.string().trim().optional().refine((value) => {
  if (!value) return true;
  try { const parsed = new URL(value); return parsed.protocol === 'http:' || parsed.protocol === 'https:'; } catch { return false; }
}, 'ERR_INVALID_MEDIA_URL');

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

export const TrainerWorkoutCreateExerciseSchema = TrainerWorkoutExerciseSchema.omit({ id: true, isActive: true }).extend({
  muscle: z.string().min(2, 'ERR_PRIMARY_MUSCLE_REQUIRED'),
});

export const TrainerWorkoutUpdateExerciseSchema = TrainerWorkoutCreateExerciseSchema.partial().strict();

export const TrainerWorkoutEMPTY_EXERCISE_FORM: z.input<typeof TrainerWorkoutCreateExerciseSchema> = { 
  name: '', 
  muscle: '', 
  equipment: 'Barbell', 
  difficulty: 'Beginner',
  instructions: '',
  videoUrl: ''
};
