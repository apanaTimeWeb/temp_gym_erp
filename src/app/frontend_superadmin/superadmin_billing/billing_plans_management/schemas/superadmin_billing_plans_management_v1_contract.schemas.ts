/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminBillingPlansV1DataSchema = z.object({ plans: z.array(z.object({ name: z.string(), monthly: z.number(), currency: z.string().optional(), members: z.number(), storage: z.number(), branches: z.number() })), versions: z.array(z.object({ plan: z.string(), version: z.string(), effective: z.string(), monthly: z.number(), currency: z.string().optional(), change: z.string() })), addons: z.array(z.object({ name: z.string(), price: z.number(), currency: z.string().optional() })), migration: z.object({ from: z.string(), to: z.string(), tenants: z.number(), monthlyChange: z.number(), currency: z.string().optional(), limitConflicts: z.number() }) });
export const SuperadminBillingPlansV1ResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: SuperadminBillingPlansV1DataSchema,
    requestId: z.string().min(1),
  }).passthrough(),
  z.object({
    success: z.literal(false),
    message: z.string(),
    data: z.null(),
    error: z.string().optional(),
    errorCode: z.string().min(1),
    statusCode: z.number().int().min(100).max(599),
    requestId: z.string().min(1),
    validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
  }).passthrough(),
]);
