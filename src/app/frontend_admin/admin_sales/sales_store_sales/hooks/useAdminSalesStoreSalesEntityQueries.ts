"use client";
// RESPONSIBILITY: Queries only Store Sales order records and summary.
import { useQuery } from '@tanstack/react-query';
import { ADMIN_SALES_QUERY_KEYS } from '@/app/frontend_admin/admin_sales/sales_store_sales/constants/AdminSalesStoreSalesQueryKeys';
import { AdminSalesApi } from '@/app/frontend_admin/admin_sales/sales_store_sales/api/admin_sales_store_sales_api';
export function useAdminSalesStoreSalesEntityQueries(params:{queryParams:Record<string,string>;summaryParams:Record<string,string>;enabled:boolean}){const orders=useQuery({queryKey:ADMIN_SALES_QUERY_KEYS.key('store-orders',params.queryParams),queryFn:()=>AdminSalesApi.fetchStoreOrders(params.queryParams),enabled:params.enabled});const summary=useQuery({queryKey:ADMIN_SALES_QUERY_KEYS.key('store-summary',params.summaryParams),queryFn:()=>AdminSalesApi.fetchStoreSummary(params.summaryParams),enabled:params.enabled});return {orders,summary};}
