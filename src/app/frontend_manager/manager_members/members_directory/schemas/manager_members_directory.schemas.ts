import { z } from 'zod';

import { MANAGER_MEMBERS_DIRECTORY_PAYMENT_STATUS_OPTION_VALUES, MANAGER_MEMBERS_DIRECTORY_ATTENDANCE_TYPE_VALUES, MANAGER_MEMBERS_DIRECTORY_DIET_PLAN_TYPE_VALUES, MANAGER_MEMBERS_DIRECTORY_WORKOUT_LEVEL_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { memberSchema, memberStatsSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_entity.schemas';



/**
 * @description Provides the ManagerMembersDirectorySchema implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersDirectoryEntitySchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const planSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  price1Month: z.number().int().nonnegative(),
  price3Month: z.number().int().nonnegative(),
  price6Month: z.number().int().nonnegative(),
  price12Month: z.number().int().nonnegative(),
  priceCustom: z.number().int().nonnegative().optional() });

export const paymentSnapshotSchema = z.object({
  id: z.string(),
  amount: z.number().int().nonnegative(),
  paidAt: z.string(),
  method: z.string(),
  status: z.enum(MANAGER_MEMBERS_DIRECTORY_PAYMENT_STATUS_OPTION_VALUES),
  invoiceNumber: z.string() });

export const attendanceSnapshotSchema = z.object({
  id: z.string(),
  date: z.string(),
  checkIn: z.string(),
  type: z.enum(MANAGER_MEMBERS_DIRECTORY_ATTENDANCE_TYPE_VALUES) });

export const dietPlanSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(MANAGER_MEMBERS_DIRECTORY_DIET_PLAN_TYPE_VALUES),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fats: z.number(),
  meals: z.array(z.object({
    name: z.string(),
    time: z.string(),
    calories: z.number(),
    foods: z.array(z.string()) })) });

export const workoutSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.enum(MANAGER_MEMBERS_DIRECTORY_WORKOUT_LEVEL_VALUES),
  daysPerWeek: z.number(),
  goal: z.string(),
  days: z.array(z.object({
    day: z.union([z.number(), z.string()]),
    focus: z.string(),
    exercises: z.array(z.object({
      name: z.string(),
      sets: z.number(),
      reps: z.number(),
      notes: z.string().optional() })) })) });

export const populatedMemberSchema = memberSchema.extend({
  plan: planSnapshotSchema.optional(),
  recentPayments: z.array(paymentSnapshotSchema).optional(),
  dietPlan: dietPlanSnapshotSchema.optional(),
  workoutPlan: workoutSnapshotSchema.optional(),
  assignedDiet: dietPlanSnapshotSchema.optional(),
  assignedWorkout: workoutSnapshotSchema.optional() });

export { memberStatsSchema };

export const memberDeleteResponseSchema = z.object({ id: z.string() });
export const trainerListSchema = z.object({ staff: z.array(z.object({ id: z.string(), name: z.string(), role: z.string() })) });
