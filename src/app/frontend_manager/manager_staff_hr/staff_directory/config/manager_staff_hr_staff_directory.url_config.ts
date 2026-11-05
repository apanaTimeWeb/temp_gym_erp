// RESPONSIBILITY: Owns only Staff Directory page and staff-resource paths.
const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAGES_STAFF_LIST_URL = '/frontend_manager/manager_staff_hr/staff_directory';
const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_BACKEND_API_STAFF_BASE_URL = '/api/v1/manager/hr/staff';
const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_BACKEND_API_STAFF_GET_ONE_URL = (id: string) =>
  `/api/v1/manager/hr/staff/${encodeURIComponent(id)}`;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES = {
  PAGES: {
    STAFF_LIST: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_PAGES_STAFF_LIST_URL,
  },
  PATHS: {
    ROOT_COMPATIBILITY: '/frontend_manager/manager_staff_hr' as const,
    LEAF: '/frontend_manager/manager_staff_hr/staff_directory' as const,
  },
} as const;

export const MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_API = {
  STAFF_BASE: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_BACKEND_API_STAFF_BASE_URL,
  STAFF_GET_ONE: MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_BACKEND_API_STAFF_GET_ONE_URL,
} as const;
