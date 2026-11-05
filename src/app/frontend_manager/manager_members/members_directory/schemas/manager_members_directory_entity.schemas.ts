// RESPONSIBILITY: Defines the Zod runtime schemas for Manager member API entities and statistics.
import { z } from 'zod';

import { MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';

/**
 * @description Provides the ManagerMembersDirectoryEntitySchema implementation for the members module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const memberEmergencyContactSchema = z.object({ name: z.string(), phone: z.string() });
export const memberSchema = z.object({
  id: z.string(), name: z.string(), email: z.string(), phone: z.string(), gender: z.string(), address: z.string().optional(), aadhaar: z.string().optional(), branch: z.string(), planId: z.string(),
  plan: z.object({ id: z.string(), name: z.string(), price1Month: z.number().nonnegative(), price3Month: z.number().nonnegative(), price6Month: z.number().nonnegative(), price12Month: z.number().nonnegative(), priceCustom: z.number().nonnegative().optional() }).optional(), billingCycle: z.string(), status: z.enum(MANAGER_MEMBERS_DIRECTORY_STATUS_OPTION_VALUES), joinDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => !Number.isNaN(Date.parse(value)))), expiryDate: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => !Number.isNaN(Date.parse(value)))),
  paidAmount: z.number().int().nonnegative(), pendingAmount: z.number().int().nonnegative(), advanceAmount: z.number().int().nonnegative().optional(), photo: z.string().optional(), createdAt: z.string().datetime({ offset: true }), dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => !Number.isNaN(Date.parse(value))).optional(), acquisitionSource: z.string().optional(),
  assignedDietId: z.string().optional(), assignedDiet: z.unknown().optional(), assignedWorkoutId: z.string().optional(), assignedWorkout: z.unknown().optional(), medicalHistory: z.string().optional(), assignedTrainerId: z.string().optional(),
  assignedTrainerName: z.string().optional(), isPT: z.boolean().optional(), freezeUntil: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => !Number.isNaN(Date.parse(value))).optional(), emergencyContact: memberEmergencyContactSchema.optional(), referralCode: z.string().optional(), bloodGroup: z.string().optional(), membershipNumber: z.string().optional(),
});
export const memberStatsSchema = z.object({ total: z.number().int().nonnegative(), active: z.number().int().nonnegative(), pending: z.number().int().nonnegative(), expired: z.number().int().nonnegative() });
export type MemberEntity = z.infer<typeof memberSchema>;
export type MemberStatsEntity = z.infer<typeof memberStatsSchema>;
