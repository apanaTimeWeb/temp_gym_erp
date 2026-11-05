import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_ANALYTICS_DASHBOARD_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/config/superadmin_analytics_dashboard.url_config';
import { MOCK_SUPERADMIN_ANALYTICS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/fixtures/SuperadminAnalyticsDashboardMockFixtures';

import type { AnalyticsApiData } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsMockHandlers owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/mocks/fixtures/SuperadminAnalyticsDashboardMockFixtures, @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/config/superadmin_analytics_dashboard.url_config, @/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const BASE_URL = `*${SUPERADMIN_ANALYTICS_DASHBOARD_API.BASE}`;
export const superadminAnalyticsHandlers = [
    http.get(BASE_URL, async () => {
        await delay(400);
        return HttpResponse.json<ApiResponse<AnalyticsApiData>>({
            success: true,
            message: 'Success',
            data: MOCK_SUPERADMIN_ANALYTICS,
            requestId: crypto.randomUUID(),
        });
    }),
];
