// RESPONSIBILITY: Centralizes the HR staff route and verified staff API endpoint literals.
// DATA FLOW: Staff views/hooks → canonical staff URL constants → internal routes or backend API.

/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminHrStaffManagementPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_HR_ROUTES = {
  root: '/frontend_admin/admin_hr/hr_staff_management',
  dashboard: '/frontend_admin/admin_dashboard',
} as const;

export const ADMIN_HR_BRANCH_REFERENCE_URL = '/admin/branches/fetchBranches' as const;
export const ADMIN_HR_STAFF_BASE_URL = '/admin/hr/staff' as const;
export const ADMIN_HR_STAFF_GET_ONE_URL = (id: string) => `/admin/hr/staff/${encodeAdminHrStaffManagementPathSegment(id)}` as const;
export const ADMIN_HR_STAFF_UPDATE_URL = (id: string) => `/admin/hr/staff/${encodeAdminHrStaffManagementPathSegment(id)}` as const;
export const ADMIN_HR_STAFF_DELETE_URL = (id: string) => `/admin/hr/staff/${encodeAdminHrStaffManagementPathSegment(id)}` as const;
export const ADMIN_HR_BULK_DEACTIVATE_URL = '/admin/hr/staff/bulk-deactivate' as const;

export const ADMIN_HR_API = {
  branchReference: ADMIN_HR_BRANCH_REFERENCE_URL,
  staffBase: ADMIN_HR_STAFF_BASE_URL,
  staffGetOne: ADMIN_HR_STAFF_GET_ONE_URL,
  staffUpdate: ADMIN_HR_STAFF_UPDATE_URL,
  staffDelete: ADMIN_HR_STAFF_DELETE_URL,
  bulkDeactivate: ADMIN_HR_BULK_DEACTIVATE_URL,
} as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
