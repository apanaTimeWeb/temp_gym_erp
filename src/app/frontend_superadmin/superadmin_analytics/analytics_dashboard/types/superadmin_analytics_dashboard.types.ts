import { RevenueHistoryPointSchema, UserGrowthPointSchema, RevenueChartDataSchema, GrowthChartDataSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/schemas/superadmin_analytics_dashboard_types.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: TypeScript types for the Analytics module. No business logic — types only.
// Rule 7: All types isolated here; never inline in components or hooks.
export interface RevenueMetrics {
    mrr: number;
    arr: number;
    cancellationRate: number;
    ltv: number;
    cac: number;
    currency?: string;
    activeTenants: number;
    arpu: number;
    mrrDeltaPercent: number;
    arrDeltaPercent: number;
    cancellationDeltaPercent?: number;
}
/** Revenue breakdown by plan tier for donut/pie chart */
export interface PlanRevenueBreakdown {
    plan: string;
    revenue: number;
    tenantCount: number;
}
/** Monthly data point for MRR area chart and tenant growth bar chart */
export interface MonthlyAnalyticsDataPoint {
    month: string;
    mrr: number;
    tenantCount: number;
    cancelledCount: number;
}
/** Shape of full analytics API response data */
export interface AnalyticsApiData {
    metrics: RevenueMetrics;
    monthly: MonthlyAnalyticsDataPoint[];
    planRevenue?: PlanRevenueBreakdown[];
}
/** Canonical async state enum — Rule 42: never use boolean `isPending` flags */
/** Schema for a single revenue history data point (API variant with generic keys). */
/** Schema for a single user growth data point. */
export type RevenueHistoryPoint = ZodInfer<typeof RevenueHistoryPointSchema>;
export type UserGrowthPoint = ZodInfer<typeof UserGrowthPointSchema>;
export type RevenueChartData = ZodInfer<typeof RevenueChartDataSchema>;
export type GrowthChartData = ZodInfer<typeof GrowthChartDataSchema>;
