// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_staff_ledger_management/constants/AdminFinanceStaffLedgerManagementConstants.ts)

import { format } from 'date-fns';
import type { Staff, PayrollFormValues } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';
import type { AdminFinanceStaffLedgerManagementStaffModalField } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementStaffModalFieldTypes';
import type { AdminFinanceStaffLedgerManagementLedgerEntryType } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/types/AdminFinanceStaffLedgerManagementTypes';


export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_PAYMENT_MODE_VALUES = ['Cash', 'Bank Transfer', 'UPI', 'Cheque'] as const;

export const FINANCE_STAFF_LEDGER_PAYMENT_MODE_OPTIONS = [
  { labelKey: 'hr.static.cash', value: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_PAYMENT_MODE_VALUES[0] },
  { labelKey: 'hr.static.bank_transfer', value: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_PAYMENT_MODE_VALUES[1] },
  { labelKey: 'hr.static.upi', value: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_PAYMENT_MODE_VALUES[2] },
  { labelKey: 'hr.static.cheque', value: ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_PAYMENT_MODE_VALUES[3] },
] as const;

export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_DEFAULT_PAYMENT_MODE = ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_PAYMENT_MODE_VALUES[1];

export const PAYROLL_STATUS = { PAID: 'PAID', PARTIAL: 'PARTIAL', PENDING: 'PENDING' } as const;

export const PAYROLL_STATUS_LABEL_KEYS: Record<string, string> = { PAID: 'hr.AdminAuditRepair.payrollPaid', PARTIAL: 'hr.AdminAuditRepair.payrollPartial', PENDING: 'hr.AdminAuditRepair.payrollPending' };

export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_TABS = ['Staff', 'Payroll', 'Advance', 'Dues', 'Ledger'] as const;

export const EMPTY_STAFF = { 
 name: '', 
 email: '', 
 phone: '', 
 role: '', 
 salary: 0, 
 branch: '',
 gender: 'MALE', 
 address: '', 
 joinDate: format(new Date(), 'yyyy-MM-dd'),
 temporaryPassword: '',
 isActive: true,
 aadhaar: '',
 upiId: '',
 advanceSalary: 0
};

export const EMPTY_PAYROLL_FORM = {
  staffId: '',
  month: format(new Date(), 'yyyy-MM'),
  amount: 0,
  paidAmount: 0,
  notes: ''
} as unknown as PayrollFormValues;

export const STAFF_TABLE_HEADER_LABEL_KEYS: Record<string, string> = { Name: 'hr.static.full_name', Branch: 'hr.static.branch', Role: 'hr.static.role', Status: 'hr.static.status', Phone: 'hr.static.phone', Salary: 'hr.static.monthly_salary', Advance: 'hr.static.advance_paid', Joined: 'hr.static.join_date' };
export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_TABLE_HEADER_LABEL_KEYS: Record<string, string> = { Staff: 'hr.static.staff_member', Month: 'hr.static.month', 'Base Salary': 'hr.static.base_salary', 'Net Payable': 'hr.static.net_payable', 'Paid Amount': 'hr.static.paid_amount', Pending: 'hr.static.pending_amount', Status: 'hr.static.status', 'Paid On': 'hr.static.paid_on' };

export const STAFF_TABLE_HEADERS = ['Name', 'Branch', 'Role', 'Status', 'Phone', 'Salary', 'Advance', 'Joined'];

export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_TABLE_HEADERS = ['Staff', 'Month', 'Base Salary', 'Net Payable', 'Paid Amount', 'Pending', 'Status', 'Paid On'];

export const GENDER_OPTIONS = [
 { labelKey: 'hr.static.male', value: 'MALE' },
 { labelKey: 'hr.static.female', value: 'FEMALE' },
 { labelKey: 'hr.static.other', value: 'OTHER' }
];

export const STAFF_ROLE_OPTIONS = [
  { labelKey: 'hr.static.manager', value: 'Manager' },
  { labelKey: 'hr.static.general_trainer', value: 'General Trainer' },
  { labelKey: 'hr.static.personal_trainer_pt', value: 'Personal Trainer' },
  { labelKey: 'hr.static.gym_admin', value: 'Gym Admin' },
  { labelKey: 'hr.static.receptionist', value: 'Receptionist' },
  { labelKey: 'hr.static.sales_executive', value: 'Sales Executive' },
  { labelKey: 'hr.static.dietitian_nutritionist', value: 'Nutritionist' },
  { labelKey: 'hr.static.group_class_instructor', value: 'Group Class Instructor' },
  { labelKey: 'hr.static.housekeeping_helper', value: 'Housekeeping' },
  { labelKey: 'hr.static.maintenance_technician', value: 'Maintenance Technician' },
  { labelKey: 'hr.static.cafeteria_staff', value: 'Cafeteria Staff' },
  { labelKey: 'hr.static.other', value: 'Other' },
];

export const STAFF_ROLE_FILTER_OPTIONS = [
  { labelKey: 'hr.static.admin', value: 'Admin' },
  { labelKey: 'hr.static.trainer', value: 'Trainer' },
] as const;

export const STAFF_SORT_KEY_VALUES = ['name', 'branch', 'role', 'phone', 'salary', 'advanceSalary', 'joinDate'] as const;
export const PAYROLL_SORT_KEY_VALUES = ['staffName', 'month', 'amount', 'paidAmount', 'pendingAmount', 'status', 'paidAt'] as const;

export const STAFF_MODAL_FIELDS: AdminFinanceStaffLedgerManagementStaffModalField[] = [
 { labelKey: 'hr.static.full_name', key: 'name', type: 'text', placeholder: '' },
 { labelKey: 'hr.static.email', key: 'email', type: 'email', placeholder: '' },
 { labelKey: 'hr.static.phone', key: 'phone', type: 'tel', placeholder: '' },
 { labelKey: 'hr.static.aadhaar_no', key: 'aadhaar', type: 'tel', placeholder: '123456789012' },
 { labelKey: 'hr.static.upi_id', key: 'upiId', type: 'text', placeholder: 'rahul@okhdfcbank' },
 { labelKey: 'hr.static.monthly_salary', key: 'salary', type: 'number', placeholder: '' },
 { labelKey: 'hr.static.advance_paid', key: 'advanceSalary', type: 'number', placeholder: '0' },
];

export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_ITEMS_PER_PAGE = 10;

export const ADMIN_FINANCE_STAFF_LEDGER_MANAGEMENT_LEDGER_ENTRY_STYLE_CLASSES: Record<AdminFinanceStaffLedgerManagementLedgerEntryType, string> = {
  'Advance Given': 'bg-danger text-on-danger',
  'Salary Generated': 'bg-info text-on-info',
  'Due Paid': 'bg-warning-bg text-warning',
  'Salary Paid': 'bg-success text-on-success',
};

