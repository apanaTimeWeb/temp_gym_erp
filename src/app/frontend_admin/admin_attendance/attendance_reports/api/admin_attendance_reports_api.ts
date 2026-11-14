// RESPONSIBILITY: Owns only the attendance report API operation. Binary export remains disabled until its host transport contract is verified.
import { adminAttendanceReportsAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_attendance/attendance_reports/utils/AdminAttendanceReportsApiResponse';
import { ADMIN_ATTENDANCE_REPORTS_API } from '@/app/frontend_admin/admin_attendance/attendance_reports/config/attendance_reports.url_config';
import type { AdminAttendanceReportsExportParams, AdminAttendanceReportsQueryParams, AttendanceReportData } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';
import { reportAttendanceDataSchema } from '@/app/frontend_admin/admin_attendance/attendance_reports/schemas/AdminAttendanceReportsSchemas';

function buildQuery(params: AdminAttendanceReportsQueryParams): string {
  const query = new URLSearchParams();
  query.set('from', params.from);
  query.set('to', params.to);
  if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
  return `?${query.toString()}`;
}

export class AdminAttendanceReportsBinaryExportContractError extends Error {
  readonly code = 'BINARY_EXPORT_CONTRACT_UNVERIFIED';
  constructor() { super('Export is blocked because the host binary-response contract was not supplied.'); this.name = 'AdminAttendanceReportsBinaryExportContractError'; }
}

export const AdminAttendanceReportsApi = {
  fetchAttendanceReport: async (params: AdminAttendanceReportsQueryParams) => apiFetch<AttendanceReportData>(`${ ADMIN_ATTENDANCE_REPORTS_API.attendance }${buildQuery(params)}`, { method: 'GET', dataSchema: reportAttendanceDataSchema }),
  exportReport: async (_params: AdminAttendanceReportsExportParams): Promise<Blob> => {
    throw new AdminAttendanceReportsBinaryExportContractError();
  },
};
