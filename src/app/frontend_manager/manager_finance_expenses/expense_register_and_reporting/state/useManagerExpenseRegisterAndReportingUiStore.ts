// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
import { create } from "zustand";

import { EXPENSE_PAID_STATUS } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/constants/manager_expense_register_and_reporting_shared.constants';
import type { Expense } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/types/manager_expense_register_and_reporting.types';

interface ManagerExpenseRegisterAndReportingUiState { showModal: boolean; editId: string | null; editData: Partial<Expense> | null; openAdd: () => void; openEdit: (expense: Expense) => void; closeModal: () => void; }
/**
 * @description Coordinates expenses feature state and its documented UI/API boundary through useManagerExpenseRegisterAndReportingUiStore.
 * @dependencies Uses ManagerExpenseRegisterAndReportingTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerExpenseRegisterAndReportingUiStore = create<ManagerExpenseRegisterAndReportingUiState>((set) => ({
  showModal: false, editId: null, editData: null,
  openAdd: () => set({ showModal: true, editId: null, editData: { status: EXPENSE_PAID_STATUS, date: new Date().toISOString().split("T")[0] || "" } }),
  openEdit: (expense) => set({ showModal: true, editId: expense.id, editData: { ...expense, date: expense.date.split("T")[0] || "" } }),
  closeModal: () => set({ showModal: false }) }));
