// DATA FLOW: Staff directory consumers → staff-only mutation hook; payroll and ledger methods belong to the payroll_and_ledger leaf.
'use client';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import { useManagerStaffPayrollAndAttendanceStaffMutations } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryStaffMutations';
import { downloadManagerStaffPayrollAndAttendanceStaffCsv } from '@/app/frontend_manager/manager_staff_hr/staff_directory/utils/ManagerStaffDirectoryExportUtils';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_staff_hr/staff_directory/types/manager_staff_hr_staff_directory.types';
/**
 * @description Composes staff-directory mutations with the staff CSV export command; payroll mutations remain owned by payroll_and_ledger.
 * @dependencies Delegates writes to useManagerStaffPayrollAndAttendanceStaffMutations and export formatting/download to the staff-directory utility.
 * @edge-case Payroll arguments are intentionally unused to preserve the legacy caller signature without crossing the payroll feature boundary.
 * @param staff Current staff records used for export and mutation context.
 * @param _payrolls Legacy payroll input retained for caller compatibility and not consumed.
 * @param editId Current staff edit ID forwarded to the staff mutation hook.
 * @param setShowModal Controls the staff form modal.
 * @param _setShowPayrollModal Legacy payroll-modal setter retained for caller compatibility and not consumed.
 * @param setSaving Receives mutation pending-state updates.
 * @param showToast Receives feature-safe success/error feedback.
 * @returns Staff mutation commands and exportStaff.
 */
export function useManagerStaffPayrollAndAttendanceMutations(staff:Staff[],_payrolls:Payroll[],editId:string|null,setShowModal:(value:boolean)=>void,_setShowPayrollModal:(value:boolean)=>void,setSaving:(value:boolean)=>void,showToast:(message:string,type:ManagerToastType)=>void){
 const mutations=useManagerStaffPayrollAndAttendanceStaffMutations(staff,editId,setShowModal,setSaving,showToast);
 return {...mutations,exportStaff:()=>downloadManagerStaffPayrollAndAttendanceStaffCsv(staff)};
}
