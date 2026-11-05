"use client";
// RESPONSIBILITY: Coordinates URL filters, list state and KPI counts for Sales memberships only.
import { normalizeAdminSalesMembershipsUrlPage } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsUrlPage';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminSalesDebounce } from '@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsDebounce';
import { DATE_FILTERS, ADMIN_SALES_MEMBERSHIP_FILTER } from '@/app/frontend_admin/admin_sales/sales_memberships/constants/AdminSalesMembershipsConstants';
import { useAdminSalesMembershipsEntityQueries } from '@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsEntityQueries';
import { useAdminSalesMembershipCounts } from '@/app/frontend_admin/admin_sales/sales_memberships/hooks/useAdminSalesMembershipsMembershipCounts';
import { isValidAdminSalesMembershipsDateRange } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsDateRangeUtils';
import type { AdminSalesMembershipsState, MembershipFilter } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';
export function useAdminSalesLogic(): AdminSalesMembershipsState {
  const t = useTranslations();
 const router=useRouter(); const params=useSearchParams(); const pathname=usePathname(); const selectedBranchId=params.get('branchId')||'all';
 const rawRange=params.get('range')||'this_month'; const range=(DATE_FILTERS as readonly string[]).includes(rawRange)?rawRange:'this_month'; const startDate=params.get('startDate')??''; const endDate=params.get('endDate')??''; const isCustomRangeBlocked=range==='custom'&&!isValidAdminSalesMembershipsDateRange(startDate,endDate); const dateParams: Record<string, string>=range==='custom'&&!isCustomRangeBlocked?{startDate,endDate}:{};
 const search=params.get('search')||''; const debouncedSearch=useAdminSalesDebounce(search,300); const rawFilter=params.get('membershipFilter')||ADMIN_SALES_MEMBERSHIP_FILTER.ALL; const membershipFilter: MembershipFilter=(Object.values(ADMIN_SALES_MEMBERSHIP_FILTER) as string[]).includes(rawFilter)?rawFilter as MembershipFilter:ADMIN_SALES_MEMBERSHIP_FILTER.ALL; const currentPage=normalizeAdminSalesMembershipsUrlPage(params.get('page'));
 const updateQuery=useCallback((updates:Record<string,string|null>)=>{const next=new URLSearchParams(params.toString());Object.entries(updates).forEach(([key,value])=>value?next.set(key,value):next.delete(key));const query=next.toString();router.push(query?`${pathname}?${query}`:pathname,{scroll:false});},[params,pathname,router]);
 const setSearch=useCallback((value:string)=>updateQuery({search:value||null,page:'1'}),[updateQuery]); const setCurrentPage=useCallback((page:number)=>updateQuery({page:String(normalizeAdminSalesMembershipsUrlPage(page))}),[updateQuery]); const setMembershipFilter=useCallback((value:MembershipFilter)=>updateQuery({membershipFilter:value==='all'?null:value,page:'1'}),[updateQuery]);
 const queryParams:Record<string,string>={limit:'10',page:String(currentPage),...(selectedBranchId!=='all'?{branchId:selectedBranchId}:{}),...dateParams}; if(membershipFilter!=='all')queryParams.membershipFilter=membershipFilter;if(debouncedSearch)queryParams.search=debouncedSearch;
 const listQuery=useAdminSalesMembershipsEntityQueries({queryParams,range,selectedBranchId,enabled:!isCustomRangeBlocked}); const counts=useAdminSalesMembershipCounts({selectedBranchId,search:debouncedSearch,range,startDate:dateParams.startDate,endDate:dateParams.endDate,enabled:!isCustomRangeBlocked});
 return {isCustomRangeBlocked,startDate,endDate,search,setSearch,currentPage,setCurrentPage,membershipFilter,setMembershipFilter,allMemberships:listQuery.data?.data?.members??[],allMembershipsTotal:listQuery.data?.data?.total??0,allMembershipsStatus:listQuery.status,allMembershipsError:(listQuery.error ? t('sales.AdminRepair.requestFailed') : ''),retryAllMemberships:listQuery.refetch,membershipKpiCounts:counts.counts,membershipKpiCountsPending:counts.isPending,membershipKpiCountsError:counts.isError,retryMembershipKpiCounts:counts.retry};
}
