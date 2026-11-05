// RESPONSIBILITY: Defines the transient Admin Finance Zustand UI store contract; server/API state remains outside this store.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementStoreTypes.ts)

import type { FinanceStaffLedgerPaymentModalState, Staff } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';

export type AdminFinanceStaffLedgerManagementUiStoreState = {
  visibleColumns: string[];
  showModal: boolean;
  showPayrollModal: boolean;
  showProfileModal: boolean;
  paymentModal: FinanceStaffLedgerPaymentModalState | null;
  editId: string | null;
  setVisibleColumns: (columns: string[]) => void;
  setShowModal: (value: boolean) => void;
  setShowPayrollModal: (value: boolean) => void;
  setShowProfileModal: (value: boolean) => void;
  setPaymentModal: (value: FinanceStaffLedgerPaymentModalState | null) => void;
  setEditId: (value: string | null) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
  openAddPayroll: () => void;
};
