"use client";
// RESPONSIBILITY: Composes Admin HR URL-backed UI state, transient Zustand UI state, TanStack Query server state, and mutation actions for views.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_hr/hr_staff_management/hooks/useAdminHrManagementViewModel.ts)

import { format, isValid, parseISO } from 'date-fns';
import { useAdminHrLogic } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementLogic';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState';
import { useAdminHrStore } from '@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementStore';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_hr/hr_staff_management/state/useAdminHrStaffManagementToastStore';
import type { HrContextType, Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import { EMPTY_STAFF } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';
/** @description useAdminHrViewModel composes feature UI state with server state without using React Context for business state. @dependencies Consumes the owning Admin HR store, URL state, server-state logic, and approved admin layout toast infrastructure. @edge-case Multiple consumers remain cache-consistent through TanStack Query while transient modal state remains shared through Zustand. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminHrViewModel(): HrContextType {
  const ui = useAdminHrStore();
  const urlState = useAdminHrUrlState();
  const { showToast } = useAdminNavigationLayoutToastStore();
  const serverState = useAdminHrLogic({ editId: ui.editId, setShowModal: ui.setShowModal });
  const selectedStaff = ui.editId ? serverState.staff.find((staff: Staff) => staff.id === ui.editId) ?? null : null;
  const editData = ui.showModal ? (selectedStaff ? { ...selectedStaff, joinDate: (isValid(parseISO(selectedStaff.joinDate)) ? format(parseISO(selectedStaff.joinDate), 'yyyy-MM-dd') : '') } : { ...EMPTY_STAFF }) : null;
  const viewProfileData = ui.showProfileModal ? selectedStaff : null;
  return { ...ui, ...urlState, ...serverState, editData, viewProfileData, showToast };
}
