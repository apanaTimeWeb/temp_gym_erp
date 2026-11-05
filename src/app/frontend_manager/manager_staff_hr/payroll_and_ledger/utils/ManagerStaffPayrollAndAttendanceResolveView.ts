// RESPONSIBILITY: Validates and resolves HR view identifiers.
import type { ManagerStaffPayrollAndAttendanceViewId } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_DEFAULT_VIEW, MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_VIEW_IDS } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance_view.constants';

export function resolveManagerStaffPayrollAndAttendanceView(value: string | null | undefined): ManagerStaffPayrollAndAttendanceViewId {
  return MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_VIEW_IDS.includes(value as ManagerStaffPayrollAndAttendanceViewId) ? value as ManagerStaffPayrollAndAttendanceViewId : MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_DEFAULT_VIEW;
}
