import { z } from 'zod';

const isValidCalendarDate = (value: string): boolean => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, y, m, d] = match; const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return date.getUTCFullYear() === Number(y) && date.getUTCMonth() + 1 === Number(m) && date.getUTCDate() === Number(d);
};
/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */

export const RevenueRowSchema = z.object({
    month: z.string(),
    mrr: z.number().int(),
    newRevenue: z.number().int(),
    cancelledRevenue: z.number().int(),
    netRevenue: z.number().int(),
    tenantCount: z.number()
});
export const CancellationsRecordSchema = z.object({
    id: z.string(),
    gymName: z.string(),
    ownerName: z.string(),
    plan: z.string(),
    cancelledAt: z.string(),
    reason: z.string(),
    mrr: z.number().int(),
    daysActive: z.number().int().nonnegative()
});
export const TenantHealthScoreSchema = z.object({
    id: z.string(),
    gymName: z.string(),
    plan: z.string(),
    score: z.number().min(0).max(100),
    grade: z.enum(['A', 'B', 'C', 'D', 'F']),
    memberCount: z.number().int().nonnegative(),
    lastLogin: z.string(),
    paymentHealth: z.enum(['GOOD', 'AT_RISK', 'OVERDUE']),
    featureUsage: z.number().min(0).max(100),
    supportTickets: z.number().int().nonnegative()
});
