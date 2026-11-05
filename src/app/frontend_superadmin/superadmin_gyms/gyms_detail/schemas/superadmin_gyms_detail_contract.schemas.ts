/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
import { SUPERADMIN_GYM_STATUS_VALUES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/constants/superadmin_gyms_detail.constants';
export const SuperadminGymDetailStatusSchema = z.enum(SUPERADMIN_GYM_STATUS_VALUES);
export const SuperadminGymDetailTabSchema = z.enum(['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support']);
export const SuperadminGymDetailUsageItemSchema = z.object({
  label: z.string(),
  used: z.number(),
  limit: z.number(),
  percent: z.number(),
});
export const SuperadminGymDetailDataSchema = z.object({
  gymId: z.string(),
  gymName: z.string(),
  status: SuperadminGymDetailStatusSchema,
  ownerName: z.string(),
  adminEmail: z.string().email(),
  phone: z.string(),
  createdAt: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string().optional(),
  gstin: z.string().optional(),
  trialEndsAt: z.string().optional(),
  memberCount: z.number(),
  monthlyRevenue: z.number().int().nonnegative(),
  currency: z.string(),
  plan: z.string(),
  databaseVersion: z.string(),
  tabs: z.array(SuperadminGymDetailTabSchema),
  health: z.object({
    score: z.number(),
    loginTrend: z.number(),
    memberTrend: z.number(),
    paymentFailures: z.number(),
    openTickets: z.number(),
  }),
  usage: z.array(SuperadminGymDetailUsageItemSchema),
  billing: z.object({
    monthlyIncome: z.number().int().nonnegative(),
    nextPayment: z.string(),
    failedPayments: z.number(),
    discount: z.string(),
    currency: z.string(),
  }),
  support: z.object({
    openTickets: z.number(),
    averageResponseHours: z.number(),
    satisfaction: z.number(),
  }),
  activity: z.array(z.object({ date: z.string(), event: z.string() })),
  subscription: z.object({ plan: z.string(), started: z.string(), renewal: z.string(), monthlyIncome: z.number().int().nonnegative(), currency: z.string() }),
});
export const SuperadminGymDetailResponseSchema = z.discriminatedUnion('success', [
  z.object({ success: z.literal(true), message: z.string(), data: SuperadminGymDetailDataSchema, requestId: z.string().min(1) }),
  z.object({ success: z.literal(false), message: z.string(), data: z.null(), error: z.string().optional(), errorCode: z.string().min(1), statusCode: z.number().int().min(100).max(599), requestId: z.string().min(1), validationErrors: z.array(z.object({ field: z.string(), message: z.string() })).optional() }),
]);
