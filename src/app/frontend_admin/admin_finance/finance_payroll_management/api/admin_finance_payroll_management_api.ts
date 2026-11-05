import { z } from 'zod';
import { adminFinancePayrollManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_payroll_management/utils/AdminFinancePayrollManagementApiResponse';
import { ADMIN_FINANCE_PAYROLL_API } from '@/app/frontend_admin/admin_finance/finance_payroll_management/config/admin_finance_payroll_management.url_config.ts';
import type { Staff, Payroll, FinancePayrollSummary } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import { staffSchema, payrollSchema, financePayrollSummarySchema } from '@/app/frontend_admin/admin_finance/finance_payroll_management/schemas/AdminFinancePayrollManagementSchemas';

/** API contract client owned by finance_payroll_management; only this capability's verified operations are exposed. */
export const AdminFinancePayrollManagementApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<{ staff: Staff[]; total: number }>(`${ADMIN_FINANCE_PAYROLL_API.staffBase}${query ? `?${query}` : ''}`, { method: 'GET', dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchSummary: async (branchId?: string) => apiFetch<FinancePayrollSummary>(`${ADMIN_FINANCE_PAYROLL_API.summary}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { method: 'GET', dataSchema: financePayrollSummarySchema }),
  fetchPayrolls: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<{ payrolls: Payroll[]; total: number }>(`${ADMIN_FINANCE_PAYROLL_API.payrollsBase}${query ? `?${query}` : ''}`, { method: 'GET', dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });
  },
  createPayroll: async (payload: Partial<Payroll>, idempotencyKey: string) => apiFetch<Payroll>(ADMIN_FINANCE_PAYROLL_API.payrollsBase, { method: 'POST', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  updatePayroll: async (id: string, payload: Partial<Payroll>, idempotencyKey: string) => apiFetch<Payroll>(ADMIN_FINANCE_PAYROLL_API.payrollUpdate(id), { method: 'PATCH', body: JSON.stringify({ id, ...payload }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),
  updateStaff: async (id: string, payload: Partial<Staff>, idempotencyKey: string) => apiFetch<Staff>(ADMIN_FINANCE_PAYROLL_API.staffUpdate(id), { method: 'PATCH', body: JSON.stringify({ ...payload, id }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: staffSchema }),
} as const;
