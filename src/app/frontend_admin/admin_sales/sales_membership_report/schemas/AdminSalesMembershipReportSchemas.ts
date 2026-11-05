// RESPONSIBILITY: Runtime response validation for the Sales membership-report endpoint only.
import { z } from 'zod';

export const membershipReportItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  totalMembers: z.number().int().nonnegative().optional(),
  activeMembers: z.number().int().nonnegative().optional(),
  revenue: z.number().int().nonnegative().optional(),
  plan: z.string().optional(),
  receivable: z.number().int().nonnegative().optional(),
  received: z.number().int().nonnegative().optional(),
  remaining: z.number().int().nonnegative().optional(),
  refund: z.number().int().nonnegative().optional(),
  referralSource: z.string().optional(),
  couponCode: z.string().optional(),
  renewalCount: z.number().int().nonnegative().optional(),
});

export const membershipTotalsSchema = z.object({
  activeCount: z.number().int().nonnegative().optional(),
  revenue: z.number().int().nonnegative().optional(),
  totalReceivable: z.number().int().nonnegative().optional(),
  totalReceived: z.number().int().nonnegative().optional(),
  remaining: z.number().int().nonnegative().optional(),
  refunds: z.number().int().nonnegative().optional(),
});
