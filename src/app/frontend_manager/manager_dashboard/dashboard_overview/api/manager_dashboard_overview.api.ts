import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

import { MANAGER_DASHBOARD_OVERVIEW_API } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';;

import { managerDashboardOverviewStatsSchema } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/schemas/manager_dashboard_overview.schemas';
import type { ManagerDashboardOverviewStats } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';


/**
 * @description Provides the ManagerDashboardOverviewApi implementation for the dashboard module.
 * @dependencies @/lib/api; @/app/frontend_manager/manager_dashboard/dashboard_overview/schemas/manager_dashboard_overview.schemas; @/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config; @/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types; @/lib/api
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const ManagerDashboardOverviewApi = {
  fetchDashboardStats: async (params?: Record<string, string>): Promise<ApiResponse<ManagerDashboardOverviewStats>> => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch(`${MANAGER_DASHBOARD_OVERVIEW_API.STATS}${query ? `?${query}` : ''}`, { dataSchema: managerDashboardOverviewStatsSchema });
  } };
