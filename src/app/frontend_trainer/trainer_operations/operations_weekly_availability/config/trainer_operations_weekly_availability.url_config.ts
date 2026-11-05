// trainer_schedule_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_schedule.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_SCHEDULE_VIEW_QUERY_PARAM = 'view' as const;
export const TRAINER_SCHEDULE_SCREEN_VIEWS = ['availability'] as const;

export const TRAINER_SCHEDULE_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_SCHEDULE_PAGE_LIST = '/frontend_trainer/trainer_operations/operations_weekly_availability' as const;

export const TRAINER_SCHEDULE_API_SCHEDULE = '/trainer/schedule' as const;
export const TRAINER_SCHEDULE_API_AVAILABILITY = '/trainer/trainer_schedule/availability' as const;

export const TRAINER_SCHEDULE_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_SCHEDULE_PAGE_DASHBOARD,
    LIST: TRAINER_SCHEDULE_PAGE_LIST,
  } as const,
  API: {
    SCHEDULE: TRAINER_SCHEDULE_API_SCHEDULE,
    AVAILABILITY: TRAINER_SCHEDULE_API_AVAILABILITY,
    LEAVES: '/trainer/trainer_schedule/leaves' as const,
  } as const,
} as const;
