"use client";
// RESPONSIBILITY: Composes Admin Finance URL-backed UI state, transient Zustand UI state, TanStack Query server state, and mutation actions for views.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementViewModel.ts)

import { format, isValid, parseISO } from 'date-fns';
import { useAdminFinancePayrollManagementLogic } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementLogic';
import { useAdminFinancePayrollManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_payroll_management/hooks/useAdminFinancePayrollManagementUrlState';
import { useAdminFinancePayrollManagementStore } from '@/app/frontend_admin/admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementStore';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementToastStore';
import type { FinancePayrollContextType, Staff } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import { EMPTY_STAFF } from '@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants';
/** @description useAdminFinancePayrollManagementViewModel composes feature UI state with server state without using React Context for business state. @dependencies Consumes the owning Admin Finance store, URL state, server-state logic, and approved admin layout toast infrastructure. @edge-case Multiple consumers remain cache-consistent through TanStack Query while transient modal state remains shared through Zustand. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminFinancePayrollManagementViewModel(): FinancePayrollContextType {
  const ui = useAdminFinancePayrollManagementStore();
  const urlState = useAdminFinancePayrollManagementUrlState();
  const { showToast } = useAdminNavigationLayoutToastStore();
  const serverState = useAdminFinancePayrollManagementLogic({ editId: ui.editId, setShowModal: ui.setShowModal, setShowPayrollModal: ui.setShowPayrollModal });
  const selectedStaff = ui.editId ? serverState.staff.find((staff: Staff) => staff.id === ui.editId) ?? null : null;
  const editData = ui.showModal ? (selectedStaff ? { ...selectedStaff, joinDate: (isValid(parseISO(selectedStaff.joinDate)) ? format(parseISO(selectedStaff.joinDate), 'yyyy-MM-dd') : '') } : { ...EMPTY_STAFF }) : null;
  const viewProfileData = ui.showProfileModal ? selectedStaff : null;
  return { ...ui, ...urlState, ...serverState, editData, viewProfileData, showToast };
}
