/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SubscriptionPlanSchema = z.object({
    id: z.string(),
    name: z.string(),
    priceMonthly: z.number().int().nonnegative(),
    priceAnnual: z.number().int().nonnegative(),
    maxMembers: z.number().int().positive(),
    maxStaff: z.number().int().positive(),
    dbLimitGb: z.number().optional(),
    binaryLimitGb: z.number().optional(),
    features: z.array(z.string()),
    activeTenants: z.number(),
    isPublic: z.boolean(),
    trialDays: z.number(),
    setupFee: z.number().int().nonnegative(),
    currency: z.string().regex(/^[A-Z]{3}$/, 'validation.currency_invalid'),
    isArchived: z.boolean().optional(),
});
