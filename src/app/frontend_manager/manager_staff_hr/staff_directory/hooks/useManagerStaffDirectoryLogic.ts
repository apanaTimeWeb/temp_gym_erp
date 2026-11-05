// DATA FLOW: Directory URL state + local modal state → staff-only queries/mutations → directory UI.
'use client';
import { useCallback, useMemo } from 'react';
import { useRouter,usePathname,useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { ManagerStaffPayrollAndAttendanceApi } from '@/app/frontend_manager/manager_staff_hr/staff_directory/api/manager_staff_hr_staff_directory.api';
import { useManagerStaffPayrollAndAttendanceStaffMutations } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryStaffMutations';
import { useManagerStaffPayrollAndAttendanceQueries } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryQueries';
import { useManagerStaffPayrollAndAttendanceUIState } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryUIState';
import { downloadManagerStaffPayrollAndAttendanceStaffCsv } from '@/app/frontend_manager/manager_staff_hr/staff_directory/utils/ManagerStaffDirectoryExportUtils';
import type { HrInitialData, Staff } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';
/**
 * @description Coordinates staff-directory URL filters, local modal/profile state, staff queries, staff-only mutations, and CSV export.
 * @dependencies Uses directory query/mutation/UI-state hooks, shared debounce/error helpers, Next.js URL state, translations, and the feature export utility.
 * @edge-case Search is debounced before querying; changing search or role resets pagination; payroll and ledger behavior is delegated to its own leaf module.
 * @param initialData Optional server-provided staff data used to seed the directory query.
 * @returns Directory data/status, filter setters, modal/profile state, staff mutation commands, toast controls, and CSV export.
 * @cacheKey Delegated to ManagerStaffPayrollAndAttendanceQueryKeys.staff(params) in the directory query hook.
 */
export function useManagerStaffPayrollAndAttendanceLogic(initialData?:HrInitialData|null){
 const t=useTranslations('MANAGER_STAFF_PAYROLL_AND_ATTENDANCE');const router=useRouter();const pathname=usePathname();const params=useSearchParams();
 const search=params.get('search')||'';const roleFilter=params.get('role')||'All';const currentPage=Math.max(1,Number.parseInt(params.get('page')||'1',10)||1);const debouncedSearch=useManagerInfrastructureDebounce(search,300);
 const setParam=useCallback((key:string,value:string|null)=>{const next=new URLSearchParams(params.toString());if(value)next.set(key,value);else next.delete(key);if(key!=='page')next.set('page','1');router.push(`${pathname}?${next.toString()}`,{scroll:false});},[params,pathname,router]);
 const setSearch=useCallback((v:string)=>setParam('search',v||null),[setParam]);const setRoleFilter=useCallback((v:string)=>setParam('role',v==='All'?null:v),[setParam]);const setCurrentPage=useCallback((v:number)=>setParam('page',String(Math.max(1,v))),[setParam]);
 const ui=useManagerStaffPayrollAndAttendanceUIState();const queries=useManagerStaffPayrollAndAttendanceQueries({search:debouncedSearch,role:roleFilter,month:'',page:currentPage,limit:MANAGER_ITEMS_PER_PAGE},initialData);
 const mutations=useManagerStaffPayrollAndAttendanceStaffMutations(queries.staff,ui.editId,ui.setShowModal,ui.setSaving,ui.showToast);
 const error=useMemo(()=>queries.error?ManagerInfrastructureGetErrorMessage(queries.error,t('TEXT_GENERIC_ERROR')):'',[queries.error,t]);
 const exportStaff=useCallback(async()=>{
  try {
   const firstPage=await ManagerStaffPayrollAndAttendanceApi.fetchStaff({
    search:debouncedSearch,
    role:roleFilter,
    page:'1',
    limit:String(MANAGER_ITEMS_PER_PAGE),
   });
   if(!firstPage.success) throw new Error(firstPage.message);
   const allStaff:Staff[]=[...firstPage.data.staff];
   const total=firstPage.data.total;
   const totalPages=Math.ceil(total/MANAGER_ITEMS_PER_PAGE);
   for(let page=2;page<=totalPages;page+=1){
    const response=await ManagerStaffPayrollAndAttendanceApi.fetchStaff({
     search:debouncedSearch,
     role:roleFilter,
     page:String(page),
     limit:String(MANAGER_ITEMS_PER_PAGE),
    });
    if(!response.success) throw new Error(response.message);
    allStaff.push(...response.data.staff);
   }
   if(allStaff.length<total) throw new Error('The staff export response was incomplete.');
   downloadManagerStaffPayrollAndAttendanceStaffCsv(allStaff);
  } catch(exportError) {
   ui.showToast(ManagerInfrastructureGetErrorMessage(exportError,t('TEXT_GENERIC_ERROR')),'error');
  }
 },[debouncedSearch,roleFilter,t,ui.showToast]);
 return {staff:queries.staff,totalStaff:queries.totalStaff,isPending:queries.isPending,isError:queries.isError,error,toast:ui.toast,showToast:ui.showToast,hideToast:ui.hideToast,loadAll:queries.loadAll,search,debouncedSearch,setSearch,roleFilter,setRoleFilter,currentPage,setCurrentPage,showModal:ui.showModal,setShowModal:ui.setShowModal,editId:ui.editId,editData:ui.editData,viewProfileData:ui.viewProfileData,setViewProfileData:ui.setViewProfileData,saving:ui.saving,openAdd:ui.openAdd,openEdit:ui.openEdit,saveStaff:mutations.saveStaff,deleteStaff:mutations.deleteStaff,toggleStaffStatus:mutations.toggleStaffStatus,exportStaff};
}
