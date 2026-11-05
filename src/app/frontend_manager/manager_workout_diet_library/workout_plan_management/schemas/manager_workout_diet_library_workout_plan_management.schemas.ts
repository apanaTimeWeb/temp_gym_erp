import { z } from 'zod';

/**
 * @description Provides the ManagerWorkoutPlansSchema implementation for the workout module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const exerciseSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  muscleGroup: z.array(z.string()),
  equipment: z.string(),
  difficulty: z.string(),
  category: z.string().optional() });

export const workoutExerciseSchema = z.object({
  name: z.string(),
  sets: z.number(),
  reps: z.union([z.number(), z.string()]) });

export const workoutDaySchema = z.object({
  day: z.number(),
  focus: z.string(),
  isRest: z.boolean(),
  exercises: z.array(workoutExerciseSchema).optional() });

export const workoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.string(),
  days: z.union([z.number(), z.array(workoutDaySchema)]),
  exercises: z.number(),
  focus: z.string(),
  duration: z.string(),
  tags: z.array(z.string()),
  isActive: z.boolean().optional() });
