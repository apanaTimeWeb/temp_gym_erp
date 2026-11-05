// RESPONSIBILITY: Owns typed API operations for dashboard_overview; it does not implement the global HTTP transport or backend authorization.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_dashboard/dashboard_overview/api/admin_dashboard_overview_api.ts)

import type { AdminDashboardStatsParams } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewQueryTypes';
import { ADMIN_DASHBOARD_API } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/config/admin_dashboard_overview.url_config';
import { dashboardStatsSchema } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/schemas/AdminDashboardOverviewSchemas';
import { adminDashboardOverviewApiFetch as apiFetch } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewApiResponse';
import type { DashboardStats } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewTypes';


export const AdminDashboardApi = {
  fetchDashboardStats: async (params: AdminDashboardStatsParams) => {
    const query = new URLSearchParams({ range: params.range });
    if (params.startDate) query.set('startDate', params.startDate);
    if (params.endDate) query.set('endDate', params.endDate);
    if (params.branchId) query.set('branchId', params.branchId);

    return apiFetch<DashboardStats>(
      `${ADMIN_DASHBOARD_API.stats}?${query.toString()}`,
      { method: 'GET', dataSchema: dashboardStatsSchema },
    );
  },
};
