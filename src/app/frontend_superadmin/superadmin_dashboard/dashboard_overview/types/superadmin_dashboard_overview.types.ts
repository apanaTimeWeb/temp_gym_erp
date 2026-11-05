// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Dashboard module.
import { SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES, SUPERADMIN_DASHBOARD_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants';



export type TenantStatus = (typeof SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES)[keyof typeof SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES];
export type TimeRange = typeof SUPERADMIN_DASHBOARD_TIME_RANGES[number];
export interface DashboardContextType {
    stats: unknown | null;
    isPending: boolean;
    isError: boolean;
    error: string;
    timeRange: TimeRange;
    setTimeRange: (range: TimeRange) => void;
}
export interface Tenant {
    id: string;
    name: string;
    ownerName: string;
    adminEmail: string;
    phone: string;
    status: TenantStatus;
    plan: string;
    createdAt: string;
    memberCount: number;
    monthlyRevenue: number;
    currency: string;
    databaseVersion: string;
    city?: string;
    state?: string;
    country?: string;
    gstin?: string;
    trialEndsAt?: string;
    lastLoginAt?: string;
}
/** Revenue breakdown by plan tier — used for the donut chart */
export interface PlanRevenueBreakdown {
    plan: string;
    amount: number;
    currency: string;
    tenantCount?: number;
}
export interface SaaSDashboardMetrics {
    currency: string;
    totalGyms: number;
    activeGyms: number;
    suspendedGyms: number;
    trialGyms: number;
    totalEndUsers: number;
    monthlyRecurringRevenue: number;
    overdueInvoicesCount: number;
    pendingRevenue: number;
    recentOnboards: Tenant[];
    trialsExpiringIn7Days?: number;
    /** MRR % change vs previous period — from API, never hardcoded */
    mrrDeltaPercent?: number;
    /** ARR % change vs previous year — from API, never hardcoded */
    arrDeltaPercent?: number;
    /** Average Revenue Per User = MRR / activeTenants */
    arpu?: number;
    /** Revenue breakdown by plan tier for donut chart (audit item #35) */
    revenueByTier?: PlanRevenueBreakdown[];
    revenueByGeography?: {
        region: string;
        revenue: number;
        currency: string;
    }[];
    /**
     * Composite platform health score 0–100.
     * Computed by backend from: cancellations rate, overdue invoices, system uptime, active tenant ratio.
     * Audit item #34 — must come from API, never hardcoded.
     */
    platformHealthScore?: number;
}
export interface RevenueChartData {
    month: string;
    mrr: number;
    currency: string;
}
export interface GrowthChartData {
    month: string;
    gyms: number;
}
export interface SuperadminDashboardApiData {
    metrics: SaaSDashboardMetrics;
    revenue: RevenueChartData[];
    growth: GrowthChartData[];
}
export interface SuperadminDashboardKpiGridProps {
    metrics: SaaSDashboardMetrics;
    revenueChartData: RevenueChartData[];
    timeMultiplier: number;
    mrrLabel: string;
}
export interface SuperadminDashboardChartsProps {
    metrics: SaaSDashboardMetrics;
    revenueChartData: RevenueChartData[];
    growthChartData: GrowthChartData[];
    timeMultiplier: number;
    mrrLabel: string;
}
export interface SuperadminDashboardRecentOnboardsProps {
    recentOnboards: Tenant[];
}
