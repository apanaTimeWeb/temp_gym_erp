// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
import { z } from 'zod';

// RESPONSIBILITY: Validates the canonical API response envelope for Trainer-owned API clients.
// DATA FLOW: HTTP JSON → TrainerInfrastructureApiResponseSchema → feature-specific response schema → query/UI.
const PaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

const ValidationErrorItemSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const TrainerInfrastructureApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.discriminatedUnion('success', [
    z.object({
      success: z.literal(true),
      requestId: z.string().min(1),
      message: z.string(),
      data: dataSchema,
      meta: PaginationMetaSchema.optional(),
    }),
    z.object({
      success: z.literal(false),
      requestId: z.string().min(1),
      message: z.string(),
      data: z.null(),
      errorCode: z.string().min(1),
      statusCode: z.number().int().min(400).max(599),
      error: z.string().optional(),
      validationErrors: z.array(ValidationErrorItemSchema).optional(),
    }),
  ]);
