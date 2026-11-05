// DATA FLOW: Attendance route URL filters → staff roster query + read-only attendance-history query.
'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { useManagerStaffPayrollAndAttendanceQueries } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/hooks/useManagerStaffAttendanceQueries';
import type { HrInitialData } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/types/manager_staff_hr_staff_attendance.types';

/**
 * @description Coordinates staff-attendance URL filters, debounced search, staff queries, and a localized error view model.
 * @dependencies Uses the staff-attendance query hook, shared debounce/error helpers, Next.js URL state, and the module translation namespace.
 * @edge-case Search is debounced before querying; pagination resets when search or role changes, while month changes preserve the current page.
 * @param initialData Optional server-provided staff data used to seed the query when available.
 * @returns Staff records, loading/error state, URL-backed filters and setters, and the query refresh command.
 * @cacheKey Delegated to ManagerStaffPayrollAndAttendanceQueryKeys.staff(params) in the feature query hook.
 */
export function useManagerStaffPayrollAndAttendanceLogic(initialData?: HrInitialData | null) {
 const t=useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE'); const router=useRouter(); const pathname=usePathname(); const params=useSearchParams();
 const search=params.get('search')||''; const role=params.get('role')||'All'; const page=Math.max(1,Number.parseInt(params.get('page')||'1',10)||1); const month=params.get('month')||new Date().toISOString().slice(0,7); const debouncedSearch=useManagerInfrastructureDebounce(search,300);
 const [rosterLimit,setRosterLimit]=useState(100);
 const setParam=useCallback((key:string,value:string|null)=>{const next=new URLSearchParams(params.toString());if(value)next.set(key,value);else next.delete(key);if(key!=='page'&&key!=='month')next.set('page','1');router.push(`${pathname}?${next.toString()}`,{scroll:false});},[params,pathname,router]);
 const queries=useManagerStaffPayrollAndAttendanceQueries({search:debouncedSearch,role,month,page:1,limit:rosterLimit},initialData);
 // The initial page reveals the filtered total; expand the server-backed page size to include the complete matching roster.
 useEffect(()=>{if(queries.totalStaff>rosterLimit)setRosterLimit(queries.totalStaff);},[queries.totalStaff,rosterLimit]);
 const error=useMemo(()=>queries.error?ManagerInfrastructureGetErrorMessage(queries.error,t('TEXT_GENERIC_ERROR')):'',[queries.error,t]);
 return {staff:queries.staff,totalStaff:queries.totalStaff,isPending:queries.isPending,isError:queries.isError,error,search,debouncedSearch,roleFilter:role,currentPage:page,setSearch:(v:string)=>setParam('search',v||null),setRoleFilter:(v:string)=>setParam('role',v==='All'?null:v),setCurrentPage:(v:number)=>setParam('page',String(Math.max(1,v))),loadAll:queries.loadAll};
}
