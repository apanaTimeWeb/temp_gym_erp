// RESPONSIBILITY: TypeScript contracts for the Admin Finance module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementTypes.ts)

import type { QueryStatus } from '@tanstack/react-query';
import type { AdminToastType } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementToastTypes';

import type { AdminFinanceStaffDuesManagementSortDirection } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/types/AdminFinanceStaffDuesManagementSortTypes';
export type AdminFinanceStaffDuesManagementSalaryType = 'Monthly' | 'Daily';
export type AdminFinanceStaffDuesManagementLedgerEntryType = 'Salary Generated' | 'Salary Paid' | 'Advance Given' | 'Due Paid';
export type AdminFinanceStaffDuesManagementStaffSortKey = (typeof import('@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementConstants').STAFF_SORT_KEY_VALUES)[number];
export type AdminFinanceStaffDuesManagementPayrollSortKey = (typeof import('@/app/frontend_admin/admin_finance/finance_staff_dues_management/constants/AdminFinanceStaffDuesManagementConstants').PAYROLL_SORT_KEY_VALUES)[number];

export interface FinanceStaffDuesInitialData {
  staff: Staff[];
  totalStaff: number;
  payrolls: Payroll[];
  totalPayrolls: number;
  summary: FinanceStaffDuesSummary | null;
}

export interface FinanceStaffDuesPaymentModalState {
  payrollId: string;
  staffName: string;
  pendingAmount: number;
}

export interface FinanceStaffDuesUiContextType {
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
  staffSortDir: AdminFinanceStaffDuesManagementSortDirection;
  setStaffSort: (key: AdminFinanceStaffDuesManagementStaffSortKey, direction: AdminFinanceStaffDuesManagementSortDirection) => void;
  payrollSortKey: string;
  payrollSortDir: AdminFinanceStaffDuesManagementSortDirection;
  setPayrollSort: (key: AdminFinanceStaffDuesManagementPayrollSortKey, direction: AdminFinanceStaffDuesManagementSortDirection) => void;
  showToast: (msg: string, type: AdminToastType, id?: string) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showPayrollModal: boolean;
  setShowPayrollModal: (show: boolean) => void;
  paymentModal: FinanceStaffDuesPaymentModalState | null;
  setPaymentModal: (modal: FinanceStaffDuesPaymentModalState | null) => void;
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

export interface FinanceStaffDuesServerState {
  staff: Staff[];
  totalStaff: number;
  summary: FinanceStaffDuesSummary | null;
  status: QueryStatus;
  error: string;
  summaryStatus: QueryStatus;
  summaryError: string;
  retryStaff: () => Promise<unknown>;
  retrySummary: () => Promise<unknown>;
  saving: boolean;
  loadAll: () => Promise<void>;
  payDue: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => Promise<boolean>;
}

export type FinanceStaffDuesContextType = FinanceStaffDuesUiContextType & FinanceStaffDuesServerState;

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
  salaryType?: AdminFinanceStaffDuesManagementSalaryType;
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

export interface FinanceStaffDuesSummary {
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


export interface AdminFinanceStaffDuesManagementBranchReference {
  id: string;
  name: string;
}

export type AdminFinanceStaffDuesManagementLedgerSortKey = 'date' | 'type' | 'credit' | 'debit' | 'balance';
export type AdminFinanceStaffDuesManagementLedgerSortDirection = AdminFinanceStaffDuesManagementSortDirection;
export interface LedgerEntry {
  id: string;
  staffId: string;
  date: string;
  type: AdminFinanceStaffDuesManagementLedgerEntryType;
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
