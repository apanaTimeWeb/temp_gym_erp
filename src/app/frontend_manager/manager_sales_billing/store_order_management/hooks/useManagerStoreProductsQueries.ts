// DATA FLOW: Order route URL state → leaf-owned orders query → order table and receipt actions.
'use client';
import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_order_management/api/manager_sales_billing_store_order_management.api';
import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_order_management/api/manager_sales_billing_store_order_management.query_keys';
import type { StoreInitialData, ManagerStoreProductsSortOrder } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_sales_billing_store_order_management.types';

/**
 * @description Loads the paged order records shown by store order management and exposes their TanStack Query status.
 * @param currentPage One-based page number included in the order query parameters and cache key.
 * @param sortOrder Requested order ordering.
 * @param debouncedSearch Search text after the owning logic hook's debounce has settled.
 * @param startDate Inclusive lower date filter passed to the order API.
 * @param endDate Inclusive upper date filter passed to the order API.
 * @param _categoryFilter Compatibility argument retained by the shared query-hook signature; orders are not filtered by product category here.
 * @param _stockFilter Compatibility argument retained by the shared query-hook signature; orders are not filtered by product stock here.
 * @param _showToast Compatibility callback accepted by the current hook contract; this query hook does not invoke it.
 * @param initialData Optional route-provided order seed used as TanStack Query initial data.
 * @dependencies Uses ManagerStoreProductsApi, ManagerStoreProductsQueryKeys, and TanStack Query.
 * @cacheKey ManagerStoreProductsQueryKeys.orders(orderParams), keyed by page, limit, search, date range, and sort order.
 * @edge-case Missing or failed API data is surfaced as a query error; initialData is used only when supplied by the route.
 * @returns Orders, total order count, pending/error state, the query error, and loadAll refetch callback.
 */
export function useManagerStoreProductsQueries(
  currentPage: number,
  sortOrder: ManagerStoreProductsSortOrder,
  debouncedSearch: string,
  startDate: string,
  endDate: string,
  _categoryFilter: string,
  _stockFilter: string,
  _showToast: (msg: string, type: import('@/components/ui/manager_toast/ManagerToastTypes').ManagerToastType) => void,
  initialData?: StoreInitialData | null,
) {
  const orderParams = useMemo(() => ({ page: String(currentPage), limit: '10', search: debouncedSearch, startDate, endDate, sortOrder }), [currentPage, debouncedSearch, startDate, endDate, sortOrder]);
  const ordersQuery = useQuery({
    queryKey: ManagerStoreProductsQueryKeys.orders(orderParams),
    queryFn: async () => { const response = await ManagerStoreProductsApi.fetchOrders(orderParams); if (!response.success || !response.data) throw new Error(response.message || 'Unable to load orders'); return response.data; },
    initialData: initialData ? { orders: initialData.orders, total: initialData.totalOrders } : undefined,
  });
  const loadAll = useCallback(async () => { await ordersQuery.refetch(); }, [ordersQuery]);
  return { orders: ordersQuery.data?.orders ?? [], totalOrders: ordersQuery.data?.total ?? 0, isPending: ordersQuery.isPending, isError: ordersQuery.isError, error: ordersQuery.error, loadAll };
}
