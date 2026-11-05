import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';


/** Updates one attendance-history filter without overwriting payroll month, view, search, or pagination. */
export function ManagerStaffPayrollAndAttendanceBuildAttendanceHistorySearchParams(currentSearch: string, key: 'month' | 'staffId', value: string | null): string {
  const params = new URLSearchParams(currentSearch);
  const queryKey = key === 'month'
    ? MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES.QUERY_PARAMS.ATTENDANCE_HISTORY_MONTH
    : MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES.QUERY_PARAMS.ATTENDANCE_HISTORY_STAFF_ID;
  if (value) params.set(queryKey, value); else params.delete(queryKey);
  return params.toString();
}
