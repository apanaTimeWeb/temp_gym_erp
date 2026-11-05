import { z } from 'zod';

/**
 * @description Provides the ManagerMembershipLifecycleSchema implementation for the plans module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.string(),
  price1Month: z.number().int().nonnegative(),
  price3Month: z.number().int().nonnegative(),
  price6Month: z.number().int().nonnegative(),
  price12Month: z.number().int().nonnegative(),
  features: z.array(z.string()),
  isActive: z.boolean() });

export const plansResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(planSchema).nullable(),
  meta: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number() }).optional() });

export const planResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: planSchema.nullable() });
