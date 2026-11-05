"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
// DATA FLOW: AdminFinanceProfitAndLossReportBranchReferenceApi → TanStack Query → Admin reports component.

import { ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/constants/AdminFinanceProfitAndLossReportQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminFinanceProfitAndLossReportBranchReferenceApi } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/api/admin_finance_profit_and_loss_report_branch_reference_api';
/** @description useAdminFinanceProfitAndLossReportBranchReference: Provides minimal branch options to the Admin reports UI without cross-module imports. @dependencies Consumes AdminReportsQueryKeys, AdminFinanceProfitAndLossReportBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinanceProfitAndLossReportBranchReference() {
  return useQuery({ queryKey: ADMIN_FINANCE_PROFIT_AND_LOSS_REPORT_QUERY_KEYS.key('branch-reference'), queryFn: async () => {
    const result = await AdminFinanceProfitAndLossReportBranchReferenceApi.fetchReportBranchReferences();
    if (!result.data) throw new Error('Branch reference response has no data');
    return result.data.items;
  }, staleTime: 300000 });
}
