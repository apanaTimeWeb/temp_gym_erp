import { z } from 'zod';
import { adminFinanceStaffLedgerManagementApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementApiResponse';
import { ADMIN_FINANCE_STAFF_LEDGER_API } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/config/admin_finance_staff_ledger_management.url_config.ts';
import type { Staff, FinanceStaffLedgerSummary, LedgerEntry } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';
import { staffSchema, financeStaffLedgerSummarySchema, ledgerEntrySchema } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/schemas/AdminFinanceStaffLedgerManagementSchemas';

/** API contract client owned by finance_staff_ledger_management; only this capability's verified operations are exposed. */
export const AdminFinanceStaffLedgerManagementApi = {
  fetchStaff: async (params?: Record<string, string>) => {
    const query = new URLSearchParams(params ?? {}).toString();
    return apiFetch<{ staff: Staff[]; total: number }>(`${ADMIN_FINANCE_STAFF_LEDGER_API.staffBase}${query ? `?${query}` : ''}`, { method: 'GET', dataSchema: z.object({ staff: z.array(staffSchema), total: z.number() }) });
  },
  fetchSummary: async (branchId?: string) => apiFetch<FinanceStaffLedgerSummary>(`${ADMIN_FINANCE_STAFF_LEDGER_API.summary}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { method: 'GET', dataSchema: financeStaffLedgerSummarySchema }),
  fetchLedger: async (staffId: string) => apiFetch<LedgerEntry[]>(ADMIN_FINANCE_STAFF_LEDGER_API.ledger(staffId), { method: 'GET', dataSchema: z.array(ledgerEntrySchema) }),
} as const;
