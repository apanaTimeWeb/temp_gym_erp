import { z } from 'zod';

/**
 * @description Builds the canonical Superadmin API envelope schema around a feature data schema.
 * @dependencies Uses Zod only; the transport layer supplies the parsed envelope to feature code.
 * @edge-case Success always carries requestId; failures carry null data and required traceable diagnostics.
 */
export function SuperadminSystemOpsBackupsApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.discriminatedUnion('success', [
    z.object({
      success: z.literal(true),
      message: z.string(),
      data: dataSchema,
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
}
