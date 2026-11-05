/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAffiliatesTypesSchemas owned by the superadmin_affiliates feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const AffiliateStatusSchema = z.enum(['ACTIVE', 'INACTIVE']);

export const AffiliateRecordSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  referralCode: z.string(),
  totalReferred: z.number(),
  commissionEarned: z.number(),
  currency: z.string(),
  commissionRate: z.number().optional(),
  pendingPayout: z.number().optional(),
  bankDetails: z.string().optional(),
  status: AffiliateStatusSchema,
  joinedAt: z.string(),
  referralCount: z.number().optional(),
  conversionRate: z.number().optional(),
});

export const AffiliateSchema = z.object({
  name: z.string().min(2, 'ui.validation_name_min_2').max(80, 'ui.validation_name_max_80'),
  email: z.string().min(1, 'ui.validation_email_required').email('ui.validation_email_invalid'),
  referralCode: z.string().min(4, 'ui.validation_referral_code_min_4').max(16, 'ui.validation_referral_code_max_16').regex(/^[A-Za-z0-9]+$/, 'ui.validation_referral_code_alphanumeric'),
  currency: z.string().optional(),
  bankDetails: z.record(z.string(), z.unknown()).nullable().optional(),
});

export const AffiliatePayoutRecordSchema = z.object({
  id: z.string(),
  affiliateId: z.string(),
  affiliateName: z.string(),
  amount: z.number(),
  currency: z.string(),
  method: z.enum(['BANK_TRANSFER', 'PAYPAL']),
  referenceId: z.string(),
  status: z.enum(['PENDING', 'COMPLETED']),
  paidAt: z.string(),
});
