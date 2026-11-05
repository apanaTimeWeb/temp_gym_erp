// RESPONSIBILITY: Defines UI query state types for the Superadmin Analytics page.
import { SUPERADMIN_ANALYTICS_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_range.constants';

import type { MonthlyAnalyticsDataPoint, RevenueMetrics } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types';



export type SuperadminAnalyticsTimeRange = typeof SUPERADMIN_ANALYTICS_TIME_RANGES[number];

export interface SuperadminAnalyticsPageReturn {
  metrics: RevenueMetrics | null;
  monthlyData: MonthlyAnalyticsDataPoint[];
  isPending: boolean;
  isError: boolean;
  error: string | null;
  timeRange: SuperadminAnalyticsTimeRange;
  customStart: string;
  customEnd: string;
  refetch: () => void;
}
