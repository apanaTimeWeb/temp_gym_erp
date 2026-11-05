import { superadminReportsCenterApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center_api_fetch.api';
import { SUPERADMIN_ANALYTICS_REPORTS_CENTER_API } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/config/superadmin_analytics_reports_center.url_config';
import { SuperadminAnalyticsReportsCenterApiResponseSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_api_response.schema';
import { SuperadminAnalyticsReportsExportResponseSchema } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_export_response.schemas';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsReportsExportApi owned by the superadmin_analytics_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_api_response.schema, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/schemas/superadmin_analytics_reports_center_export_response.schemas, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/api/superadmin_analytics_reports_center_api_fetch.api, @/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/config/superadmin_analytics_reports_center.url_config, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the reports export request contract.


export const superadminReportsExportApi = {
  requestExport: (idempotencyKey: string) => apiFetch<null>(SUPERADMIN_ANALYTICS_REPORTS_CENTER_API.EXPORT.BACKEND_API.EXPORT, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminAnalyticsReportsCenterApiResponseSchema(SuperadminAnalyticsReportsExportResponseSchema),
  }),
};
