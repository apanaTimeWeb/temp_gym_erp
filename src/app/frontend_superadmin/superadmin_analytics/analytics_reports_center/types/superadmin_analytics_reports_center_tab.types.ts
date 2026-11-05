import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/types/superadmin_analytics_reports_center.types';
export interface SuperadminAnalyticsReportsRevenueTabProps { revenueData: RevenueRow[]; currency?: string; }
export interface SuperadminAnalyticsReportsCancellationsTabProps { cancellationsData: CancellationsRecord[]; filteredCancellationsData: CancellationsRecord[]; totalCancelledRevenue: number; avgDaysActive: number; currency?: string; }
export interface SuperadminAnalyticsReportsHealthTabProps { sortedHealthData: TenantHealthScore[]; }
export interface SuperadminAnalyticsReportsSummaryCardsProps { totalMRR: number; totalCancelledRevenue: number; cancellationsCount: number; avgHealthScore: number; healthDataLength: number; incomeChangePercent: number | null; dateSuffix?: string; currency?: string; }

export type SuperadminAnalyticsReportsTab = 'revenue' | 'cancellations' | 'health';
