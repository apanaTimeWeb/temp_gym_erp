// RESPONSIBILITY: Provides static UI option and table-label constants for the HR module; no server data or form schemas.
/**
 * @description Provides the ManagerStaffPayrollAndAttendanceSharedConstants implementation for the hr module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_MAX_AMOUNT_MAJOR_UNITS = Number.MAX_SAFE_INTEGER / 100;

export const HR_TABS = ['Trainer List', 'Trainer Attendance', 'Salary & Payments', 'Staff Ledger', 'Give Advance', 'Pay Due'] as const;


export const STAFF_TABLE_HEADERS = ['Name', 'Role', 'Status', 'Phone', 'Salary', 'Advance', 'Joined'];

export const PAYROLL_TABLE_HEADERS = ['Staff', 'Month', 'Base Salary', 'Net Payable', 'Paid Amount', 'Pending', 'Status', 'Paid On'];


export const GENDER_OPTIONS = [
  { label: 'Male', labelKey: 'TEXT_STAFF_GENDER_MALE', value: 'MALE' },
  { label: 'Female', labelKey: 'TEXT_STAFF_GENDER_FEMALE', value: 'FEMALE' },
  { label: 'Other', labelKey: 'TEXT_STAFF_GENDER_OTHER', value: 'OTHER' },
] as const;


export const STAFF_ROLE_OPTIONS = [
  { label: 'General Trainer', labelKey: 'TEXT_STAFF_ROLE_GENERAL_TRAINER', value: 'General Trainer' },
  { label: 'Personal Trainer (PT)', labelKey: 'TEXT_STAFF_ROLE_PERSONAL_TRAINER', value: 'Personal Trainer' },
  { label: 'Gym Manager', labelKey: 'TEXT_STAFF_ROLE_GYM_MANAGER', value: 'Gym Manager' },
  { label: 'Receptionist', labelKey: 'TEXT_STAFF_ROLE_RECEPTIONIST', value: 'Receptionist' },
  { label: 'Sales Executive', labelKey: 'TEXT_STAFF_ROLE_SALES_EXECUTIVE', value: 'Sales Executive' },
  { label: 'Dietitian / Nutritionist', labelKey: 'TEXT_STAFF_ROLE_DIETITIAN', value: 'Nutritionist' },
  { label: 'Group Class Instructor', labelKey: 'TEXT_STAFF_ROLE_GROUP_INSTRUCTOR', value: 'Group Class Instructor' },
  { label: 'Housekeeping / Helper', labelKey: 'TEXT_STAFF_ROLE_HOUSEKEEPING', value: 'Housekeeping' },
  { label: 'Maintenance Technician', labelKey: 'TEXT_STAFF_ROLE_MAINTENANCE', value: 'Maintenance Technician' },
  { label: 'Cafeteria Staff', labelKey: 'TEXT_STAFF_ROLE_CAFETERIA', value: 'Cafeteria Staff' },
  { label: 'Other', labelKey: 'TEXT_STAFF_ROLE_OTHER', value: 'Other' },
] as const;


export const STAFF_MODAL_FIELDS = [
  { label: 'Full Name', labelKey: 'TEXT_STAFF_FIELD_FULL_NAME', key: 'name', type: 'text', placeholder: '', placeholderKey: '' },
  { label: 'Email', labelKey: 'TEXT_STAFF_FIELD_EMAIL', key: 'email', type: 'email', placeholder: '', placeholderKey: '' },
  { label: 'Phone', labelKey: 'TEXT_STAFF_FIELD_PHONE', key: 'phone', type: 'tel', placeholder: '', placeholderKey: '' },
  { label: 'Aadhaar No.', labelKey: 'TEXT_STAFF_FIELD_AADHAAR', key: 'aadhaar', type: 'tel', placeholder: '123456789012', placeholderKey: 'TEXT_STAFF_PLACEHOLDER_AADHAAR' },
  { label: 'UPI ID', labelKey: 'TEXT_STAFF_FIELD_UPI', key: 'upiId', type: 'text', placeholder: 'rahul@okhdfcbank', placeholderKey: 'TEXT_STAFF_PLACEHOLDER_UPI' },
  { label: 'Monthly Salary (₹)', labelKey: 'TEXT_STAFF_FIELD_MONTHLY_SALARY', key: 'salary', type: 'number', placeholder: '', placeholderKey: '' },
  { label: 'Advance Paid (₹)', labelKey: 'TEXT_STAFF_FIELD_ADVANCE', key: 'advanceSalary', type: 'number', placeholder: '0', placeholderKey: 'TEXT_STAFF_PLACEHOLDER_ZERO' },
  { label: 'Address', labelKey: 'TEXT_STAFF_FIELD_ADDRESS', key: 'address', type: 'text', placeholder: 'Full Address', placeholderKey: 'TEXT_STAFF_PLACEHOLDER_ADDRESS' },
] as const;

export const HR_PENDING_STATUS = 'PENDING' as const;

export const HR_ROLE_FILTER_OPTIONS = [
  { value: 'All', labelKey: 'COPY_ALL_ROLES' },
  { value: 'Manager', labelKey: 'COPY_MANAGER' },
  { value: 'Trainer', labelKey: 'COPY_TRAINER' },
] as const;

export const HR_PAYMENT_MODE_OPTIONS = [
  { value: 'Cash', labelKey: 'COPY_CASH_2' },
  { value: 'Bank Transfer', labelKey: 'COPY_BANK_TRANSFER_2' },
  { value: 'UPI', labelKey: 'COPY_UPI_1' },
  { value: 'Cheque', labelKey: 'COPY_CHEQUE_1' },
] as const;

export const HR_ADVANCE_PAYMENT_MODE_OPTIONS = [
  { value: 'Cash', labelKey: 'COPY_CASH_1' },
  { value: 'Bank Transfer', labelKey: 'COPY_BANK_TRANSFER_1' },
  { value: 'UPI', labelKey: 'COPY_UPI_3' },
  { value: 'Cheque', labelKey: 'COPY_CHEQUE_2' },
] as const;
