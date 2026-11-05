/**
 * RESPONSIBILITY: Owns runtime validation schemas for the feature data contracts defined in this module.
 * AI BOUNDARY: Schema-only runtime validation; no UI, API calls, or state management.
 */
import { z } from 'zod';
import { SUPERADMIN_GYM_STATUS_VALUES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
export const TenantStatusSchema = z.enum(SUPERADMIN_GYM_STATUS_VALUES);
export const SubscriptionHistoryItemSchema = z.object({
    id: z.string(),
    planName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(['ACTIVE', 'EXPIRED', 'CANCELLED']),
    amount: z.number().int().nonnegative()
});
export const UsageStatsSchema = z.object({
    storageUsedMb: z.number(),
    apiCallsMonthly: z.number(),
    activeMembers: z.number()
});
export const TenantSchema = z.object({
    id: z.string(),
    name: z.string(),
    ownerName: z.string(),
    adminEmail: z.string().email(),
    phone: z.string(),
    status: TenantStatusSchema,
    plan: z.string(),
    createdAt: z.string(),
    memberCount: z.number(),
    monthlyRevenue: z.number().int().nonnegative(),
    currency: z.string(),
    databaseVersion: z.string(),
    databaseName: z.string(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    gstin: z.string().optional(),
    trialEndsAt: z.string().optional(),
    lastLoginAt: z.string().optional(),
    lastActiveAt: z.string().nullable().optional(),
    staffCount: z.number().optional(),
    subscriptionHistory: z.array(SubscriptionHistoryItemSchema).optional(),
    usageStats: UsageStatsSchema.optional(),
});
export const GymStatsSchema = z.object({
    total: z.number(),
    active: z.number(),
    trial: z.number(),
    suspended: z.number(),
    cancelled: z.number(),
}).passthrough();
