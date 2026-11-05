/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminGymsV1FilterSchema = z.object({ key: z.string(), label: z.string() });
export const SuperadminGymsV1SavedViewSchema = z.object({ key: z.string(), label: z.string() });
export const SuperadminGymsV1BulkActionSchema = z.enum(['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected']);
export const SuperadminGymsV1RowSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  region: z.string(),
  plan: z.string(),
  income: z.number(),
  health: z.number(),
  usage: z.number(),
  trialDays: z.number(),
  paymentRecoveryOpen: z.boolean(),
  lastAction: z.string().nullable(),
});

export const SuperadminGymsV1DataSchema = z.object({
  currency: z.string(),
  segments: z.array(z.object({ name: z.string(), count: z.number(), rule: z.string() })),
  filters: z.array(SuperadminGymsV1FilterSchema),
  bulk: z.array(SuperadminGymsV1BulkActionSchema),
  saved: z.array(SuperadminGymsV1SavedViewSchema),
  rows: z.array(SuperadminGymsV1RowSchema),
});
export const SuperadminGymsV1BulkMutationRequestSchema = z.object({
  action: SuperadminGymsV1BulkActionSchema,
  gymIds: z.array(z.string()).min(1),
  targetPlan: z.string().optional(),
});
export const SuperadminGymsV1ResponseSchema = z.discriminatedUnion('success', [
  z.object({ success: z.literal(true), message: z.string(), data: SuperadminGymsV1DataSchema, requestId: z.string().min(1) }),
  z.object({ success: z.literal(false), message: z.string(), data: z.null(), error: z.string().optional(), errorCode: z.string().min(1), statusCode: z.number().int().min(100).max(599), requestId: z.string().min(1), validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional() }),
]);
