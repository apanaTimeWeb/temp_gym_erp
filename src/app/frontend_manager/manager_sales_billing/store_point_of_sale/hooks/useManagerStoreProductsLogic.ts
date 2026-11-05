// DATA FLOW: POS product query + local cart → idempotent order mutation → receipt/WhatsApp confirmation.
'use client';
import { useCallback } from 'react';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { useManagerStoreProductsQueries } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsQueries';
import { useManagerStoreProductsOrder } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/hooks/useManagerStoreProductsOrder';
import { useManagerStoreProductsUiStore } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/state/useManagerStoreProductsUiStore';
import type { StoreInitialData, ManagerStoreProductsSortOrder } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_sales_billing_store_point_of_sale.types';
import { MANAGER_STORE_PRODUCTS_ORDERS_VIEW, MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_view.constants';

/**
 * @description Coordinates POS URL filters, debounced product search, local receipt/toast state, and the order workflow hook.
 * @param initialData Optional route-provided product seed forwarded to the product query hook.
 * @dependencies Uses Next.js URL navigation, useManagerInfrastructureDebounce, the POS UI store, useManagerStoreProductsQueries, useManagerStoreProductsOrder, and useConfirm.
 * @edge-case Invalid or missing page values resolve to page 1; changing a non-page URL filter resets pagination; search is debounced for 300 ms and existing query parameters are retained.
 * @returns The POS view model: product/query state, URL-backed filters and setters, receipt/print state, toast controls, refetch action, and order workflow actions.
 */
export function useManagerStoreProductsLogic(initialData?: StoreInitialData | null) {
  const t = useTranslations('MANAGER_STORE_PRODUCTS'); const { confirm } = useConfirm();
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams();
  const search=searchParams.get('search')||''; const categoryFilter=searchParams.get('categoryFilter')||'ALL'; const stockFilter=searchParams.get('stockFilter')||'ALL';
  const currentPage=Math.max(1,Number.parseInt(searchParams.get('page')||'1',10)||1); const startDate=searchParams.get('startDate')||''; const endDate=searchParams.get('endDate')||''; const sortOrder=(searchParams.get('sortOrder') as ManagerStoreProductsSortOrder)||'DESC';
  const debouncedSearch=useManagerInfrastructureDebounce(search,300);
  const setUrlParam=useCallback((key:string,value:string|null)=>{const current=new URLSearchParams(searchParams.toString());if(value)current.set(key,value);else current.delete(key);if(key!=='page')current.set('page','1');router.push(`${pathname}?${current.toString()}`,{scroll:false});},[searchParams,pathname,router]);
  const setSearch=useCallback((v:string)=>setUrlParam('search',v||null),[setUrlParam]); const setCategoryFilter=useCallback((v:string)=>setUrlParam('categoryFilter',v||null),[setUrlParam]); const setStockFilter=useCallback((v:string)=>setUrlParam('stockFilter',v||null),[setUrlParam]); const setCurrentPage=useCallback((v:number)=>setUrlParam('page',String(Math.max(1,v))),[setUrlParam]);
  const setStartDate=useCallback((v:string)=>setUrlParam('startDate',v||null),[setUrlParam]); const setEndDate=useCallback((v:string)=>setUrlParam('endDate',v||null),[setUrlParam]); const setSortOrder=useCallback((v:ManagerStoreProductsSortOrder)=>setUrlParam('sortOrder',v),[setUrlParam]);
  const ui=useManagerStoreProductsUiStore(); const query=useManagerStoreProductsQueries(currentPage,sortOrder,debouncedSearch,startDate,endDate,categoryFilter,stockFilter,ui.showToast,initialData);
  const setTab=useCallback((view: typeof MANAGER_STORE_PRODUCTS_ORDERS_VIEW) => { const next = new URLSearchParams(searchParams.toString()); next.set(MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM, view); router.push(`${pathname}?${next.toString()}`, { scroll: false }); }, [searchParams, pathname, router]);
  const orderLogic=useManagerStoreProductsOrder(setTab,ui.showToast,ui.setPrintData,confirm);
  return { products:query.products,isPending:query.isPending,isError:query.isError,errorMessage:query.error?ManagerInfrastructureGetErrorMessage(query.error,t('TEXT_GENERIC_ERROR')):'',saving:orderLogic.isPlacingOrder,toast:ui.toast,printData:ui.printData,setPrintData:ui.setPrintData,search,debouncedSearch,setSearch,categoryFilter,setCategoryFilter,stockFilter,setStockFilter,currentPage,setCurrentPage,startDate,setStartDate,endDate,setEndDate,sortOrder,setSortOrder,hideToast:ui.hideToast,loadAll:query.loadAll,...orderLogic };
}
