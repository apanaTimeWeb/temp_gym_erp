// trainer_attendance_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_attendance.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_ATTENDANCE_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_ATTENDANCE_PAGE_LIST = '/frontend_trainer/trainer_operations/operations_trainer_attendance' as const;
export const TRAINER_ATTENDANCE_VIEW_QUERY_PARAM = 'view' as const;
export const TRAINER_ATTENDANCE_SCREEN_VIEW_VALUES = ['members', 'my-attendance'] as const;

export const TRAINER_ATTENDANCE_API_BASE = '/trainer/attendance' as const;
export const TRAINER_ATTENDANCE_API_STATS = '/trainer/trainer_attendance/stats' as const;
export const TRAINER_ATTENDANCE_API_MEMBERS_BASIC = '/trainer/trainer_attendance/members-basic' as const;
export const TRAINER_ATTENDANCE_API_TODAY_STATS = '/trainer/trainer_attendance/today-stats' as const;
export const TRAINER_ATTENDANCE_API_CHECKOUT = (id: string) => `/trainer/trainer_attendance/checkout/${id}` as const;

export const TRAINER_ATTENDANCE_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_ATTENDANCE_PAGE_DASHBOARD,
    LIST: TRAINER_ATTENDANCE_PAGE_LIST,
  } as const,
  API: {
    BASE: TRAINER_ATTENDANCE_API_BASE,
    STATS: TRAINER_ATTENDANCE_API_STATS,
    MEMBERS_BASIC: TRAINER_ATTENDANCE_API_MEMBERS_BASIC,
    TODAY_STATS: TRAINER_ATTENDANCE_API_TODAY_STATS,
    CHECKOUT: TRAINER_ATTENDANCE_API_CHECKOUT,
  } as const,
} as const;
