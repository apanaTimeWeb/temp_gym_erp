// RESPONSIBILITY: Runtime-validate only the response contract owned by this business report leaf.
import { z } from 'zod';
export const reportDateRangeSchema = z.union([z.literal('this_month'), z.literal('last_month'), z.literal('last_3_months'), z.literal('last_6_months'), z.literal('this_year'), z.literal('custom')]);
export const membershipGrowthRowSchema = z.object({
    gymId: z.string(),
    gymName: z.string(),
    newMembers: z.number().int().nonnegative(),
    renewals: z.number().int().nonnegative(),
    exits: z.number().int().nonnegative(),
    netGrowth: z.number().int(),
    activeMembers: z.number().int().nonnegative()
});
export const reportMembershipDataSchema = z.object({
  membershipGrowth: z.array(membershipGrowthRowSchema),
});
