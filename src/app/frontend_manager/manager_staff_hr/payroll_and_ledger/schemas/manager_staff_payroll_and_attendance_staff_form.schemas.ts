// RESPONSIBILITY: Defines validation for creating and editing staff profiles.
import { z } from 'zod';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_GENDER_VALUES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';
/**
 * @description Provides the ManagerStaffPayrollAndAttendanceStaffFormSchema implementation for the hr module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerHrStaffFormSchema = z.object({
  name: z.string().min(2, 'Name is required').regex(/^[\p{L}\p{M}\s.'’-]+$/u, 'Use letters and common name punctuation'),
  email: z.string().email('Invalid email address'),
  phone: z.string().trim().regex(/^\d{10}$/, 'Phone number must be a valid 10-digit number'),
  role: z.string().min(2, 'Role is required'), salary: z.number().min(0, 'Salary must be positive'),
  gender: z.enum(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_GENDER_VALUES), address: z.string().optional(), joinDate: z.string(),
  temporaryPassword: z.string().optional().refine((val) => !val || val.length >= 8, { message: 'Password must be at least 8 characters' }),
  isActive: z.boolean().default(true), aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must be exactly 12 digits').optional().or(z.literal('')),
  upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').optional().or(z.literal('')),
  advanceSalary: z.number().min(0, 'Advance cannot be negative').optional().default(0),
  bankName: z.string().optional().or(z.literal('')),
  bankAccountNumber: z.string().regex(/^\d{9,18}$/, 'Account number must be 9-18 digits').optional().or(z.literal('')),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format').optional().or(z.literal('')),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format').optional().or(z.literal('')),
  emergencyContactName: z.string().optional().or(z.literal('')),
  emergencyContactPhone: z.string().regex(/^\d{10}$/, 'Emergency phone must be 10 digits').optional().or(z.literal('')),
});
