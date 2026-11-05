/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardTypesSchemas owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

const CurrencyCodeSchema = z.string().regex(/^[A-Z]{3}$/).refine((currency) => {
    try { Intl.NumberFormat('en', { style: 'currency', currency }).format(0); return true; } catch { return false; }
}, 'Unsupported currency code');

export const DashboardTenantSchema = z.object({
    id: z.string(), name: z.string(), ownerName: z.string(), adminEmail: z.string().email(), phone: z.string(),
    status: z.enum(['ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELLED']), plan: z.string(), createdAt: z.string(),
    memberCount: z.number(), monthlyRevenue: z.number(), currency: CurrencyCodeSchema, databaseVersion: z.string(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), gstin: z.string().optional(), trialEndsAt: z.string().optional(), lastLoginAt: z.string().optional(), lastActiveAt: z.string().nullable().optional(), staffCount: z.number().optional(),
});

export const SaaSDashboardMetricsSchema = z.object({
    currency: CurrencyCodeSchema,
    totalGyms: z.number(),
    activeGyms: z.number(),
    suspendedGyms: z.number(),
    trialGyms: z.number(),
    totalEndUsers: z.number(),
    monthlyRecurringRevenue: z.number(),
    mrrDeltaPercent: z.number().optional(),
    arrDeltaPercent: z.number().optional(),
    arpu: z.number().optional(),
    revenueByTier: z.array(z.object({ plan: z.string(), amount: z.number(), currency: CurrencyCodeSchema })).optional(),
    revenueByGeography: z.array(z.object({ region: z.string(), revenue: z.number(), currency: CurrencyCodeSchema })).optional(),
    overdueInvoicesCount: z.number(),
    pendingRevenue: z.number(),
    recentOnboards: z.array(DashboardTenantSchema),
    platformHealthScore: z.number().min(0).max(100).optional(),
    trialsExpiringIn7Days: z.number().optional(),
});

export const SuperadminDashboardApiDataSchema = z.object({
    metrics: SaaSDashboardMetricsSchema,
    revenue: z.array(z.object({ month: z.string(), mrr: z.number(), currency: CurrencyCodeSchema })),
    growth: z.array(z.object({ month: z.string(), gyms: z.number() }))
});
