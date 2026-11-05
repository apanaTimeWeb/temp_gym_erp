// RESPONSIBILITY: Prevent feature-local Reports components from drifting from canonical source-file export names.
// DATA FLOW: owning components → named/default imports → source-identity assertions.
import { describe, expect, it } from 'vitest';
import { AdminAttendanceReportsDateFilterDropdown } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/date_filter/AdminAttendanceReportsDateFilterDropdown';
import { AdminAttendanceReportsEmptyState } from '@/app/frontend_admin/admin_attendance/attendance_reports/components/empty_state/AdminAttendanceReportsEmptyState';
import AdminAttendanceReportsSectionState from '@/app/frontend_admin/admin_attendance/attendance_reports/components/main_view/AdminAttendanceReportsSectionState';
import AdminAttendanceReportsProgressBar from '@/app/frontend_admin/admin_attendance/attendance_reports/components/progress_bar/AdminAttendanceReportsProgressBar';
import AdminAttendanceReportsNotFound from '@/app/frontend_admin/admin_attendance/attendance_reports/components/shell/AdminAttendanceReportsNotFound';

describe('Admin Attendance Reports source identity', () => {
  it('matches named exports to their source files', () => {
    expect(AdminAttendanceReportsDateFilterDropdown.name).toBe('AdminAttendanceReportsDateFilterDropdown');
    expect(AdminAttendanceReportsEmptyState.name).toBe('AdminAttendanceReportsEmptyState');
  });
  it('matches default exports to their source files', () => {
    expect(AdminAttendanceReportsSectionState.name).toBe('AdminAttendanceReportsSectionState');
    expect(AdminAttendanceReportsProgressBar.name).toBe('AdminAttendanceReportsProgressBar');
    expect(AdminAttendanceReportsNotFound.name).toBe('AdminAttendanceReportsNotFound');
  });
});
