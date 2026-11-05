import { z } from 'zod';

import { superadminReportsCenterApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/api/superadmin_analytics_reports_cancellations_api_fetch.api';
import { SUPERADMIN_ANALYTICS_REPORTS_CANCELLATIONS_API as SUPERADMIN_ANALYTICS_REPORTS_CENTER_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/config/superadmin_analytics_reports_cancellations.url_config';
import { TenantHealthScoreSchema, RevenueRowSchema, CancellationsRecordSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/schemas/superadmin_analytics_reports_cancellations_contract.schemas';

import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/types/superadmin_analytics_reports_cancellations.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsReportsApi owned by the superadmin_analytics_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: zod, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/schemas/superadmin_analytics_reports_cancellations_contract.schemas, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/api/superadmin_analytics_reports_cancellations_api_fetch.api, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/config/superadmin_analytics_reports_cancellations.url_config, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_cancellations/types/superadmin_analytics_reports_cancellations.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Encapsulates functionality for superadmin_analytics_reports_api.ts


export const superadminReportsApi = {
    fetchRevenueData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<RevenueRow[]>(`${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/revenue${q}`, { dataSchema: z.array(RevenueRowSchema) });
    },
    fetchCancellationsData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<CancellationsRecord[]>(`${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/cancellations${q}`, { dataSchema: z.array(CancellationsRecordSchema) });
    },
    fetchHealthData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<TenantHealthScore[]>(`${SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.BASE}/health${q}`, { dataSchema: z.array(TenantHealthScoreSchema) });
    },
};
