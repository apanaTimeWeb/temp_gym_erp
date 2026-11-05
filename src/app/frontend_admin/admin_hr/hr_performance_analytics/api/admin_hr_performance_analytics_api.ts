// RESPONSIBILITY: Owns typed API operations for hr_performance_analytics; it does not implement the global HTTP transport or backend authorization.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_hr/hr_performance_analytics/api/admin_hr_performance_analytics_api.ts)

import { z } from 'zod';
import { adminHrPerformanceAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsApiResponse';
import { ADMIN_HR_PERFORMANCE_API_URL } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/config/admin_hr_performance_analytics.url_config';
import { staffPerformanceRecordSchema } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/schemas/AdminHrPerformanceAnalyticsSchemas';
import type { StaffPerformanceRecord, PerformancePeriod, PerformanceSortKey, PerformanceSortDirection } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';
export const AdminHrPerformanceApi = {
  fetchStaffPerformance: async (period: PerformancePeriod, params?: { search?: string; sortKey?: PerformanceSortKey; sortDir?: PerformanceSortDirection }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value) query.set(key, String(value)); });
    return apiFetch<StaffPerformanceRecord[]>(`${ADMIN_HR_PERFORMANCE_API_URL}?${query.toString()}`, { method: 'GET', dataSchema: z.array(staffPerformanceRecordSchema) });
  },
};
