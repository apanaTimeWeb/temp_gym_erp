// RESPONSIBILITY: Owns only the membership report API operation. Binary export remains disabled until its host transport contract is verified.
import { adminSalesMembershipGrowthReportAnalyticsApiFetch as apiFetch } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/utils/AdminSalesMembershipGrowthReportApiResponse';
import { ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/config/sales_membership_growth_report.url_config';
import type { AdminSalesMembershipGrowthReportExportParams, AdminSalesMembershipGrowthReportQueryParams, MembershipReportData } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportTypes';
import { reportMembershipDataSchema } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/schemas/AdminSalesMembershipGrowthReportSchemas';

function buildQuery(params: AdminSalesMembershipGrowthReportQueryParams): string {
  const query = new URLSearchParams();
  query.set('from', params.from);
  query.set('to', params.to);
  if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
  return `?${query.toString()}`;
}

export class AdminSalesMembershipGrowthReportBinaryExportContractError extends Error {
  readonly code = 'BINARY_EXPORT_CONTRACT_UNVERIFIED';
  constructor() { super('Export is blocked because the host binary-response contract was not supplied.'); this.name = 'AdminSalesMembershipGrowthReportBinaryExportContractError'; }
}

export const AdminSalesMembershipGrowthReportApi = {
  fetchMembershipReport: async (params: AdminSalesMembershipGrowthReportQueryParams) => apiFetch<MembershipReportData>(`${ ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API.membership }${buildQuery(params)}`, { method: 'GET', dataSchema: reportMembershipDataSchema }),
  exportReport: async (params: AdminSalesMembershipGrowthReportExportParams): Promise<Blob> => { void params; throw new AdminSalesMembershipGrowthReportBinaryExportContractError(); },
};
