// RESPONSIBILITY: Owns Manager Reports summary transport only; manager-role report export is intentionally not implemented.
import { MANAGER_REPORTS_OVERVIEW_API } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/config/manager_reports_overview.url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';



import { managerReportSummarySchema } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/schemas/manager_reports_overview.schemas';
import type { ReportSummary } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';

/**
 * @description Retrieves the server-owned Manager Reports summary for the selected range.
 * @dependencies Uses only the global apiFetch transport and Manager Reports schema/types/URL configuration.
 * @edge-case Returns the normalized API envelope and allows the owning query hook to expose loading/error/retry state.
 */
export const ManagerReportsOverviewApi = {
  fetchReportsSummary: async (params?: Record<string, string>): Promise<ApiResponse<ReportSummary>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_REPORTS_OVERVIEW_API.SUMMARY}${query ? `?${query}` : ''}`, { dataSchema: managerReportSummarySchema });
  },
};
