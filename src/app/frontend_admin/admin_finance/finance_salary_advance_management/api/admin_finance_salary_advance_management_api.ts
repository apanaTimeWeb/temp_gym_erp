import { z } from 'zod';
import { adminFinanceSalaryAdvanceManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/utils/AdminFinanceSalaryAdvanceManagementApiResponse';
import { ADMIN_FINANCE_SALARY_ADVANCE_API } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/config/admin_finance_salary_advance_management.url_config.ts';
import type { Staff, FinanceSalaryAdvanceSummary } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementTypes';
import { staffSchema, financeSalaryAdvanceSummarySchema } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/schemas/AdminFinanceSalaryAdvanceManagementSchemas';

/** API contract client owned by finance_salary_advance_management; only this capability's verified operations are exposed. */
export const AdminFinanceSalaryAdvanceManagementApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<{ staff: Staff[]; total: number }>(`${ADMIN_FINANCE_SALARY_ADVANCE_API.staffBase}${query ? `?${query}` : ''}`, { method: 'GET', dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchSummary: async (branchId?: string) => apiFetch<FinanceSalaryAdvanceSummary>(`${ADMIN_FINANCE_SALARY_ADVANCE_API.summary}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { method: 'GET', dataSchema: financeSalaryAdvanceSummarySchema }),
  giveAdvance: async (payload: Record<string, unknown>, idempotencyKey: string) => apiFetch<null>(ADMIN_FINANCE_SALARY_ADVANCE_API.advances, { method: 'POST', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
} as const;
