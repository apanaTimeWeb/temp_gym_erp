// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for attendance_reports; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_attendance/attendance_reports/utils/AdminAttendanceReportsAnalyticsSortAttendanceRows.ts)

/**
 * @description AdminAttendanceReportsSortAttendanceRows: Owns the AdminAttendanceReportsSortAttendanceRows responsibility for the admin_attendance feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
import type { AttendanceSortKey, AttendanceSortDirection } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTableTypes';
import type { AttendanceSummaryRow } from '@/app/frontend_admin/admin_attendance/attendance_reports/types/AdminAttendanceReportsTypes';

/** Sorts attendance summary rows by the selected report column. @description Implements sortAdminAttendanceRows for the owning feature’s explicitly typed data. @param data - Input used by this utility as declared by the signature. @param key - Input used by this utility as declared by the signature. @param direction - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function sortAdminAttendanceRows(data: AttendanceSummaryRow[], key: AttendanceSortKey, direction: AttendanceSortDirection): AttendanceSummaryRow[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    const result = typeof aValue === 'number' && typeof bValue === 'number'
      ? aValue - bValue
      : String(aValue).localeCompare(String(bValue), undefined, { numeric: true });
    return direction === 'asc' ? result : -result;
  });
}
