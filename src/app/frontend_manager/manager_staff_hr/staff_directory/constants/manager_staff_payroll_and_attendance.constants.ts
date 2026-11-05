/** Canonical module-level constant registry for manager_hr; child constant files remain the source of individual entries. */
export const ManagerStaffPayrollAndAttendanceConstants = {} as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_VALUES = {
  PRESENT: 'PRESENT',
  PRESENT_DISPLAY: 'Present',
  PENDING: 'PENDING',
  ABSENT: 'ABSENT',
  ABSENT_DISPLAY: 'Absent',
  LEAVE: 'Leave',
  PAID: 'PAID',
  PAID_DISPLAY: 'Paid',
} as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_STATUS_PRESENT = 'PRESENT' as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_SALARY_TYPE_VALUES = ['Monthly', 'Daily'] as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAYMENT_CYCLE_VALUES = ['Monthly', 'Bi-Weekly', 'Weekly'] as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_LEDGER_ENTRY_TYPE_VALUES = ['Salary Generated', 'Salary Paid', 'Advance Given', 'Due Paid'] as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_GENDER_VALUES = ['MALE', 'FEMALE', 'OTHER'] as const;
