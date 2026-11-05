"use client";
// RESPONSIBILITY: Fetches the all-memberships list owned by this leaf only.
import { useQuery } from '@tanstack/react-query';
import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsQueryKeys';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_memberships/api/admin_sales_memberships_api';
export function useAdminSalesMembershipsEntityQueries(params: { queryParams: Record<string, string>; range: string; selectedBranchId: string; enabled: boolean }) {
  return useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('all-memberships', params.queryParams, params.range, params.selectedBranchId), queryFn: () => AdminSalesApi.fetchAllMemberships({ ...params.queryParams, range: params.range }), enabled: params.enabled });
}
