"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
// DATA FLOW: AdminFinancePayrollReportBranchReferenceApi → TanStack Query → Admin reports component.

import { ADMIN_FINANCE_PAYROLL_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_payroll_report/constants/AdminFinancePayrollReportQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminFinancePayrollReportBranchReferenceApi } from '@/app/frontend_admin/admin_finance/finance_payroll_report/api/admin_finance_payroll_report_branch_reference_api';
/** @description useAdminFinancePayrollReportBranchReference: Provides minimal branch options to the Admin reports UI without cross-module imports. @dependencies Consumes AdminReportsQueryKeys, AdminFinancePayrollReportBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinancePayrollReportBranchReference() {
  return useQuery({ queryKey: ADMIN_FINANCE_PAYROLL_REPORT_QUERY_KEYS.key('branch-reference'), queryFn: async () => {
    const result = await AdminFinancePayrollReportBranchReferenceApi.fetchReportBranchReferences();
    if (!result.data) throw new Error('Branch reference response has no data');
    return result.data.items;
  }, staleTime: 300000 });
}
