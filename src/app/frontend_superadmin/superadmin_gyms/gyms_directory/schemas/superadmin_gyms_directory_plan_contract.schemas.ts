/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminGymsPlanOptionSchema = z.object({
    id: z.string(),
    name: z.string(),
    priceMonthly: z.number(),
    currency: z.string(),
});
