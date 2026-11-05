// RESPONSIBILITY: Owns only the payroll report API operation. Binary export remains disabled until its host transport contract is verified.
import { adminFinancePayrollReportApiFetch as apiFetch } from '@/app/frontend_admin/admin_finance/finance_payroll_report/utils/AdminFinancePayrollReportApiResponse';
import { ADMIN_FINANCE_PAYROLL_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_payroll_report/config/finance_payroll_report.url_config';
import type { AdminFinancePayrollReportExportParams, AdminFinancePayrollReportQueryParams, PayrollReportData } from '@/app/frontend_admin/admin_finance/finance_payroll_report/types/AdminFinancePayrollReportTypes';
import { reportPayrollDataSchema } from '@/app/frontend_admin/admin_finance/finance_payroll_report/schemas/AdminFinancePayrollReportSchemas';

function buildQuery(params: AdminFinancePayrollReportQueryParams): string {
  const query = new URLSearchParams();
  query.set('from', params.from);
  query.set('to', params.to);
  if (params.branchId && params.branchId !== 'all') query.set('branchId', params.branchId);
  return `?${query.toString()}`;
}

export class AdminFinancePayrollReportBinaryExportContractError extends Error {
  readonly code = 'BINARY_EXPORT_CONTRACT_UNVERIFIED';
  constructor() { super('Export is blocked because the host binary-response contract was not supplied.'); this.name = 'AdminFinancePayrollReportBinaryExportContractError'; }
}

export const AdminFinancePayrollReportApi = {
  fetchPayrollReport: async (params: AdminFinancePayrollReportQueryParams) => apiFetch<PayrollReportData>(`${ ADMIN_FINANCE_PAYROLL_REPORT_API.payroll }${buildQuery(params)}`, { method: 'GET', dataSchema: reportPayrollDataSchema }),
  exportReport: async (params: AdminFinancePayrollReportExportParams): Promise<Blob> => { void params; throw new AdminFinancePayrollReportBinaryExportContractError(); },
};
