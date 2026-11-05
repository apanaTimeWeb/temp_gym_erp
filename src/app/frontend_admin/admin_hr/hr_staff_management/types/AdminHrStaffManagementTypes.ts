// RESPONSIBILITY: Staff-directory contracts only. Payroll, advances, dues and ledger operations are owned by Finance leaves.
// DATA FLOW: Staff API/schema → HR staff hooks → directory, editor and profile UI.

import type { QueryStatus } from '@tanstack/react-query';
import type { AdminToastType } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementToastTypes';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementSortTypes';
import type { STAFF_SORT_KEY_VALUES } from '@/app/frontend_admin/admin_hr/hr_staff_management/constants/AdminHrStaffManagementConstants';

export type AdminHrSalaryType = 'Monthly' | 'Daily';
export type AdminHrStaffSortKey = (typeof STAFF_SORT_KEY_VALUES)[number];

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
  salaryType?: AdminHrSalaryType;
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

export interface AdminHrBranchReference {
  id: string;
  name: string;
}

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
  assignedBranches?: string[];
  primaryBranchId?: string;
};

export interface HrUiContextType {
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
  staffSortDir: AdminHrSortDirection;
  setStaffSort: (key: AdminHrStaffSortKey, direction: AdminHrSortDirection) => void;
  showToast: (msg: string, type: AdminToastType, id?: string) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  editData: Partial<Staff> | null;
  viewProfileData: Staff | null;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
}

export interface HrServerState {
  staff: Staff[];
  totalStaff: number;
  status: QueryStatus;
  error: string;
  retryStaff: () => Promise<unknown>;
  saving: boolean;
  loadAll: () => Promise<void>;
  saveStaff: (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => Promise<void | boolean>;
  deleteStaff: (id: string) => Promise<void | boolean>;
  toggleStaffStatus: (staff: Staff) => Promise<void | boolean>;
}

export type HrContextType = HrUiContextType & HrServerState;
