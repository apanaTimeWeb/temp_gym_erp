// RESPONSIBILITY: Owns typed API operations for finance_branch_profit_and_loss; it does not implement the global HTTP transport or backend authorization.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_branch_profit_and_loss/api/admin_finance_branch_profit_and_loss_api.ts)

import { z } from 'zod';
import { adminFinancePnlReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossApiResponse';
import { ADMIN_FINANCE_PNL_API_URL } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/config/admin_finance_branch_profit_and_loss.url_config';
import { branchPnlRecordSchema } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/schemas/AdminFinanceBranchProfitAndLossSchemas';
import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';
export const AdminFinancePnlApi = {
  fetchBranchPnl: async (period: string, params?: { status?: string; sortKey?: string; sortDir?: string }) => {
    const query = new URLSearchParams({ period });
    Object.entries(params ?? {}).forEach(([key, value]) => { if (value && value !== 'ALL') query.set(key, value); });
    return apiFetch<BranchPnlRecord[]>(`${ADMIN_FINANCE_PNL_API_URL}?${query.toString()}`, { method: 'GET', dataSchema: z.array(branchPnlRecordSchema) });
  },
};
