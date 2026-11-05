// RESPONSIBILITY: Defines the transient Admin Finance Zustand UI store contract; server/API state remains outside this store.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementStoreTypes.ts)

import type { FinanceStaffDuesPaymentModalState, Staff } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes';

export type AdminFinanceStaffDuesManagementUiStoreState = {
  visibleColumns: string[];
  showModal: boolean;
  showPayrollModal: boolean;
  showProfileModal: boolean;
  paymentModal: FinanceStaffDuesPaymentModalState | null;
  editId: string | null;
  setVisibleColumns: (columns: string[]) => void;
  setShowModal: (value: boolean) => void;
  setShowPayrollModal: (value: boolean) => void;
  setShowProfileModal: (value: boolean) => void;
  setPaymentModal: (value: FinanceStaffDuesPaymentModalState | null) => void;
  setEditId: (value: string | null) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
  openAddPayroll: () => void;
};
