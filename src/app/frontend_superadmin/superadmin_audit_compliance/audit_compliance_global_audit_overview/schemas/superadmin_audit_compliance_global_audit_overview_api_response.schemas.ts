import { z } from 'zod';

/** Builds the success/message/data envelope for this feature without importing another feature's schema. */
export function SuperadminAuditComplianceGlobalAuditApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.discriminatedUnion('success', [
    z.object({ success: z.literal(true), message: z.string(), data: dataSchema, requestId: z.string().min(1) }).passthrough(),
    z.object({ success: z.literal(false), message: z.string(), data: z.null(), error: z.string().optional(), errorCode: z.string().min(1), statusCode: z.number().int().min(100).max(599), requestId: z.string().min(1), validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional() }).passthrough(),
  ]);
}


/** Strict list-envelope schema: pagination metadata is required for server-paginated results. */
export const SuperadminAuditComplianceGlobalAuditListMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().positive(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
}).strict().superRefine((meta, ctx) => {
  const expectedPages = Math.max(1, Math.ceil(meta.total / meta.limit));
  if (meta.totalPages !== expectedPages) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['totalPages'], message: 'totalPages does not match total and limit.' });
  if (meta.page > meta.totalPages) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['page'], message: 'page exceeds totalPages.' });
  if (meta.hasNextPage !== (meta.page < meta.totalPages)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['hasNextPage'], message: 'hasNextPage must match the current page and totalPages.' });
  if (meta.hasPrevPage !== (meta.page > 1)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['hasPrevPage'], message: 'hasPrevPage must match the current page.' });
});

export function SuperadminAuditComplianceGlobalAuditListResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.discriminatedUnion('success', [
    z.object({
      success: z.literal(true),
      message: z.string(),
      data: dataSchema,
      meta: SuperadminAuditComplianceGlobalAuditListMetaSchema,
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
