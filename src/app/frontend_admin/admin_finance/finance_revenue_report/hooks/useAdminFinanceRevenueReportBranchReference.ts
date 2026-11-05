"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
// DATA FLOW: AdminFinanceRevenueReportBranchReferenceApi → TanStack Query → Admin reports component.

import { ADMIN_FINANCE_REVENUE_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_revenue_report/constants/AdminFinanceRevenueReportQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceRevenueReportBranchReferenceApi } from '@/app/frontend_admin/admin_finance/finance_revenue_report/api/admin_finance_revenue_report_branch_reference_api';
/** @description useAdminFinanceRevenueReportBranchReference: Provides minimal branch options to the Admin reports UI without cross-module imports. @dependencies Consumes AdminReportsQueryKeys, AdminFinanceRevenueReportBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinanceRevenueReportBranchReference() {
  return useQuery({ queryKey: ADMIN_FINANCE_REVENUE_REPORT_QUERY_KEYS.key('branch-reference'), queryFn: async () => {
    const result = await AdminFinanceRevenueReportBranchReferenceApi.fetchReportBranchReferences();
    if (!result.data) throw new Error('Branch reference response has no data');
    return result.data.items;
  }, staleTime: 300000 });
}
