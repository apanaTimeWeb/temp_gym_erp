import { z } from 'zod';

/**
 * @description Builds the canonical Superadmin API envelope schema around a feature data schema.
 * @dependencies Uses Zod only; the transport layer supplies the parsed envelope to feature code.
 * @edge-case Supports nullable mutation payloads while preserving the required success/message envelope.
 */
export function SuperadminPlatformShellLayoutApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  }).passthrough();
}
