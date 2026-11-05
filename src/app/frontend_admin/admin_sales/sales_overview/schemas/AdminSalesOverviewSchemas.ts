// RESPONSIBILITY: Runtime schemas for the two Sales Overview response payloads.
import { z } from 'zod';
export const overviewDataPointSchema = z.object({ date: z.string(), revenue: z.number().int().nonnegative(), newMembers: z.number().int().nonnegative() });
export const referralDataPointSchema = z.object({ source: z.string(), revenue: z.number().int().nonnegative() });
