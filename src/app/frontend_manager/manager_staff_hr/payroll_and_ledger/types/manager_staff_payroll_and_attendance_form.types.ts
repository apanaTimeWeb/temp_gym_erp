import type { z } from 'zod';

import type { managerHrAdvanceFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_advance_form.schemas';
import type { managerHrDueFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_due_form.schemas';
import type { managerHrPayrollFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_payroll_form.schemas';
import type { managerHrStaffFormSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_payroll_and_attendance_staff_form.schemas';

export type ManagerStaffPayrollAndAttendanceAdvanceFormValues = z.infer<typeof managerHrAdvanceFormSchema>;
export type ManagerStaffPayrollAndAttendanceDueFormValues = z.infer<typeof managerHrDueFormSchema>;
export type StaffFormInput = z.input<typeof managerHrStaffFormSchema>;
export type StaffFormValues = z.output<typeof managerHrStaffFormSchema>;
export type PayrollFormValues = z.infer<typeof managerHrPayrollFormSchema>;
/**
 * @description Provides the ManagerStaffPayrollAndAttendanceFormTypes implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_staff_hr/manager_hr_schemas/ManagerStaffPayrollAndAttendanceAdvanceFormSchema; @/app/frontend_manager/manager_staff_hr/manager_hr_schemas/ManagerStaffPayrollAndAttendanceDueFormSchema; @/app/frontend_manager/manager_staff_hr/manager_hr_schemas/ManagerStaffPayrollAndAttendancePayrollFormSchema; @/app/frontend_manager/manager_staff_hr/manager_hr_schemas/ManagerStaffPayrollAndAttendanceStaffFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
