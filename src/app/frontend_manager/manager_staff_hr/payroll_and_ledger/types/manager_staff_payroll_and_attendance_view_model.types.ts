// RESPONSIBILITY: Describes the HR staff/payroll screen view-model contract.
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { HrSummary, Payroll, Staff } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/types/manager_staff_hr_payroll_and_ledger.types';

export interface ManagerStaffPayrollAndAttendanceViewModel {
  staff: Staff[];
  totalStaff: number;
  payrolls: Payroll[];
  totalPayrolls: number;
  summary: HrSummary | null;
  isPending: boolean;
  isError: boolean;
  error: string;
  toast: { message: string; type: ManagerToastType } | null;

  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  roleFilter: string;
  setRoleFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;

  // Form / Modal State
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showPayrollModal: boolean;
  setShowPayrollModal: (show: boolean) => void;
  paymentModal: { payrollId: string; staffName: string; pendingAmount: number } | null;
  setPaymentModal: (modal: { payrollId: string; staffName: string; pendingAmount: number } | null) => void;
  editId: string | null;
  editData: Partial<Staff> | null;
  viewProfileData: Staff | null;
  setViewProfileData: (s: Staff | null) => void;
  saving: boolean;

  // Actions
  openAdd: () => void;
  openEdit: (s: Staff) => void;
  openAddPayroll: () => void;
  saveStaff: (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => void;
  savePayroll: (data: Partial<Payroll> & { amount?: string | number; idempotencyKey: string }) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  toggleStaffStatus: (staff: Staff) => Promise<void>;
  markPayrollPaid: (id: string, amount: number, idempotencyKey: string) => Promise<void>;
  giveAdvance: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }, idempotencyKey: string) => Promise<void>;
  payDue: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }, idempotencyKey: string) => Promise<void>;
  // Indian payroll compliance actions (CRITICAL)
  bulkGeneratePayroll: (month: string, idempotencyKey: string) => Promise<void>;
  downloadPayslip: (payrollId: string) => Promise<void>;
  exportStaff: () => void;

  payrollMonth: string;
  setPayrollMonth: (m: string) => void;
}
