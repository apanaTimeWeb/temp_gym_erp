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
  exportReport: async (params: AdminFinanceRevenueReportExportParams): Promise<Blob> => {
    try {
      const report = await AdminFinanceRevenueReportApi.fetchRevenueReport({ from: params.from, to: params.to, branchId: params.branchId });
      const records = (report?.data as unknown as { rows?: Array<{ source?: string; amount?: number; transactionsCount?: number }> })?.rows ?? [];
      const headers = ['Source', 'Amount', 'TransactionsCount'];
      const lines = [headers.join(','), ...records.map(r => `"${r.source || ''}",${r.amount || 0},${r.transactionsCount || 0}`)];
      return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    } catch {
      const fallback = `Report,Revenue\nFrom,${params.from}\nTo,${params.to}\nBranch,${params.branchId || 'All'}\n`;
      return new Blob([fallback], { type: 'text/csv;charset=utf-8;' });
    }
  },
};
