// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
// DATA FLOW: feature hook/view → feature API client → apiFetch host transport → typed ApiResponse/data validation → UI/cache (admin_sales/sales_membership_growth_report/api/admin_sales_analytics_branch_reference_api.ts)

import { adminSalesMembershipGrowthReportAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportApiResponse';
import { z } from 'zod';
import { ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/config/sales_membership_growth_report.url_config';
import type { AdminSalesMembershipGrowthReportBranchReference } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminSalesMembershipGrowthReportBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<{ items: AdminSalesMembershipGrowthReportBranchReference[] }>(`${ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
