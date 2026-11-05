// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_revenue_report/api/admin_finance_revenue_report_branch_reference_api.ts)

import { adminFinanceRevenueReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportApiResponse';
import { z } from 'zod';
import { ADMIN_FINANCE_REVENUE_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_revenue_report/config/finance_revenue_report.url_config';
import type { AdminFinanceRevenueReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminFinanceRevenueReportBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<{ items: AdminFinanceRevenueReportBranchReference[] }>(`${ADMIN_FINANCE_REVENUE_REPORT_API.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
