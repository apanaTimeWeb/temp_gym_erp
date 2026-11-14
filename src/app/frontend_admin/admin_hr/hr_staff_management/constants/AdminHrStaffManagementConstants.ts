// RESPONSIBILITY: Canonical staff-directory constants, fields and sort options for the Admin HR module.
// DATA FLOW: staff components/forms → typed local constants → visible directory behavior.

import { format } from 'date-fns';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';
import type { AdminHrStaffModalField } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementStaffModalFieldTypes';

export const EMPTY_STAFF: Partial<Staff> = {
  name: '', email: '', phone: '', role: '', salary: 0, branch: '', gender: 'MALE',
  address: '', joinDate: format(new Date(), 'yyyy-MM-dd'), temporaryPassword: '', isActive: true,
  aadhaar: '', upiId: '', assignedBranches: [], primaryBranchId: '',
};

export const STAFF_TABLE_HEADER_LABEL_KEYS: Record<string, string> = {
  Name: 'hr.static.full_name', Branch: 'hr.static.branch', Role: 'hr.static.role',
  Status: 'hr.static.status', Phone: 'hr.static.phone', Salary: 'hr.static.monthly_salary',
  Joined: 'hr.static.join_date',
};

export const STAFF_TABLE_HEADERS = ['Name', 'Branch', 'Role', 'Status', 'Phone', 'Salary', 'Joined'];
export const GENDER_OPTIONS = [
  { labelKey: 'hr.static.male', value: 'MALE' },
  { labelKey: 'hr.static.female', value: 'FEMALE' },
  { labelKey: 'hr.static.other', value: 'OTHER' },
] as const;

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
  { labelKey: 'hr.static.manager', value: 'Manager' },
  { labelKey: 'hr.static.receptionist', value: 'Receptionist' },
  { labelKey: 'hr.static.sales_executive', value: 'Sales Executive' },
  { labelKey: 'hr.static.dietitian_nutritionist', value: 'Nutritionist' },
  { labelKey: 'hr.static.housekeeping_helper', value: 'Housekeeping' },
  { labelKey: 'hr.static.other', value: 'Other' },
] as const;

export const STAFF_SORT_KEY_VALUES = ['name', 'branch', 'role', 'phone', 'salary', 'joinDate'] as const;
export const HR_ITEMS_PER_PAGE = 10;

export const STAFF_MODAL_FIELDS: AdminHrStaffModalField[] = [
  { labelKey: 'hr.static.full_name', key: 'name', type: 'text', placeholder: '' },
  { labelKey: 'hr.static.email', key: 'email', type: 'email', placeholder: '' },
  { labelKey: 'hr.static.phone', key: 'phone', type: 'tel', placeholder: '' },
  { labelKey: 'hr.static.aadhaar_no', key: 'aadhaar', type: 'tel', placeholder: '123456789012' },
  { labelKey: 'hr.static.upi_id', key: 'upiId', type: 'text', placeholder: 'rahul@okhdfcbank' },
  { labelKey: 'hr.static.monthly_salary', key: 'salary', type: 'number', placeholder: '' },
];
