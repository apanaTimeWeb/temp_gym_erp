"use client";
// RESPONSIBILITY: Coordinates URL filters and query state for Sales pending payments only.
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ADMIN_SALES_PENDING_PAYMENTS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsConstants';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsConstants';
import { useAdminSalesDebounce } from '@/app/frontend_admin/admin_sales/sales_pending_payments/hooks/useAdminSalesPendingPaymentsDebounce';
import { useAdminSalesPendingPaymentsEntityQueries } from '@/app/frontend_admin/admin_sales/sales_pending_payments/hooks/useAdminSalesPendingPaymentsEntityQueries';
import { isValidAdminSalesPendingPaymentsDateRange } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsDateRangeUtils';
import { normalizeAdminSalesPendingPaymentsUrlPage } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsUrlPage';
import type { AdminSalesPendingPaymentsState } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsTypes';
export function useAdminSalesLogic(): AdminSalesPendingPaymentsState {
  const t = useTranslations();
 const router=useRouter();const params=useSearchParams();const pathname=usePathname();const selectedBranchId=params.get('branchId')||'all';const rawRange=params.get('range')||'this_month';const range=(DATE_FILTERS as readonly string[]).includes(rawRange)?rawRange:'this_month';const startDate=params.get('startDate')??'';const endDate=params.get('endDate')??'';const isCustomRangeBlocked=range==='custom'&&!isValidAdminSalesPendingPaymentsDateRange(startDate,endDate);const dateParams:Record<string,string>=range==='custom'&&!isCustomRangeBlocked?{startDate,endDate}:{};const search=params.get('search')||'';const debouncedSearch=useAdminSalesDebounce(search,300);const currentPage=normalizeAdminSalesPendingPaymentsUrlPage(params.get('page'));
 const updateQuery=useCallback((updates:Record<string,string|null>)=>{const next=new URLSearchParams(params.toString());Object.entries(updates).forEach(([key,value])=>value?next.set(key,value):next.delete(key));const query=next.toString();router.push(query?`${pathname}?${query}`:pathname,{scroll:false});},[params,pathname,router]);const setSearch=useCallback((value:string)=>updateQuery({search:value||null,page:'1'}),[updateQuery]);const setCurrentPage=useCallback((page:number)=>updateQuery({page:String(normalizeAdminSalesPendingPaymentsUrlPage(page))}),[updateQuery]);
 const queryParams:Record<string,string>={limit:String(ADMIN_SALES_PENDING_PAYMENTS_ITEMS_PER_PAGE),page:String(currentPage),range,...(selectedBranchId!=='all'?{branchId:selectedBranchId}:{}),...dateParams,...(debouncedSearch?{search:debouncedSearch}:{})};const query=useAdminSalesPendingPaymentsEntityQueries({queryParams,enabled:!isCustomRangeBlocked});
 const confirmedTotal = query.status === 'success' ? query.data?.data?.total : undefined;
 const lastPage = typeof confirmedTotal === 'number' && Number.isSafeInteger(confirmedTotal) && confirmedTotal >= 0
   ? Math.max(1, Math.ceil(confirmedTotal / ADMIN_SALES_PENDING_PAYMENTS_ITEMS_PER_PAGE)) : null;
 useEffect(() => {
   // Only a successful response has a trustworthy total. Never navigate on pending/error/disabled queries.
   if (lastPage !== null && currentPage > lastPage) updateQuery({ page: String(lastPage) });
 }, [lastPage, currentPage, updateQuery]);
 return {isCustomRangeBlocked,startDate,endDate,search,setSearch,currentPage,setCurrentPage,pendingPayments:query.data?.data?.members??[],pendingTotal:query.data?.data?.total??0,pendingPaymentsStatus:query.status,pendingPaymentsError:(query.error ? t('sales.AdminRepair.requestFailed') : ''),retryPendingPayments:query.refetch};
}
