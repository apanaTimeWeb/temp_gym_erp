import { z } from 'zod';
import { adminFinanceStaffDuesManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementApiResponse';
import { ADMIN_FINANCE_STAFF_DUES_API } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/config/admin_finance_staff_dues_management.url_config';
import type { Staff, FinanceStaffDuesSummary } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes';
import { staffSchema, financeStaffDuesSummarySchema } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/schemas/AdminFinanceStaffDuesManagementSchemas';

/** API contract client owned by finance_staff_dues_management; only this capability's verified operations are exposed. */
export const AdminFinanceStaffDuesManagementApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<{ staff: Staff[]; total: number }>(`${ADMIN_FINANCE_STAFF_DUES_API.staffBase}${query ? `?${query}` : ''}`, { method: 'GET', dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchSummary: async (branchId?: string) => apiFetch<FinanceStaffDuesSummary>(`${ADMIN_FINANCE_STAFF_DUES_API.summary}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { method: 'GET', dataSchema: financeStaffDuesSummarySchema }),
  payDue: async (payload: Record<string, unknown>, idempotencyKey: string) => apiFetch<null>(ADMIN_FINANCE_STAFF_DUES_API.duesPay, { method: 'POST', body: JSON.stringify(payload), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),
} as const;
