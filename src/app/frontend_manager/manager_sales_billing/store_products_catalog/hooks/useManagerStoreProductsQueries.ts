// DATA FLOW: Catalog filters → product and summary queries → catalog grid and KPI cards.
'use client';
import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/api/manager_sales_billing_store_products_catalog.api';
import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/api/manager_sales_billing_store_products_catalog.query_keys';
import type { Product, StoreSummary, StoreInitialData, ManagerStoreProductsSortOrder } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';

/**
 * @description Loads the catalog product page and store summary as separate server-state queries, with cache-safe local update helpers.
 * @param currentPage One-based product page number.
 * @param sortOrder Requested product ordering.
 * @param debouncedSearch Search text after the owning logic hook's debounce has settled.
 * @param startDate Inclusive lower date filter passed to the product API.
 * @param endDate Inclusive upper date filter passed to the product API.
 * @param categoryFilter Product category filter.
 * @param stockFilter Product stock-status filter.
 * @param _showToast Compatibility callback accepted by the current hook contract; this query hook does not invoke it.
 * @param initialData Optional route-provided products and summary used to seed the two queries.
 * @dependencies Uses ManagerStoreProductsApi, ManagerStoreProductsQueryKeys, and the TanStack Query client.
 * @cacheKey Uses ManagerStoreProductsQueryKeys.products(params) for the filtered page and ManagerStoreProductsQueryKeys.summary() for the store summary.
 * @edge-case Product and summary requests retain independent cache entries; absent product data becomes an empty list/zero total and absent summary data becomes null.
 * @returns Products and summary with cache updater callbacks, combined pending/error state, the first available query error, and loadAll refetch callback.
 */
export function useManagerStoreProductsQueries(currentPage:number,sortOrder:ManagerStoreProductsSortOrder,debouncedSearch:string,startDate:string,endDate:string,categoryFilter:string,stockFilter:string,_showToast:(msg:string,type:import('@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/ManagerStoreProductsCatalogLocalToastTypes').ManagerToastType)=>void,initialData?:StoreInitialData|null){
 const queryClient=useQueryClient();
 const params=useMemo(()=>({page:String(currentPage),limit:'12',search:debouncedSearch,category:categoryFilter,stock:stockFilter,startDate,endDate,sortOrder}),[currentPage,debouncedSearch,categoryFilter,stockFilter,startDate,endDate,sortOrder]);
 const productKey=ManagerStoreProductsQueryKeys.products(params); const summaryKey=ManagerStoreProductsQueryKeys.summary();
 const productsQuery=useQuery({queryKey:productKey,queryFn:async()=>{const response=await ManagerStoreProductsApi.fetchProducts(params);if(!response.success)throw new Error(response.message||'Unable to load products');return response.data??{products:[],total:0};},initialData:initialData?{products:initialData.products,total:initialData.products.length}:undefined});
 const summaryQuery=useQuery({queryKey:summaryKey,queryFn:async()=>{const response=await ManagerStoreProductsApi.fetchStoreSummary();if(!response.success)throw new Error(response.message||'Unable to load store summary');return response.data??null;},initialData:initialData?.summary??undefined});
 const setProducts=useCallback((updater:Product[]|((previous:Product[])=>Product[]))=>queryClient.setQueryData<{products:Product[];total:number}>(productKey,previous=>{const current=previous?.products??[];const products=typeof updater==='function'?updater(current):updater;return{products,total:products.length};}),[productKey,queryClient]);
 const setSummary=useCallback((updater:StoreSummary|null|((previous:StoreSummary|null)=>StoreSummary|null))=>queryClient.setQueryData<StoreSummary|null>(summaryKey,previous=>typeof updater==='function'?updater(previous??null):updater),[summaryKey,queryClient]);
 const loadAll=useCallback(async()=>{await Promise.all([productsQuery.refetch(),summaryQuery.refetch()]);},[productsQuery,summaryQuery]);
 return{products:productsQuery.data?.products??[],setProducts,summary:summaryQuery.data??null,setSummary,isPending:productsQuery.isPending||summaryQuery.isPending,isError:productsQuery.isError||summaryQuery.isError,error:productsQuery.error??summaryQuery.error,loadAll};
}
