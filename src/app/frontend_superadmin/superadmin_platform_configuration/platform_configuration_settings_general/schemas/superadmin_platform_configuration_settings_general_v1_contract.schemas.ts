/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminPlatformConfigurationSettingsV1DataSchema = z.object({ billing: z.array(z.object({ label: z.string(), value: z.string() })), security: z.array(z.object({ label: z.string(), value: z.string() })), data: z.array(z.object({ label: z.string(), value: z.string() })), communication: z.array(z.object({ label: z.string(), value: z.string() })) });

/** Canonical discriminated API envelope. The host transport may validate the payload schema separately. */
export const SuperadminPlatformConfigurationSettingsV1ResponseSchema = z.discriminatedUnion('success', [
  z.object({
    success: z.literal(true),
    message: z.string(),
    requestId: z.string().min(1),
    data: SuperadminPlatformConfigurationSettingsV1DataSchema,
  }).passthrough(),
  z.object({
    success: z.literal(false),
    message: z.string(),
    requestId: z.string().min(1),
    errorCode: z.string().min(1),
    statusCode: z.number().int().min(400).max(599),
    data: z.null().optional(),
    error: z.string().optional(),
    validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional(),
  }).passthrough(),
]);
