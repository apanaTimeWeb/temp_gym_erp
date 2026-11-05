import { z } from 'zod';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/constants/manager_staff_payroll_and_attendance_shared.constants';

/**
 * @description Provides the ManagerStaffPayrollAndAttendancePayrollFormSchema implementation for the hr module.
 * @dependencies @/app/frontend_manager/manager_staff_hr/manager_hr_constants/ManagerStaffPayrollAndAttendanceSharedConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerHrPayrollFormSchema = z.object({ staffId: z.string().min(1, 'Please select staff'), month: z.string().min(1, 'Month is required'), amount: z.number().min(0, 'Amount must be positive').max(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large'), paidAmount: z.number().min(0, 'Paid amount cannot be negative').max(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS, 'Amount is too large'), notes: z.string().optional() }).refine((data) => data.paidAmount <= data.amount, { message: 'Paid amount cannot exceed total amount', path: ['paidAmount'] });
