// RESPONSIBILITY: TypeScript contracts for the Admin Finance module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementTypes.ts)

import type { QueryStatus } from '@tanstack/react-query';
import type { AdminToastType } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementToastTypes';

import type { AdminFinancePayrollManagementSortDirection } from '@/app/frontend_admin/admin_finance/finance_payroll_management/types/AdminFinancePayrollManagementSortTypes';
export type AdminFinancePayrollManagementSalaryType = 'Monthly' | 'Daily';
export type AdminFinancePayrollManagementLedgerEntryType = 'Salary Generated' | 'Salary Paid' | 'Advance Given' | 'Due Paid';
export type AdminFinancePayrollManagementStaffSortKey = (typeof import('@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants').STAFF_SORT_KEY_VALUES)[number];
export type AdminFinancePayrollManagementPayrollSortKey = (typeof import('@/app/frontend_admin/admin_finance/finance_payroll_management/constants/AdminFinancePayrollManagementConstants').PAYROLL_SORT_KEY_VALUES)[number];

export interface FinancePayrollInitialData {
  staff: Staff[];
  totalStaff: number;
  payrolls: Payroll[];
  totalPayrolls: number;
  summary: FinancePayrollSummary | null;
}

export interface FinancePayrollPaymentModalState {
  payrollId: string;
  staffName: string;
  pendingAmount: number;
}

export interface FinancePayrollUiContextType {
  visibleColumns: string[];
  setVisibleColumns: (cols: string[]) => void;
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  roleFilter: string;
  setRoleFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  staffSortKey: string;
  staffSortDir: AdminFinancePayrollManagementSortDirection;
  setStaffSort: (key: AdminFinancePayrollManagementStaffSortKey, direction: AdminFinancePayrollManagementSortDirection) => void;
  payrollSortKey: string;
  payrollSortDir: AdminFinancePayrollManagementSortDirection;
  setPayrollSort: (key: AdminFinancePayrollManagementPayrollSortKey, direction: AdminFinancePayrollManagementSortDirection) => void;
  showToast: (msg: string, type: AdminToastType, id?: string) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showPayrollModal: boolean;
  setShowPayrollModal: (show: boolean) => void;
  paymentModal: FinancePayrollPaymentModalState | null;
  setPaymentModal: (modal: FinancePayrollPaymentModalState | null) => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  editData: Partial<Staff> | null;
  viewProfileData: Staff | null;
  payrollMonth: string;
  setPayrollMonth: (month: string) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
  openAddPayroll: () => void;
}

export interface FinancePayrollServerState {
  staff: Staff[];
  totalStaff: number;
  payrolls: Payroll[];
  totalPayrolls: number;
  summary: FinancePayrollSummary | null;
  status: QueryStatus;
  error: string;
  payrollStatus: QueryStatus;
  payrollError: string;
  summaryStatus: QueryStatus;
  summaryError: string;
  retryStaff: () => Promise<unknown>;
  retryPayroll: () => Promise<unknown>;
  retrySummary: () => Promise<unknown>;
  saving: boolean;
  loadAll: () => Promise<void>;
  savePayroll: (data: Partial<Payroll> & { amount?: string | number; paidAmount?: string | number }) => Promise<void | boolean>;
  markPayrollPaid: (id: string, amount: number) => Promise<void | boolean>;
}

export type FinancePayrollContextType = FinancePayrollUiContextType & FinancePayrollServerState;

export interface Staff {
  id: string;
  employeeId?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  branch: string;
  gender: string;
  address?: string;
  aadhaar?: string;
  upiId?: string;
  bankAccountNumber?: string;
  advanceSalary?: number;
  joinDate: string;
  joiningDate?: string;
  isActive: boolean;
  salaryType?: AdminFinancePayrollManagementSalaryType;
  paymentCycle?: string;
  currentDue?: number;
  assignedBranches?: string[];
  primaryBranchId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  department?: string;
  certifications?: string[];
  contractType?: string;
  terminationDate?: string;
}

export interface Payroll {
  id: string;
  staffId: string;
  month: string;
  amount: number;
  paidAmount: number;
  pendingAmount: number;
  status: string;
  paidAt?: string;
  notes?: string;
  staff?: { name: string; role: string };
}

export interface FinancePayrollSummary {
  totalSalaryThisMonth: number;
  totalSalaryPaid: number;
  totalSalaryDue: number;
  totalAdvanceGiven: number;
  pendingPaymentsCount: number;
  totalStaff: number;
  activeStaff: number;
  totalPayrollThisMonth: number;
  paidCount: number;
  pendingCount: number;
}


export interface AdminFinancePayrollManagementBranchReference {
  id: string;
  name: string;
}

export type AdminFinancePayrollManagementLedgerSortKey = 'date' | 'type' | 'credit' | 'debit' | 'balance';
export type AdminFinancePayrollManagementLedgerSortDirection = AdminFinancePayrollManagementSortDirection;
export interface LedgerEntry {
  id: string;
  staffId: string;
  date: string;
  type: AdminFinancePayrollManagementLedgerEntryType;
  credit: number;
  debit: number;
  balance: number;
  notes?: string;
  referenceNo?: string;
  paymentMode?: string;
  openingBalance?: number;
}

export type PayrollFormValues = { staffId: string; month: string; amount: number; paidAmount: number; notes?: string };

export type StaffFormValues = {
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  branch: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  joinDate: string;
  temporaryPassword?: string;
  isActive: boolean;
  aadhaar?: string;
  upiId?: string;
  advanceSalary?: number;
  assignedBranches?: string[];
  primaryBranchId?: string;
};
