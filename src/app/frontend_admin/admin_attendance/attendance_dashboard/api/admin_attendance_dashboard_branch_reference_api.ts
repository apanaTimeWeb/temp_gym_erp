// RESPONSIBILITY: Fetches minimal branch reference data for the Admin attendance module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_attendance/attendance_dashboard/api/admin_attendance_dashboard_branch_reference_api.ts)

import { adminAttendanceDashboardApiFetch as apiFetch } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardApiResponse';
import { z } from 'zod';
import { ADMIN_ATTENDANCE_API } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/config/admin_attendance_dashboard.url_config';
import type { AdminAttendanceBranchReference } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminAttendanceBranchReferenceApi = { fetchAttendanceBranchReferences: () => apiFetch<{ items: AdminAttendanceBranchReference[] }>(`${ADMIN_ATTENDANCE_API.branchReference}?consumer=attendance`, { method: 'GET', dataSchema: schema }) };
