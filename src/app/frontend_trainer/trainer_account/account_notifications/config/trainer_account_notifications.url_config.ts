// trainer_notifications_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_notifications.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_NOTIFICATIONS_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_NOTIFICATIONS_PAGE_LIST = '/frontend_trainer/trainer_account/account_notifications' as const;

export const TRAINER_NOTIFICATIONS_API_LIST = '/trainer/notifications' as const;
export const TRAINER_NOTIFICATIONS_API_LIST_PAGINATED = (page: number, limit: number) => `/trainer/notifications?page=${page}&limit=${limit}` as const;
export const TRAINER_NOTIFICATIONS_API_MARK_READ = (id: string) => `/trainer/trainer_notifications/${id}/read` as const;
export const TRAINER_NOTIFICATIONS_API_MARK_ALL_READ = '/trainer/trainer_notifications/read-all' as const;
export const TRAINER_NOTIFICATIONS_API_WS_ENDPOINT = '/trainer/trainer_notifications/ws' as const;
export const TRAINER_NOTIFICATIONS_API_PREFERENCES = '/trainer/trainer_notifications/preferences' as const;

export const TRAINER_NOTIFICATIONS_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_NOTIFICATIONS_PAGE_DASHBOARD,
    LIST: TRAINER_NOTIFICATIONS_PAGE_LIST,
  } as const,
  API: {
    LIST: TRAINER_NOTIFICATIONS_API_LIST,
    LIST_PAGINATED: TRAINER_NOTIFICATIONS_API_LIST_PAGINATED,
    MARK_READ: TRAINER_NOTIFICATIONS_API_MARK_READ,
    MARK_ALL_READ: TRAINER_NOTIFICATIONS_API_MARK_ALL_READ,
    WS_ENDPOINT: TRAINER_NOTIFICATIONS_API_WS_ENDPOINT,
    PREFERENCES: TRAINER_NOTIFICATIONS_API_PREFERENCES,
  } as const,
} as const;
