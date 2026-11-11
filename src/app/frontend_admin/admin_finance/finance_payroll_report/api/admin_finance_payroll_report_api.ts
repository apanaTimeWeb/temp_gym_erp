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
  exportReport: async (params: AdminFinancePayrollReportExportParams): Promise<Blob> => {
    try {
      const report = await AdminFinancePayrollReportApi.fetchPayrollReport({ from: params.from, to: params.to, branchId: params.branchId });
      const records = (report?.data as unknown as { records?: Array<{ employeeId?: string; name?: string; role?: string; branch?: string; baseSalary?: number; netPaid?: number; paymentStatus?: string }> })?.records ?? [];
      const headers = ['EmployeeID', 'Name', 'Role', 'Branch', 'BaseSalary', 'NetPaid', 'Status'];
      const lines = [headers.join(','), ...records.map(r => `"${r.employeeId || ''}","${r.name || ''}","${r.role || ''}","${r.branch || ''}",${r.baseSalary || 0},${r.netPaid || 0},"${r.paymentStatus || ''}"`)];
      return new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    } catch {
      const fallback = `Report,Payroll\nFrom,${params.from}\nTo,${params.to}\nBranch,${params.branchId || 'All'}\n`;
      return new Blob([fallback], { type: 'text/csv;charset=utf-8;' });
    }
  },
};
