// RESPONSIBILITY: Defines the transient Admin Finance Zustand UI store contract; server/API state remains outside this store.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementStoreTypes.ts)

import type { FinanceSalaryAdvancePaymentModalState, Staff } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/types/AdminFinanceSalaryAdvanceManagementTypes';

export type AdminFinanceSalaryAdvanceManagementUiStoreState = {
  visibleColumns: string[];
  showModal: boolean;
  showPayrollModal: boolean;
  showProfileModal: boolean;
  paymentModal: FinanceSalaryAdvancePaymentModalState | null;
  editId: string | null;
  setVisibleColumns: (columns: string[]) => void;
  setShowModal: (value: boolean) => void;
  setShowPayrollModal: (value: boolean) => void;
  setShowProfileModal: (value: boolean) => void;
  setPaymentModal: (value: FinanceSalaryAdvancePaymentModalState | null) => void;
  setEditId: (value: string | null) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
  openAddPayroll: () => void;
};
