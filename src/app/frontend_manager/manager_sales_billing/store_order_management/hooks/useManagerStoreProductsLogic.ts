// DATA FLOW: URL-backed order filters → orders API query → receipt actions.
'use client';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { useManagerStoreProductsQueries } from '@/app/frontend_manager/manager_sales_billing/store_order_management/hooks/useManagerStoreProductsQueries';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_order_management/state/useManagerStoreProductsUiStore';
import type { ManagerStoreProductsSortOrder, StoreInitialData } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_sales_billing_store_order_management.types';

/**
 * @description Coordinates shareable order-list filters, debounced search, order queries, and receipt/print UI state.
 * @param initialData Optional route-provided order seed forwarded to the order query hook.
 * @dependencies Uses Next.js URL navigation, useManagerInfrastructureDebounce, the order-management UI store, useManagerStoreProductsQueries, and ManagerInfrastructureGetErrorMessage.
 * @edge-case Invalid or missing page values resolve to page 1; changing a non-page filter resets pagination; URL-backed search is debounced for 300 ms.
 * @returns The order-list view model with query data/status, error copy, URL filter values and setters, receipt data, toast controls, and refetch action.
 */
export function useManagerStoreProductsLogic(initialData?: StoreInitialData | null) {
  const t = useTranslations('MANAGER_STORE_PRODUCTS');
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const currentPage = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const startDate = searchParams.get('startDate') || ''; const endDate = searchParams.get('endDate') || '';
  const sortOrder = (searchParams.get('sortOrder') as ManagerStoreProductsSortOrder) || 'DESC';
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);
  const setUrlParam = useCallback((key: string, value: string | null) => { const current = new URLSearchParams(searchParams.toString()); if (value) current.set(key, value); else current.delete(key); if (key !== 'page') current.set('page', '1'); router.push(`${pathname}?${current.toString()}`, { scroll: false }); }, [searchParams, pathname, router]);
  const setSearch = useCallback((value: string) => setUrlParam('search', value || null), [setUrlParam]);
  const setCurrentPage = useCallback((value: number) => setUrlParam('page', String(Math.max(1, value))), [setUrlParam]);
  const setStartDate = useCallback((value: string) => setUrlParam('startDate', value || null), [setUrlParam]);
  const setEndDate = useCallback((value: string) => setUrlParam('endDate', value || null), [setUrlParam]);
  const setSortOrder = useCallback((value: ManagerStoreProductsSortOrder) => setUrlParam('sortOrder', value), [setUrlParam]);
  const ui = useManagerStoreProductsUiStore();
  const query = useManagerStoreProductsQueries(currentPage, sortOrder, debouncedSearch, startDate, endDate, 'ALL', 'ALL', ui.showToast, initialData);
  return { ...query, errorMessage: query.error ? ManagerInfrastructureGetErrorMessage(query.error, t('TEXT_GENERIC_ERROR')) : '', currentPage, setCurrentPage, startDate, setStartDate, endDate, setEndDate, sortOrder, setSortOrder, search, setSearch, debouncedSearch, setPrintData: ui.setPrintData, printData: ui.printData, toast: ui.toast, hideToast: ui.hideToast, loadAll: query.loadAll };
}
