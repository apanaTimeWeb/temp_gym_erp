// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { useTranslations } from 'next-intl';


import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsCatalogLocalDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsCatalogLocalGetErrorMessage';

import { useManagerStoreProducts } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProducts';
import { useManagerStoreProductsQueries } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/hooks/useManagerStoreProductsQueries';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/state/useManagerStoreProductsUiStore';
import { MANAGER_STORE_PRODUCTS_LEGACY_TAB_QUERY_PARAM, MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/constants/manager_store_products_view.constants';
import { resolveManagerStoreProductsView } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsResolveView';
import { ManagerStoreProductsBuildViewSearchParams } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/utils/ManagerStoreProductsBuildViewSearchParams';
import type { ManagerStoreProductsSortOrder } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';
import type { StoreInitialData } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/manager_sales_billing_store_products_catalog.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreProductsLogic.
 * @dependencies Uses ManagerConfirmProvider, ManagerDebounce, useManagerStoreProductsOrder, useManagerStoreProducts.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStoreProductsLogic owns the store feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStoreProductsLogic(initialData?: StoreInitialData | null) {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const view = resolveManagerStoreProductsView(searchParams.get(MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM), searchParams.get(MANAGER_STORE_PRODUCTS_LEGACY_TAB_QUERY_PARAM));
  
  const search = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('categoryFilter') || 'ALL';
  const stockFilter = searchParams.get('stockFilter') || 'ALL';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const sortOrder = (searchParams.get('sortOrder') as ManagerStoreProductsSortOrder) || 'DESC';
  
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string | null) => {
    const current = new URLSearchParams(searchParams.toString());
    if (value) current.set(key, value);
    else current.delete(key);
    if (key === MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM) current.delete(MANAGER_STORE_PRODUCTS_LEGACY_TAB_QUERY_PARAM);
    if (key !== 'page' && key !== 'tab' && key !== MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM) current.set('page', '1');
    router.push(`${pathname}?${current.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  const setTab = useCallback((nextView: typeof view) => {
    const query = ManagerStoreProductsBuildViewSearchParams(searchParams.toString(), nextView);
    router.push(`${pathname}?${query}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setSearch = useCallback((val: string) => setUrlParam('search', val || null), [setUrlParam]);
  const setCategoryFilter = useCallback((val: string) => setUrlParam('categoryFilter', val || null), [setUrlParam]);
  const setStockFilter = useCallback((val: string) => setUrlParam('stockFilter', val || null), [setUrlParam]);
  const setCurrentPage = useCallback((val: number) => setUrlParam('page', val.toString()), [setUrlParam]);
  const setStartDate = useCallback((val: string) => setUrlParam('startDate', val || null), [setUrlParam]);
  const setEndDate = useCallback((val: string) => setUrlParam('endDate', val || null), [setUrlParam]);
  const setSortOrder = useCallback((val: ManagerStoreProductsSortOrder) => setUrlParam('sortOrder', val), [setUrlParam]);

  const ui = useManagerStoreProductsUiStore();
  const showToast = ui.showToast;
  const hideToast = ui.hideToast;

  const {
    products, setProducts,
    summary, setSummary,
    isPending, isError, error, loadAll
  } = useManagerStoreProductsQueries(
    currentPage, sortOrder, debouncedSearch, startDate, endDate, categoryFilter, stockFilter, showToast, initialData
  );

  const productLogic = useManagerStoreProducts(
    setProducts,
    setSummary,
    showToast,
  );


  return {
    view, setTab,
    products, summary, isPending, isError, errorMessage: error ? ManagerInfrastructureGetErrorMessage(error, t('TEXT_GENERIC_ERROR')) : '', saving: productLogic.isSaving,
    toast: ui.toast, printData: ui.printData, setPrintData: ui.setPrintData, search, debouncedSearch, setSearch,
    categoryFilter, setCategoryFilter, stockFilter, setStockFilter,
    currentPage, setCurrentPage,
    startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder,
    ...productLogic,
    hideToast, loadAll
 };
}

