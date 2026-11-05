// trainer_sessions_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_sessions.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_SESSIONS_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_SESSIONS_PAGE_LIST = '/frontend_trainer/trainer_coaching/coaching_sessions' as const;

export const TRAINER_SESSIONS_API_LIST = '/trainer/sessions' as const;
export const TRAINER_SESSIONS_API_CREATE = '/trainer/sessions' as const;
export const TRAINER_SESSIONS_API_UPDATE = (id: string) => `/trainer/trainer_sessions/${id}` as const;
export const TRAINER_SESSIONS_API_CANCEL = (id: string) => `/trainer/trainer_sessions/${id}` as const;
export const TRAINER_SESSIONS_API_MARK_ATTENDANCE = (id: string) => `/trainer/trainer_sessions/${id}/attendance` as const;
export const TRAINER_SESSIONS_API_MARK_NO_SHOW = (id: string) => `/trainer/trainer_sessions/${id}/attendance` as const;
export const TRAINER_SESSIONS_API_MEMBERS = '/trainer/trainer_sessions/members' as const;

export const TRAINER_SESSIONS_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_SESSIONS_PAGE_DASHBOARD,
    LIST: TRAINER_SESSIONS_PAGE_LIST,
  } as const,
  API: {
    LIST: TRAINER_SESSIONS_API_LIST,
    CREATE: TRAINER_SESSIONS_API_CREATE,
    UPDATE: TRAINER_SESSIONS_API_UPDATE,
    CANCEL: TRAINER_SESSIONS_API_CANCEL,
    MARK_ATTENDANCE: TRAINER_SESSIONS_API_MARK_ATTENDANCE,
    MARK_NO_SHOW: TRAINER_SESSIONS_API_MARK_NO_SHOW,
    MEMBERS: TRAINER_SESSIONS_API_MEMBERS,
  } as const,
} as const;
