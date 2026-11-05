// DATA FLOW: Payroll/ledger route → payroll and ledger mutations; staff directory mutations are owned by the staff_directory leaf.
'use client';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import { useManagerStaffPayrollAndAttendancePayrollMutations } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendancePayrollMutations';
import type { Staff, Payroll } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';
/**
 * @description Preserves the payroll-and-ledger caller contract while delegating all write behavior to the payroll-owned mutation hook.
 * @dependencies Uses useManagerStaffPayrollAndAttendancePayrollMutations and payroll/ledger feature types.
 * @edge-case Legacy staff-edit inputs are intentionally not consumed here; staff-directory mutations remain isolated in the staff_directory leaf.
 * @param staff Staff records required by payroll mutation calculations.
 * @param payrolls Payroll records required by payroll mutation calculations.
 * @param _editId Legacy staff edit ID retained for caller compatibility and not consumed.
 * @param _setShowModal Legacy staff modal setter retained for caller compatibility and not consumed.
 * @param setShowPayrollModal Controls the payroll modal.
 * @param setSaving Receives payroll mutation pending-state updates.
 * @param showToast Receives feature-safe success/error feedback.
 * @returns The payroll-owned mutation commands and state.
 */
export function useManagerStaffPayrollAndAttendanceMutations(staff:Staff[],payrolls:Payroll[],_editId:string|null,_setShowModal:(value:boolean)=>void,setShowPayrollModal:(value:boolean)=>void,setSaving:(value:boolean)=>void,showToast:(message:string,type:ManagerToastType)=>void){
 return useManagerStaffPayrollAndAttendancePayrollMutations(staff,payrolls,setShowPayrollModal,setSaving,showToast);
}
