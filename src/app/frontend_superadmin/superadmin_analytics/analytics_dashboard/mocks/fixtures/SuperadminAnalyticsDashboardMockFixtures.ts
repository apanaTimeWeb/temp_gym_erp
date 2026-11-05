/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsMockFixtures owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { AnalyticsApiData, RevenueMetrics, MonthlyAnalyticsDataPoint, PlanRevenueBreakdown } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types';
export const MOCK_REVENUE_METRICS: RevenueMetrics = {
    mrr: 15000000,
    arr: 180000000,
    cancellationRate: 2.5,
    ltv: 50000,
    cac: 2000,
    currency: 'INR',
    activeTenants: 125,
    arpu: 1200,
    mrrDeltaPercent: 5.2,
    arrDeltaPercent: 12.5,
    cancellationDeltaPercent: -0.5,
};
export const MOCK_MONTHLY_DATA: MonthlyAnalyticsDataPoint[] = [
    { month: 'Jan', mrr: 10000000, tenantCount: 100, cancelledCount: 2 },
    { month: 'Feb', mrr: 11000000, tenantCount: 105, cancelledCount: 1 },
    { month: 'Mar', mrr: 12500000, tenantCount: 112, cancelledCount: 3 },
    { month: 'Apr', mrr: 13500000, tenantCount: 118, cancelledCount: 2 },
    { month: 'May', mrr: 15000000, tenantCount: 125, cancelledCount: 1 },
];
export const MOCK_PLAN_REVENUE: PlanRevenueBreakdown[] = [
    { plan: 'Basic', revenue: 3000000, tenantCount: 50 },
    { plan: 'Pro', revenue: 7000000, tenantCount: 50 },
    { plan: 'Enterprise', revenue: 5000000, tenantCount: 25 },
];
export const MOCK_SUPERADMIN_ANALYTICS: AnalyticsApiData = {
    metrics: MOCK_REVENUE_METRICS,
    monthly: MOCK_MONTHLY_DATA,
    planRevenue: MOCK_PLAN_REVENUE,
};

/** Deterministic analytics chart tiers for baseline, standard, and stress rendering tests. */
export const createSuperadminAnalyticsDashboardScale = (count: number): MonthlyAnalyticsDataPoint[] =>
    Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => ({
        month: `Period ${String(index + 1).padStart(3, '0')}`,
        mrr: 10_000_000 + index * 125_000,
        tenantCount: 100 + index * 5,
        cancelledCount: index % 7,
    }));
export const MOCK_ANALYTICS_DASHBOARD_TIER_1_SMALL = createSuperadminAnalyticsDashboardScale(10);
export const MOCK_ANALYTICS_DASHBOARD_TIER_2_MEDIUM = createSuperadminAnalyticsDashboardScale(100);
export const MOCK_ANALYTICS_DASHBOARD_TIER_3_STRESS = createSuperadminAnalyticsDashboardScale(500);

