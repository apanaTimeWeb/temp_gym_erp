import { describe, expect, it } from 'vitest';
import { AdminAttendanceReportsApi, AdminAttendanceReportsBinaryExportContractError } from '@/app/frontend_admin/admin_attendance/attendance_reports/api/admin_attendance_reports_api';
import { ADMIN_ATTENDANCE_REPORTS_EXPORT_AVAILABLE } from '@/app/frontend_admin/admin_attendance/attendance_reports/constants/AdminAttendanceReportsConstants';

describe('attendance report binary export contract boundary', () => {
  it('keeps PDF/CSV export unavailable until the host binary response contract is supplied', async () => {
    expect(ADMIN_ATTENDANCE_REPORTS_EXPORT_AVAILABLE).toBe(false);
    await expect(AdminAttendanceReportsApi.exportReport({
      type: 'attendance',
      format: 'csv',
      from: '2026-10-01',
      to: '2026-10-31',
    })).rejects.toBeInstanceOf(AdminAttendanceReportsBinaryExportContractError);
  });
});
