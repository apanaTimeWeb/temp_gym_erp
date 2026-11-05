// trainer_progress_tracking_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_progress_tracking.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_PROGRESS_TRACKING_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_PROGRESS_TRACKING_PAGE_LIST = '/frontend_trainer/trainer_coaching/coaching_individual_progress' as const;
export const TRAINER_PROGRESS_TRACKING_VIEW_QUERY_PARAM = 'view' as const;
export const TRAINER_PROGRESS_TRACKING_SCREEN_VIEW_VALUES = ['individual', 'compare'] as const;

export const TRAINER_PROGRESS_TRACKING_API_MEMBERS = '/trainer/trainer_progress_tracking/members' as const;
export const TRAINER_PROGRESS_TRACKING_API_ENTRIES = (memberId: string) => `/trainer/trainer_progress_tracking/${memberId}/entries` as const;
export const TRAINER_PROGRESS_TRACKING_API_ENTRY_DETAIL = (memberId: string, entryId: string) => `/trainer/trainer_progress_tracking/${memberId}/entries/${entryId}` as const;
export const TRAINER_PROGRESS_TRACKING_API_SUMMARY = (memberId: string) => `/trainer/trainer_progress_tracking/${memberId}/summary` as const;

export const TRAINER_PROGRESS_TRACKING_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_PROGRESS_TRACKING_PAGE_DASHBOARD,
    LIST: TRAINER_PROGRESS_TRACKING_PAGE_LIST,
  } as const,
  API: {
    MEMBERS: TRAINER_PROGRESS_TRACKING_API_MEMBERS,
    ENTRIES: TRAINER_PROGRESS_TRACKING_API_ENTRIES,
    ENTRY_DETAIL: TRAINER_PROGRESS_TRACKING_API_ENTRY_DETAIL,
    SUMMARY: TRAINER_PROGRESS_TRACKING_API_SUMMARY,
  } as const,
} as const;
