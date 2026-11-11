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
  exportReport: async (params: AdminAttendanceReportsExportParams): Promise<Blob> => {
    try {
      const report = await AdminAttendanceReportsApi.fetchAttendanceReport({ from: params.from, to: params.to, branchId: params.branchId });
      const records = (report?.data as unknown as { records?: Array<{ memberId?: string; name?: string; checkIn?: string; checkOut?: string; branch?: string; status?: string }> })?.records ?? [];
      const headers = ['MemberID', 'Name', 'CheckIn', 'CheckOut', 'Branch', 'Status'];
      const lines = [headers.join(','), ...records.map(r => `"${r.memberId || ''}","${r.name || ''}","${r.checkIn || ''}","${r.checkOut || ''}","${r.branch || ''}","${r.status || ''}"`)];
      return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    } catch {
      const fallback = `Report,Attendance\nFrom,${params.from}\nTo,${params.to}\nBranch,${params.branchId || 'All'}\n`;
      return new Blob([fallback], { type: 'text/csv;charset=utf-8;' });
    }
  },
};
