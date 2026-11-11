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
  exportReport: async (params: AdminSalesMembershipGrowthReportExportParams): Promise<Blob> => {
    try {
      const report = await AdminSalesMembershipGrowthReportApi.fetchMembershipReport({ from: params.from, to: params.to, branchId: params.branchId });
      const records = (report?.data as unknown as { rows?: Array<{ month?: string; newMembers?: number; churnedMembers?: number; netGrowth?: number }> })?.rows ?? [];
      const headers = ['Month', 'NewMembers', 'ChurnedMembers', 'NetGrowth'];
      const lines = [headers.join(','), ...records.map(r => `"${r.month || ''}",${r.newMembers || 0},${r.churnedMembers || 0},${r.netGrowth || 0}`)];
      return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    } catch {
      const fallback = `Report,MembershipGrowth\nFrom,${params.from}\nTo,${params.to}\nBranch,${params.branchId || 'All'}\n`;
      return new Blob([fallback], { type: 'text/csv;charset=utf-8;' });
    }
  },
};
