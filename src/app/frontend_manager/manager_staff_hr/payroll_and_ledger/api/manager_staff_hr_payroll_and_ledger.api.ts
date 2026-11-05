import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/config/manager_staff_hr_payroll_and_ledger.url_config';
import { z } from 'zod';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_SALARY_TYPE_VALUES, MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAYMENT_CYCLE_VALUES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/constants/manager_staff_payroll_and_attendance.constants';

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';


import { payrollSchema, hrSummarySchema, ledgerEntrySchema, managerHrAdvanceResponseSchema, managerHrPayDueResponseSchema } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/schemas/manager_staff_hr_payroll_and_ledger.schemas';
import type { ManagerStaffPayrollAndAttendanceStaffAttendanceRecord } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_payroll_and_attendance_staff_attendance.types';
import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';

/**
 * @description Provides the ManagerStaffPayrollAndAttendanceApi implementation for the hr module.
 * @dependencies @/lib/api, payroll_and_ledger local URL registry, schemas, and types
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
/** Client-side allowlist: strips KYC/bank fields before the staff response enters the query cache. This does not prove the server omitted those fields from the network response. */
const payrollStaffProjectionSchema = z.object({
  id: z.string(), name: z.string(), email: z.string(), phone: z.string(), role: z.string(),
  salary: z.number().int(), branch: z.string(), gender: z.string(), joinDate: z.string(), isActive: z.boolean(),
  salaryType: z.enum(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_SALARY_TYPE_VALUES).optional(), paymentCycle: z.enum(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAYMENT_CYCLE_VALUES).optional(),
  currentDue: z.number().int().optional(), advanceSalary: z.number().int().optional(),
});

function serializeOptionalDate(value: string | Date | undefined): string | undefined {
  if (value === undefined) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

export const ManagerStaffPayrollAndAttendanceApi = {
  fetchStaff: async (params?: Record<string, string>): Promise<ApiResponse<{ staff: Staff[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ staff: z.array(payrollStaffProjectionSchema), total: z.number() }) });
  },

  fetchPayrolls: async (params?: Record<string, string>): Promise<ApiResponse<{ payrolls: Payroll[]; total: number }>> => {
    const query = new URLSearchParams(params || {}).toString();
    return apiFetch(`${MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLLS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });
  },

  generatePayrolls: async (month: string, idempotencyKey: string): Promise<ApiResponse<{ payrolls: Payroll[] }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_GENERATE, { method: 'POST', body: JSON.stringify({ month }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.object({ payrolls: z.array(payrollSchema) }) });
  },

  createPayroll: async (body: Omit<Partial<Payroll>, 'paidAt'> & { paidAt?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Payroll>> => {
    const serializedBody = { ...body, ...(body.paidAt ? { paidAt: serializeOptionalDate(body.paidAt) } : {}) };
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_CREATE, { method: 'POST', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema });
  },

  updatePayroll: async (id: string, body: Omit<Partial<Payroll>, 'paidAt'> & { paidAt?: string | Date }, idempotencyKey: string): Promise<ApiResponse<Payroll>> => {
    const serializedBody = { ...body, ...(body.paidAt ? { paidAt: serializeOptionalDate(body.paidAt) } : {}) };
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_UPDATE(id), { method: 'PATCH', body: JSON.stringify(serializedBody), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema });
  },

  updatePayrollStatus: async (id: string, status: string, idempotencyKey: string): Promise<ApiResponse<Payroll>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema });
  },

  fetchHrSummary: async (): Promise<ApiResponse<HrSummary>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.SUMMARY, { dataSchema: hrSummarySchema });
  },

  fetchLedger: async (staffId: string): Promise<ApiResponse<{ ledger: LedgerEntry[]; total: number }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER(staffId), { dataSchema: z.object({ ledger: z.array(ledgerEntrySchema), total: z.number() }) });
  },

  giveStaffAdvance: async (data: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<{ advanceAmount: number }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_ADVANCE, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerHrAdvanceResponseSchema });
  },

  payStaffDue: async (data: Record<string, unknown>, idempotencyKey: string): Promise<ApiResponse<{ paidAmount: number }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.LEDGER_PAY_DUE, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: managerHrPayDueResponseSchema });
  },

  fetchStaffAttendance: async (staffId: string, month: string): Promise<ApiResponse<{ history: ManagerStaffPayrollAndAttendanceStaffAttendanceRecord[] }>> => {
    return apiFetch(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API.STAFF_ATTENDANCE(staffId, month), { dataSchema: z.object({ history: z.array(z.object({ date: z.string(), checkIn: z.string().optional(), checkOut: z.string().optional(), status: z.string() }).passthrough()) }) });
  }
};
