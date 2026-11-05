// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_finance/finance_payroll_report/api/admin_finance_payroll_report_branch_reference_api.ts)

import { adminFinancePayrollReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_payroll_report/utils/AdminFinancePayrollReportApiResponse';
import { z } from 'zod';
import { ADMIN_FINANCE_PAYROLL_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_payroll_report/config/finance_payroll_report.url_config';
import type { AdminFinancePayrollReportBranchReference } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminFinancePayrollReportBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<{ items: AdminFinancePayrollReportBranchReference[] }>(`${ADMIN_FINANCE_PAYROLL_REPORT_API.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
