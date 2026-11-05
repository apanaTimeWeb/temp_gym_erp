import { z } from 'zod';

/**
 * @description Provides the ManagerLibraryDietPlansExerciseFormSchema implementation for the library module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerLibraryExerciseFormSchema = z.object({
  name: z.string().trim().min(2, 'Exercise name is required'),
  category: z.string().trim().min(2, 'Category is required'),
  muscleGroup: z.string().trim(),
  sets: z.number().min(0).max(100).optional(),
  reps: z.number().min(0).max(1000).optional(),
  duration: z.number().min(0).max(1440).optional(),
  difficulty: z.string().min(1, 'Difficulty is required'),
  description: z.string().trim().max(1000),
  videoUrl: z.string().trim().url('Enter a valid URL').or(z.literal('')),
  isActive: z.boolean(),
});

export type ManagerLibraryDietPlansExerciseFormSchemaValues = z.infer<typeof managerLibraryExerciseFormSchema>;
