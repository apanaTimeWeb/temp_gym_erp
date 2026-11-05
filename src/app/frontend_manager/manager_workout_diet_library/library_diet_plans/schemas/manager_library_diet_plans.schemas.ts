import { z } from 'zod';

/**
 * @description Provides the ManagerLibraryDietPlansSchema implementation for the library module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const dietMealSchema = z.object({
  time: z.string().optional(),
  name: z.string().optional(),
  calories: z.number().optional(),
  foods: z.array(z.string()).optional() });

export const dietPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  goal: z.string(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fats: z.number().optional(),
  description: z.string().optional(),
  meals: z.array(z.union([z.string(), dietMealSchema])),
  isActive: z.boolean() });

export const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  muscleGroup: z.array(z.string()).optional(),
  sets: z.number().optional(),
  reps: z.number().optional(),
  duration: z.number().optional(),
  difficulty: z.string(),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isActive: z.boolean() });
