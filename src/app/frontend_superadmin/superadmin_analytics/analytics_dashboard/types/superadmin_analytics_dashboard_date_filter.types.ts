// RESPONSIBILITY: Defines URL date-filter value types for the Superadmin Analytics feature.
import { SUPERADMIN_ANALYTICS_DATE_RANGES, SUPERADMIN_ANALYTICS_DATE_FILTER_BOUNDARIES } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/constants/superadmin_analytics_dashboard_date_range.constants';

export type SuperadminAnalyticsDateRange = typeof SUPERADMIN_ANALYTICS_DATE_RANGES[number];
export type SuperadminAnalyticsDateFilterBoundary = typeof SUPERADMIN_ANALYTICS_DATE_FILTER_BOUNDARIES[number];
