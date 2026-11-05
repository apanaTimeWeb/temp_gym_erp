"use client";
// RESPONSIBILITY: Owns transient Admin Finance UI state only; URL state remains URL-backed and server state remains TanStack Query-backed.
// DATA FLOW: user interaction → module-scoped UI state action → subscribing feature components (admin_finance/finance_payroll_management/state/useAdminFinancePayrollManagementStore.ts)

import { create } from 'zustand';
import type { Staff } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes';
import type { AdminFinancePayrollManagementUiStoreState } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementStoreTypes';


/**
 * @description useAdminFinancePayrollManagementStore owns only local HR modal/selection UI state and exposes deterministic action transitions.
 * @dependencies Consumes Admin Finance types and module-owned EMPTY_STAFF only; it does not own API/cache state.
 * @edge-case Resetting or switching modals clears incompatible modal state so stale records cannot leak into a new action.
 */
export const useAdminFinancePayrollManagementStore = create<AdminFinancePayrollManagementUiStoreState>((set) => ({
  visibleColumns: ['name', 'role', 'phone', 'salary', 'status', 'actions'],
  showModal: false,
  showPayrollModal: false,
  showProfileModal: false,
  paymentModal: null,
  editId: null,
  setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
  setShowModal: (showModal) => set(showModal ? { showModal: true, showPayrollModal: false, showProfileModal: false, paymentModal: null } : { showModal: false }),
  setShowPayrollModal: (showPayrollModal) => set(showPayrollModal ? { showPayrollModal: true, showModal: false, showProfileModal: false, paymentModal: null } : { showPayrollModal: false }),
  setShowProfileModal: (showProfileModal) => set(showProfileModal ? { showProfileModal: true, showModal: false, showPayrollModal: false, paymentModal: null } : { showProfileModal: false }),
  setPaymentModal: (paymentModal) => set(paymentModal ? { paymentModal, showModal: false, showPayrollModal: false, showProfileModal: false } : { paymentModal: null }),
  setEditId: (editId) => set({ editId }),
  openAdd: () => set({ editId: null, showModal: true, showPayrollModal: false, showProfileModal: false, paymentModal: null }),
  openEdit: (staff) => set({ editId: staff.id, showModal: true, showPayrollModal: false, showProfileModal: false, paymentModal: null }),
  openProfile: (staff) => set({ editId: staff.id, showProfileModal: true, showModal: false, showPayrollModal: false, paymentModal: null }),
  openAddPayroll: () => set({ showPayrollModal: true, showModal: false, showProfileModal: false, paymentModal: null, editId: null }),
}));
