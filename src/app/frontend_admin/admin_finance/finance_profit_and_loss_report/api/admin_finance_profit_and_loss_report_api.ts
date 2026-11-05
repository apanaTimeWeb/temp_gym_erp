// RESPONSIBILITY: Owns only the pnl report API operation. Binary export remains disabled until its host transport contract is verified.
import { adminFinanceProfitAndLossReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportApiResponse';
import { ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/config/finance_profit_and_loss_report.url_config';
import type { AdminFinanceProfitAndLossReportExportParams, AdminFinanceProfitAndLossReportQueryParams, PnLReportData } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/types/AdminFinanceProfitAndLossReportTypes';
import { reportPnLDataSchema } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/schemas/AdminFinanceProfitAndLossReportSchemas';

function buildQuery(params: AdminFinanceProfitAndLossReportQueryParams): string {
  const query = new URLSearchParams();
  query.set('from', params.from);
  query.set('to', params.to);
  if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
  return `?${query.toString()}`;
}

export class AdminFinanceProfitAndLossReportBinaryExportContractError extends Error {
  readonly code = 'BINARY_EXPORT_CONTRACT_UNVERIFIED';
  constructor() { super('Export is blocked because the host binary-response contract was not supplied.'); this.name = 'AdminFinanceProfitAndLossReportBinaryExportContractError'; }
}

export const AdminFinanceProfitAndLossReportApi = {
  fetchPnLReport: async (params: AdminFinanceProfitAndLossReportQueryParams) => apiFetch<PnLReportData>(`${ ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_API.pnl }${buildQuery(params)}`, { method: 'GET', dataSchema: reportPnLDataSchema }),
  exportReport: async (params: AdminFinanceProfitAndLossReportExportParams): Promise<Blob> => { void params; throw new AdminFinanceProfitAndLossReportBinaryExportContractError(); },
};
