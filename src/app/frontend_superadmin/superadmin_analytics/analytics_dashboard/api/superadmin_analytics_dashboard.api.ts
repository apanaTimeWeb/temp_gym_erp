import { superadminAnalyticsDashboardApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/api/superadmin_analytics_dashboard_api_fetch.api';
import { SUPERADMIN_ANALYTICS_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/config/superadmin_analytics_dashboard.url_config';
import { AnalyticsApiDataSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/schemas/superadmin_analytics_dashboard_types.schemas';

import type { AnalyticsApiData } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsApi owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/schemas/superadmin_analytics_dashboard_types.schemas, @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/config/superadmin_analytics_dashboard.url_config, @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/api/superadmin_analytics_dashboard_api_fetch.api, @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_analytics_api.ts


export const analyticsApi = {
    fetchRevenueMetrics: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<AnalyticsApiData>(`${SUPERADMIN_ANALYTICS_DASHBOARD_API.BASE}${q}`, { dataSchema: AnalyticsApiDataSchema });
    },
};
