// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_attendance/attendance_reports/api/admin_attendance_analytics_branch_reference_api.ts)

import { adminAttendanceReportsAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsApiResponse';
import { z } from 'zod';
import { ADMIN_ATTENDANCE_REPORTS_API } from '@/app/frontend_admin/admin_attendance/attendance_reports/config/attendance_reports.url_config';
import type { AdminAttendanceReportsBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminAttendanceReportsBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<{ items: AdminAttendanceReportsBranchReference[] }>(`${ADMIN_ATTENDANCE_REPORTS_API.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
