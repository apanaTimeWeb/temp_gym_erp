"use client";
// RESPONSIBILITY: Fetches the pending-payments list owned by this leaf only.
import { useQuery } from '@tanstack/react-query';
import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsQueryKeys';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_pending_payments/api/admin_sales_pending_payments_api';
export function useAdminSalesPendingPaymentsEntityQueries(params: { queryParams: Record<string, string>; enabled: boolean }) {
 return useQuery({ queryKey: ADMIN_SALES_QUERY_KEYS.key('pending-payments', params.queryParams), queryFn: () => AdminSalesApi.fetchPendingPayments(params.queryParams), enabled: params.enabled });
}
