import { z } from 'zod';

/**
 * @description Validates the canonical ApiResponse envelope for this feature.
 * @dependencies Zod and the feature-owned data schema supplied by the caller.
 * @edge-case Success always carries data and requestId; failures always carry null data and traceable diagnostics.
 */
export function SuperadminSystemOpsJobsApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
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
