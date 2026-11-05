// RESPONSIBILITY: Owns only the revenue report API operation. Binary export remains disabled until its host transport contract is verified.
import { adminFinanceRevenueReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportApiResponse';
import { ADMIN_FINANCE_REVENUE_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_revenue_report/config/finance_revenue_report.url_config';
import type { AdminFinanceRevenueReportExportParams, AdminFinanceRevenueReportQueryParams, RevenueReportData } from '@/app/frontend_admin/admin_finance/finance_revenue_report/types/AdminFinanceRevenueReportTypes';
import { reportRevenueDataSchema } from '@/app/frontend_admin/admin_finance/finance_revenue_report/schemas/AdminFinanceRevenueReportSchemas';

function buildQuery(params: AdminFinanceRevenueReportQueryParams): string {
  const query = new URLSearchParams();
  query.set('from', params.from);
  query.set('to', params.to);
  if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
  return `?${query.toString()}`;
}

export class AdminFinanceRevenueReportBinaryExportContractError extends Error {
  readonly code = 'BINARY_EXPORT_CONTRACT_UNVERIFIED';
  constructor() { super('Export is blocked because the host binary-response contract was not supplied.'); this.name = 'AdminFinanceRevenueReportBinaryExportContractError'; }
}

export const AdminFinanceRevenueReportApi = {
  fetchRevenueReport: async (params: AdminFinanceRevenueReportQueryParams) => apiFetch<RevenueReportData>(`${ ADMIN_FINANCE_REVENUE_REPORT_API.revenue }${buildQuery(params)}`, { method: 'GET', dataSchema: reportRevenueDataSchema }),
  exportReport: async (params: AdminFinanceRevenueReportExportParams): Promise<Blob> => { void params; throw new AdminFinanceRevenueReportBinaryExportContractError(); },
};
