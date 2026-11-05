// DATA FLOW: Directory URL state → staff list API → local directory table.
'use client';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_directory/api/manager_staff_hr_staff_directory.api';
import { ManagerStaffPayrollAndAttendanceQueryKeys } from '@/app/frontend_manager/manager_staff_hr/staff_directory/api/manager_staff_hr_staff_directory.query_keys';
import type { HrInitialData } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';
/**
 * @description Fetches the staff directory for the supplied search, role, month, pagination, and page-size filters.
 * @dependencies Uses the staff-directory API and query-key registry through TanStack Query; optional server data seeds the initial result.
 * @edge-case An absent API data payload normalizes to an empty staff list and zero total; refetch is exposed through loadAll.
 * @param params Directory query filters and pagination values.
 * @param initialData Optional server-provided staff records used as initial query data.
 * @returns Staff rows, total count, pending/error state, and a refetch command.
 * @cacheKey ManagerStaffPayrollAndAttendanceQueryKeys.staff(params).
 */
export function useManagerStaffPayrollAndAttendanceQueries(params:{search:string;role:string;month:string;page:number;limit:number},initialData?:HrInitialData|null){
 const query=useQuery({queryKey:ManagerStaffPayrollAndAttendanceQueryKeys.staff(params),queryFn:async()=>{const r=await ManagerStaffPayrollAndAttendanceApi.fetchStaff({search:params.search,role:params.role,page:String(params.page),limit:String(params.limit)});return r.data??{staff:[],total:0};},initialData:initialData?{
  staff:initialData.staff,
  total:(initialData as (HrInitialData & { total?: number }) | null)?.total ?? 0,
}:undefined});
 const loadAll=useCallback(async()=>{await query.refetch();},[query]);
 return {staff:query.data?.staff??[],totalStaff:query.data?.total??0,isPending:query.isPending,isError:query.isError,error:query.error,loadAll};
}
