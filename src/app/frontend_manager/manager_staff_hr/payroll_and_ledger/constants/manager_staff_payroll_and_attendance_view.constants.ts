import type { ManagerStaffPayrollAndAttendanceViewId } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';
export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_VIEW_IDS = ['trainer-list', 'trainer-attendance', 'salary-payments', 'staff-ledger', 'give-advance', 'pay-due'] as const satisfies readonly ManagerStaffPayrollAndAttendanceViewId[];
export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_DEFAULT_VIEW: ManagerStaffPayrollAndAttendanceViewId = 'trainer-list';
