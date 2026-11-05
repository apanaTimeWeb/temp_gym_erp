/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const SuperadminBillingInvoicesV1DataSchema = z.object({ summary: z.object({ failed: z.number(), inRecovery: z.number(), recoveredIncome: z.number(), unrecoveredIncome: z.number(), currency: z.string().optional() }), recovery: z.array(z.object({ gym: z.string(), invoice: z.string(), amount: z.number(), currency: z.string().optional(), attempts: z.number(), nextRetry: z.string(), daysLate: z.number(), reason: z.string() })), reconciliation: z.array(z.object({ type: z.string(), gym: z.string(), amount: z.number(), currency: z.string().optional(), status: z.string() })), policy: z.object({ firstRetry: z.string(), secondRetry: z.string(), finalRetry: z.string(), gracePeriod: z.string(), autoSuspend: z.string() }) });
export const SuperadminBillingInvoicesV1ResponseSchema = z.discriminatedUnion('success', [
  z.object({ success: z.literal(true), message: z.string(), data: SuperadminBillingInvoicesV1DataSchema, requestId: z.string().min(1) }).passthrough(),
  z.object({ success: z.literal(false), message: z.string(), data: z.null(), error: z.string().optional(), errorCode: z.string().min(1), statusCode: z.number().int().min(100).max(599), requestId: z.string().min(1), validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional() }).passthrough(),
]);
