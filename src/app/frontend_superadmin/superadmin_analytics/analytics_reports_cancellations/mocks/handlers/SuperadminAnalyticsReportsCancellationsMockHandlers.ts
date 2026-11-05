import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_API as SUPERADMIN_ANALYTICS_REPORTS_CENTER_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/config/superadmin_analytics_reports_cancellations.url_config';
import { MOCK_SUPERADMIN_ANALYTICS_REPORTS_HEALTH, MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE, MOCK_SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/mocks/fixtures/SuperadminAnalyticsReportsCancellationsMockFixtures';

import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/types/superadmin_analytics_reports_cancellations.types';
import type { ApiResponse } from '@/lib/api';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsReportsMockHandlers owned by the superadmin_analytics_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: msw, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/mocks/fixtures/SuperadminAnalyticsReportsCancellationsMockFixtures, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/config/superadmin_analytics_reports_cancellations.url_config, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/types/superadmin_analytics_reports_cancellations.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */


const BASE_URL = `*${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}`;
export const superadminReportsHandlers = [
    http.get(`${BASE_URL}/revenue`, async ({ request }) => {
        await delay(300);
        const url = new URL(request.url);
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        const currentMonthLabel = new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date());
        const currentMonthStart = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`;
        const monthStartByLabel: Record<string, string> = { Jul: '2026-07-01', Aug: '2026-08-01', Sep: '2026-09-01', [currentMonthLabel]: currentMonthStart };
        const revenueRows = MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE.some((row) => row.month === currentMonthLabel) ? MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE : [...MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE, { ...MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE[MOCK_SUPERADMIN_ANALYTICS_REPORTS_REVENUE.length - 1]!, month: currentMonthLabel }];
        const filtered = revenueRows.filter((row) => {
            const monthDate = monthStartByLabel[row.month];
            if (!monthDate) return false;
            return (!startDate || monthDate >= startDate) && (!endDate || monthDate <= endDate);
        });
        return HttpResponse.json<ApiResponse<RevenueRow[]>>({ success: true, message: 'Success', data: filtered, requestId: crypto.randomUUID()});
    }),
    http.get(`${BASE_URL}/cancellations`, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const planFilter = url.searchParams.get('plan');
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        let filtered = [...MOCK_SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS];
        if (search) {
            filtered = filtered.filter(c => c.gymName.toLowerCase().includes(search));
        }
        if (planFilter && planFilter !== 'ALL') {
            filtered = filtered.filter(c => c.plan.toUpperCase() === planFilter.toUpperCase());
        }
        if (startDate || endDate) {
            filtered = filtered.filter(c => {
                if (!c.cancelledAt)
                    return true;
                const cancelled = new Date(c.cancelledAt);
                if (startDate && cancelled < new Date(startDate))
                    return false;
                if (endDate && cancelled > new Date(endDate))
                    return false;
                return true;
            });
        }
        return HttpResponse.json<ApiResponse<CancellationsRecord[]>>({
            success: true,
            message: 'Success',
            data: filtered,
            requestId: crypto.randomUUID(),
        });
    }),
    http.post(SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.EXPORT.BACKEND_API.EXPORT, async () => HttpResponse.json<ApiResponse<null>>({ success: true, message: 'Export started', data: null, requestId: crypto.randomUUID()})),
    http.get(`${BASE_URL}/health`, async ({ request }) => {
        await delay(400);
        const url = new URL(request.url);
        const search = url.searchParams.get('search')?.toLowerCase() || '';
        const planFilter = url.searchParams.get('plan');
        const startDate = url.searchParams.get('startDate');
        const endDate = url.searchParams.get('endDate');
        let filtered = [...MOCK_SUPERADMIN_ANALYTICS_REPORTS_HEALTH];
        if (search) filtered = filtered.filter((row) => row.gymName.toLowerCase().includes(search));
        if (planFilter && planFilter !== 'ALL') filtered = filtered.filter((row) => row.plan.toUpperCase() === planFilter.toUpperCase());
        if (startDate) filtered = filtered.filter((row) => row.lastLogin >= startDate);
        if (endDate) filtered = filtered.filter((row) => row.lastLogin <= endDate);
        return HttpResponse.json<ApiResponse<TenantHealthScore[]>>({
            success: true,
            message: 'Success',
            data: filtered,
            requestId: crypto.randomUUID(),
        });
    }),
];
