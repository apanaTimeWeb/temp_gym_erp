// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_profit_and_loss_report/api/admin_finance_profit_and_loss_report_branch_reference_api.ts)

import { adminFinanceProfitAndLossReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportApiResponse';
import { z } from 'zod';
import { ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/config/finance_profit_and_loss_report.url_config';
import type { AdminFinanceProfitAndLossReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminFinanceProfitAndLossReportBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<{ items: AdminFinanceProfitAndLossReportBranchReference[] }>(`${ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_API.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
