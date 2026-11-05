/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsTypesSchemas owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
import { z } from 'zod';

export const RevenueHistoryPointSchema = z.object({
    month: z.string(),
    amount: z.number(),
}).passthrough();

export const UserGrowthPointSchema = z.object({
    month: z.string(),
    count: z.number(),
}).passthrough();

export const AnalyticsApiDataSchema = z.object({
    metrics: z.object({
        mrr: z.number(),
        arr: z.number(),
        cancellationRate: z.number(),
        ltv: z.number(),
        cac: z.number(),
        currency: z.string().optional(),
        activeTenants: z.number(),
        arpu: z.number(),
        mrrDeltaPercent: z.number(),
        arrDeltaPercent: z.number(),
        cancellationDeltaPercent: z.number().optional(),
    }),
    monthly: z.array(z.object({
        month: z.string(),
        mrr: z.number(),
        tenantCount: z.number(),
        cancelledCount: z.number(),
    })),
    planRevenue: z.array(z.object({
        plan: z.string(),
        revenue: z.number(),
        tenantCount: z.number(),
    })).optional(),
}).passthrough();

export const RevenueChartDataSchema = z.object({ month: z.string(), mrr: z.number() });

export const GrowthChartDataSchema = z.object({ month: z.string(), gyms: z.number() });
