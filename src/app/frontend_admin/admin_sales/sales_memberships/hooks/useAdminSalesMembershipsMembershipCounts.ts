"use client";
// RESPONSIBILITY: Queries active/expiring/expired counts through the all-memberships endpoint only.
import { useQuery } from '@tanstack/react-query';
import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsQueryKeys';
import { ADMIN_SALES_MEMBERSHIP_FILTER } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_memberships/api/admin_sales_memberships_api';
import type { UseAdminSalesMembershipCountsParams } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsReportingQueryTypes';
export function useAdminSalesMembershipCounts({ selectedBranchId, search, range, startDate, endDate, enabled }: UseAdminSalesMembershipCountsParams) {
  const params = { limit: '1', page: '1', ...(selectedBranchId !== 'all' ? { branchId: selectedBranchId } : {}), ...(search ? { search } : {}), range, ...(startDate && endDate ? { startDate, endDate } : {}) };
  const active = useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('membership-count', 'active', params), queryFn: () => AdminSalesApi.fetchAllMemberships({ ...params, membershipFilter: ADMIN_SALES_MEMBERSHIP_FILTER.ACTIVE }), enabled });
  const expiringSoon = useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('membership-count', 'expiring_soon', params), queryFn: () => AdminSalesApi.fetchAllMemberships({ ...params, membershipFilter: ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRING_SOON }), enabled });
  const expired = useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('membership-count', 'expired', params), queryFn: () => AdminSalesApi.fetchAllMemberships({ ...params, membershipFilter: ADMIN_SALES_MEMBERSHIP_FILTER.EXPIRED }), enabled });
  return { counts: { active: active.data?.data?.total ?? null, expiringSoon: expiringSoon.data?.data?.total ?? null, expired: expired.data?.data?.total ?? null }, isPending: active.isPending || expiringSoon.isPending || expired.isPending, isError: active.isError || expiringSoon.isError || expired.isError, retry: async () => Promise.all([active.refetch(), expiringSoon.refetch(), expired.refetch()]) };
}
