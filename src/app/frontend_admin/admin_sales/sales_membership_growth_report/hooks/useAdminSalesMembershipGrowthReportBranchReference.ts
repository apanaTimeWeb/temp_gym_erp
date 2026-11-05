"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin reports UI without cross-module imports.
// DATA FLOW: AdminSalesMembershipGrowthReportBranchReferenceApi → TanStack Query → Admin reports component.

import { ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/constants/AdminSalesMembershipGrowthReportQueryKeys';
import { useQuery } from '@tanstack/react-query';
import { AdminSalesMembershipGrowthReportBranchReferenceApi } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/api/admin_sales_membership_growth_report_branch_reference_api';
/** @description useAdminSalesMembershipGrowthReportBranchReference: Provides minimal branch options to the Admin reports UI without cross-module imports. @dependencies Consumes AdminSalesMembershipGrowthReportQueryKeys, AdminSalesMembershipGrowthReportBranchReferenceApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminSalesMembershipGrowthReportBranchReference() {
  return useQuery({ queryKey: ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminSalesMembershipGrowthReportBranchReferenceApi.fetchReportBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
