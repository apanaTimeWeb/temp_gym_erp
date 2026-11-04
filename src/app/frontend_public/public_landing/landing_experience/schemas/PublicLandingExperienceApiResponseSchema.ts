// RESPONSIBILITY: Validates the existing public backend envelope without assuming it sends a requestId.
// FLOW: API response -> discriminated validation -> client-side envelope normalizer in the API adapter.
import { z } from 'zod';

const FieldError = z.object({ field: z.string(), message: z.string() }).strict();
const Pagination = z.object({
  total: z.number(), page: z.number(), limit: z.number(), totalPages: z.number(),
  hasNextPage: z.boolean(), hasPrevPage: z.boolean(),
}).strict();
const Base = { message: z.string(), data: z.null(), requestId: z.string().optional(), meta: Pagination.optional() };
/** The supplied backend contract permits optional requestId and error fields. */
export const PublicLandingNullApiResponseSchema = z.discriminatedUnion('success', [
  z.object({ ...Base, success: z.literal(true) }).strict(),
  z.object({ ...Base, success: z.literal(false), error: z.string().optional(),
    errorCode: z.string().optional(), statusCode: z.number().optional(),
    validationErrors: z.array(FieldError).optional() }).strict(),
]);
