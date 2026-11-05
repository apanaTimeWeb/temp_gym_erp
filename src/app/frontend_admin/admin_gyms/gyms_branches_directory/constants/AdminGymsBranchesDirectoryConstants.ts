// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_branches/branches_directory/constants/AdminGymsBranchesDirectoryConstants.ts)

import type { AdminBranchStatus } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';
import type { AdminBranchesTimeRange } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTimeRangeTypes';
import type { DetailView } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryUiTypes';


export const BRANCH_TIME_RANGE_OPTIONS: ReadonlyArray<{ value: AdminBranchesTimeRange; labelKey: string }> = [
  { value: 'weekly', labelKey: 'branches.static.this_week' },
  { value: 'monthly', labelKey: 'branches.static.this_month' },
  { value: 'yearly', labelKey: 'branches.static.this_year' },
  { value: 'custom', labelKey: 'branches.static.custom_range' },
];

export const BRANCH_STATUS = { ACTIVE: 'active', INACTIVE: 'inactive' } as const;

export const BRANCH_STATUS_OPTIONS: ReadonlyArray<{ value: AdminBranchStatus | 'all'; labelKey: string }> = [
  { value: 'all', labelKey: 'branches.static.all_statuses' },
  { value: 'active', labelKey: 'branches.static.active' },
  { value: 'inactive', labelKey: 'branches.static.inactive' },
];

export const BRANCH_STATUS_LABEL_KEYS: Record<AdminBranchStatus, string> = { active: 'branches.static.active', inactive: 'branches.static.inactive' };

export const BRANCH_STATUS_STYLES: Record<AdminBranchStatus, string> = {
  active: 'bg-success-bg text-success',
  inactive: 'bg-danger-bg text-danger',
};

export const BRANCH_PAYMENT_METHOD_STYLES: Readonly<Record<string, string>> = {
  UPI: 'bg-pay-upi-bg text-pay-upi',
  Cash: 'bg-pay-cash-bg text-pay-cash',
  Card: 'bg-pay-card-bg text-pay-card',
  Bank: 'bg-pay-bank-bg text-pay-bank',
};

export const BRANCH_DETAIL_TITLES: Record<DetailView, { labelKey: string }> = {
  revenue: { labelKey: 'branches.static.revenue_breakdown' },
  expenses: { labelKey: 'branches.static.expense_breakdown' },
  staff: { labelKey: 'branches.static.staff_list' },
  students: { labelKey: 'branches.static.students' },
};

export const ADMIN_BRANCH_STAFF_STATUS = {
  ACTIVE: 'active',
  ON_LEAVE: 'on-leave',
} as const;

export const ADMIN_BRANCH_STAFF_STATUS_LABEL_KEYS: Record<keyof typeof ADMIN_BRANCH_STAFF_STATUS, string> = { ACTIVE: 'branches.static.active', ON_LEAVE: 'branches.static.on_leave' };

export const ADMIN_BRANCH_STUDENT_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
} as const;

export const ADMIN_BRANCH_STUDENT_STATUS_LABEL_KEYS: Record<keyof typeof ADMIN_BRANCH_STUDENT_STATUS, string> = { ACTIVE: 'branches.static.active', EXPIRED: 'branches.static.expired' };
