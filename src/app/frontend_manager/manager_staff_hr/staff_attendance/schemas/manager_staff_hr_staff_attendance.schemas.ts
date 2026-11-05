import { z } from 'zod';

import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_SALARY_TYPE_VALUES, MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAYMENT_CYCLE_VALUES, MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_LEDGER_ENTRY_TYPE_VALUES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/constants/manager_staff_payroll_and_attendance.constants';

/**
 * @description Provides the ManagerStaffPayrollAndAttendanceSchema implementation for the hr module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const emergencyContactSchema = z.object({ name: z.string(), phone: z.string(), relation: z.string() }).optional();
const documentSchema = z.object({ type: z.string(), url: z.string(), uploadedAt: z.string() });
export const staffSchema = z.object({ id: z.string(), name: z.string(), email: z.string(), phone: z.string(), role: z.string(), salary: z.number().int(), branch: z.string(), gender: z.string(), address: z.string().optional(), aadhaar: z.string().optional(), upiId: z.string().optional(), advanceSalary: z.number().int().optional(), joinDate: z.string(), isActive: z.boolean(), salaryType: z.enum(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_SALARY_TYPE_VALUES).optional(), paymentCycle: z.enum(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAYMENT_CYCLE_VALUES).optional(), currentDue: z.number().int().optional(), bankAccountNumber: z.string().optional(), ifscCode: z.string().optional(), panNumber: z.string().optional(), department: z.string().optional(), emergencyContact: emergencyContactSchema, documents: z.array(documentSchema).optional() });
export const payrollSchema = z.object({ id: z.string(), staffId: z.string(), month: z.string(), amount: z.number().int(), netPayable: z.number().int(), paidAmount: z.number().int(), pendingAmount: z.number().int(), status: z.string(), paidAt: z.string().optional(), notes: z.string().optional(), deductions: z.object({ tds: z.number().int(), pf: z.number().int(), esi: z.number().int(), other: z.number().int() }), staff: z.object({ name: z.string(), role: z.string() }).optional() });
export const managerHrAdvanceResponseSchema = z.object({ advanceAmount: z.number().int() });
export const managerHrPayDueResponseSchema = z.object({ paidAmount: z.number().int() });

export const hrSummarySchema = z.object({ totalSalaryThisMonth: z.number().int(), totalSalaryPaid: z.number().int(), totalSalaryDue: z.number().int(), totalAdvanceGiven: z.number().int(), pendingPaymentsCount: z.number(), totalStaff: z.number(), activeStaff: z.number(), totalPayrollThisMonth: z.number().int(), paidCount: z.number() });
export const ledgerEntrySchema = z.object({ id: z.string(), staffId: z.string(), date: z.string(), type: z.enum(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_LEDGER_ENTRY_TYPE_VALUES), credit: z.number().int(), debit: z.number().int(), balance: z.number().int(), notes: z.string().optional(), referenceNo: z.string().optional(), paymentMode: z.string().optional() });
