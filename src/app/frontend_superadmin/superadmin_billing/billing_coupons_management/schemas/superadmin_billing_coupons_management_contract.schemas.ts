/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
export const CouponStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'EXPIRED', 'DEPLETED']);
export const RedemptionRecordSchema = z.object({
  id: z.string(),
  tenantName: z.string(),
  redeemedAt: z.string(),
  planName: z.string(),
  discountApplied: z.number(),
  currency: z.string().optional(),
});
export const CouponRecordSchema = z.object({
  id: z.string(),
  code: z.string(),
  discountType: z.enum(['PERCENTAGE', 'EXACT']),
  discountValue: z.number(),
  maxUses: z.number().int(),
  currentUses: z.number().int(),
  status: CouponStatusSchema,
  expiryDate: z.string(),
  isDeleted: z.boolean(),
  currency: z.string().optional(),
  redemptions: z.array(RedemptionRecordSchema).optional(),
}).superRefine(({ discountType, discountValue }, ctx) => {
  if (discountType === 'EXACT' && !Number.isInteger(discountValue)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Exact coupon discounts must use integer minor units.', path: ['discountValue'] });
  }
});

const CouponBasePayloadSchema = z.object({
  code: z.string().min(3).max(20),
  discountType: z.enum(['PERCENTAGE', 'EXACT']),
  discountValue: z.number().positive(),
  maxUses: z.number().int().min(1),
  expiryDate: z.string().min(1),
  currency: z.string().optional(),
});

export const CouponApiPayloadSchema = CouponBasePayloadSchema.superRefine(({ discountType, discountValue }, ctx) => {
  if (discountType === 'EXACT' && !Number.isInteger(discountValue)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Exact coupon discounts must use integer minor units.', path: ['discountValue'] });
  }
});

export const CouponUpdatePayloadSchema = CouponBasePayloadSchema.partial().superRefine((payload: Partial<z.infer<typeof CouponBasePayloadSchema>>, ctx: z.RefinementCtx) => {
  if (Object.keys(payload).length === 0) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'At least one coupon field must be updated.' });
  }
  if (payload.discountType === 'EXACT' && typeof payload.discountValue === 'number' && !Number.isInteger(payload.discountValue)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Exact coupon discounts must use integer minor units.', path: ['discountValue'] });
  }
});

export interface SuperadminBillingCouponsValidationMessages {
  codeMin: string;
  codeMax: string;
  codeFormat: string;
  discountTypeRequired: string;
  discountPositive: string;
  maxUsesInteger: string;
  maxUsesMinimum: string;
  expiryRequired: string;
  expiryFuture: string;
  percentageMax: string;
}

export const createSuperadminBillingCouponsFormSchema = (messages: SuperadminBillingCouponsValidationMessages, allowGeneratedCode = false) => z.object({
  code: allowGeneratedCode ? z.string().trim().optional().or(z.literal('')) : z.string().min(3, messages.codeMin).max(20, messages.codeMax).regex(/^[A-Z0-9-]+$/, messages.codeFormat),
  discountType: z.enum(['PERCENTAGE', 'EXACT'], { message: messages.discountTypeRequired }),
  discountValue: z.number().positive(messages.discountPositive),
  maxUses: z.number().int(messages.maxUsesInteger).min(1, messages.maxUsesMinimum),
  expiryDate: z.string().min(1, messages.expiryRequired).refine((val) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(val);
    if (!match) return false;
    const [, y, m, d] = match; const calendar = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
    if (calendar.getUTCFullYear() !== Number(y) || calendar.getUTCMonth() + 1 !== Number(m) || calendar.getUTCDate() !== Number(d)) return false;
    const now = new Date();
    const localToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    // Expiry is a date-only value in the user's calendar, not a UTC timestamp.
    // The input permits local today, so validation must use the same boundary.
    return val >= localToday;
  }, { message: messages.expiryFuture }),
}).superRefine(({ discountType, discountValue }, ctx) => {
  if (discountType === 'PERCENTAGE' && discountValue > 100) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: messages.percentageMax, path: ['discountValue'] });
  }
});

