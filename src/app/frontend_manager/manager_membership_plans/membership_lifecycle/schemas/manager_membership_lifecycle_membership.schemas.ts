import { z } from 'zod';

/**
 * @description Provides the ManagerMembershipLifecycleMembershipSchema implementation for the plans module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerPlansMemberOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  status: z.string(),
  planName: z.string(),
  planId: z.string(),
  expiryDate: z.string() });

export const managerPlansMembershipOverviewSchema = z.object({
  memberOptions: z.array(managerPlansMemberOptionSchema),
  renewalCandidates: z.array(managerPlansMemberOptionSchema) });

export const managerPlansActionResponseSchema = z.object({});
