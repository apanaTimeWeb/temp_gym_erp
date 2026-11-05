// RESPONSIBILITY: Owns typed HTTP access for Admin attendance records, summary, and trend queries.
// DATA FLOW: attendance UI state → typed query params → API transport → Zod validation → TanStack Query.

import type { AdminAttendanceQueryParams } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardQueryTypes';
import { z } from 'zod';
import { adminAttendanceDashboardApiFetch as apiFetch } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardApiResponse';
import { ADMIN_ATTENDANCE_API } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/config/admin_attendance_dashboard.url_config';
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint, DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
import { adminAttendanceRecordSchema, adminAttendanceSummarySchema, adminAttendanceTrendPointSchema } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/schemas/AdminAttendanceDashboardSchemas';


/**
 * buildQuery is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function buildQuery(params?: Record<string, string | number | undefined>): string {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
  }
  return query.toString() ? `?${query.toString()}` : '';
}

async function fetchAttendanceRecords(params: AdminAttendanceQueryParams) {
  const { page, limit, branchId, search, status, dateRange } = params;
  return apiFetch<AdminAttendanceRecord[]>(
    `${ADMIN_ATTENDANCE_API.records}${buildQuery({ page, limit, branchId, search, status, dateRange })}`,
    { method: 'GET', dataSchema: z.array(adminAttendanceRecordSchema) },
  );
}

async function fetchAttendanceSummary(params: Pick<AdminAttendanceQueryParams, 'branchId' | 'dateRange'>) {
  const { branchId, dateRange } = params;
  return apiFetch<AdminAttendanceSummary>(
    `${ADMIN_ATTENDANCE_API.summary}${buildQuery({ branchId, dateRange })}`,
    { method: 'GET', dataSchema: adminAttendanceSummarySchema },
  );
}

async function fetchAttendanceTrend(params: Pick<AdminAttendanceQueryParams, 'branchId' | 'dateRange'>) {
  const { branchId, dateRange } = params;
  return apiFetch<AdminAttendanceTrendPoint[]>(
    `${ADMIN_ATTENDANCE_API.trend}${buildQuery({ branchId, dateRange })}`,
    { method: 'GET', dataSchema: z.array(adminAttendanceTrendPointSchema) },
  );
}

export const AdminAttendanceApi = {
  fetchAttendanceRecords,
  fetchAttendanceSummary,
  fetchAttendanceTrend,
} as const;
