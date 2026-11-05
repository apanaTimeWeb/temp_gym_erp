import { superadminDashboardApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview_api_fetch.api';
import { SUPERADMIN_DASHBOARD_OVERVIEW_API } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config';
import { SuperadminDashboardApiDataSchema } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/schemas/superadmin_dashboard_overview_types.schemas';

import type { SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardApi owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/schemas/superadmin_dashboard_overview_types.schemas, @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/config/superadmin_dashboard_overview.url_config, @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview_api_fetch.api, @/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


export const superadminDashboardApi = {
    fetchDashboard: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<SuperadminDashboardApiData>(`${SUPERADMIN_DASHBOARD_OVERVIEW_API.BASE}${q}`, { dataSchema: SuperadminDashboardApiDataSchema });
    },
    fetchDashboardMetrics: () => apiFetch<SuperadminDashboardApiData>(SUPERADMIN_DASHBOARD_OVERVIEW_API.METRICS, { dataSchema: SuperadminDashboardApiDataSchema }),
};
