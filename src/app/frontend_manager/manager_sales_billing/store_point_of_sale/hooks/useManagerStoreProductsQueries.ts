// DATA FLOW: POS product selector → leaf-owned product query; order submission remains in the POS mutation hook.
'use client';
import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/api/manager_sales_billing_store_point_of_sale.api';
import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/api/manager_sales_billing_store_point_of_sale.query_keys';
import type { Product, StoreInitialData, ManagerStoreProductsSortOrder } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';

/**
 * @description Loads the paged product data used by the point-of-sale selector and exposes a cache-safe product updater.
 * @param currentPage One-based page number included in the product query parameters and cache key.
 * @param sortOrder Requested product ordering.
 * @param debouncedSearch Search text after the owning logic hook's debounce has settled.
 * @param startDate Inclusive lower date filter passed to the product API.
 * @param endDate Inclusive upper date filter passed to the product API.
 * @param categoryFilter Category filter passed to the product API.
 * @param stockFilter Stock-status filter passed to the product API.
 * @param _showToast Compatibility callback accepted by the current hook contract; this query hook does not invoke it.
 * @param initialData Optional route-provided product seed used as TanStack Query initial data.
 * @dependencies Uses ManagerStoreProductsApi, ManagerStoreProductsQueryKeys, and the TanStack Query client.
 * @cacheKey ManagerStoreProductsQueryKeys.products(params), where params include page, limit, search, category, stock, date range, and sort order.
 * @edge-case Missing API data is normalized to an empty product list and zero total; setProducts keeps the cached total synchronized with the replacement list.
 * @returns Product rows, setProducts cache updater, pending/error state, the query error, and loadAll refetch callback.
 */
export function useManagerStoreProductsQueries(currentPage: number, sortOrder: ManagerStoreProductsSortOrder, debouncedSearch: string, startDate: string, endDate: string, categoryFilter: string, stockFilter: string, _showToast: (msg: string, type: import('@/components/ui/manager_toast/ManagerToastTypes').ManagerToastType) => void, initialData?: StoreInitialData | null) {
  const queryClient = useQueryClient();
  const params = useMemo(() => ({ page: String(currentPage), limit: '12', search: debouncedSearch, category: categoryFilter, stock: stockFilter, startDate, endDate, sortOrder }), [currentPage, debouncedSearch, categoryFilter, stockFilter, startDate, endDate, sortOrder]);
  const key = ManagerStoreProductsQueryKeys.products(params);
  const productsQuery = useQuery({ queryKey: key, queryFn: async () => { const response = await ManagerStoreProductsApi.fetchProducts(params); if (!response.success) throw new Error(response.message || 'Unable to load products'); return response.data; }, initialData: initialData ? { products: initialData.products, total: initialData.products.length } : undefined });
  const setProducts = useCallback((updater: Product[] | ((previous: Product[]) => Product[])) => queryClient.setQueryData<{products: Product[]; total: number}>(key, previous => { const current=previous?.products??[]; const products=typeof updater==='function'?updater(current):updater; return {products,total:products.length}; }), [key, queryClient]);
  const loadAll = useCallback(async () => { await productsQuery.refetch(); }, [productsQuery]);
  return { products: productsQuery.data?.products ?? [], setProducts, isPending: productsQuery.isPending, isError: productsQuery.isError, error: productsQuery.error, loadAll };
}
