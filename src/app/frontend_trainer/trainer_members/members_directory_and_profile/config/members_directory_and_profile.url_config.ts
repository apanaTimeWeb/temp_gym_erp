// trainer_members_url_config.ts
// RESPONSIBILITY: Canonical navigation, URL-view, query-parameter and API endpoint contract owned only by trainer_members.
// DATA FLOW: feature navigation/UI/API consumers -> typed constants -> canonical route/query/API contracts.

export const TRAINER_MEMBERS_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;

export const TRAINER_MEMBERS_QUERY_VIEW = 'view' as const;
export const TRAINER_MEMBERS_QUERY_MEMBER_ID = 'id' as const;
export const TRAINER_MEMBERS_LIST_VIEW = 'list' as const;
export const TRAINER_MEMBERS_PROFILE_VIEW_VALUES = ['overview', 'fitness', 'assessment', 'progress', 'workout', 'diet', 'attendance', 'notes'] as const;
export const TRAINER_MEMBERS_DEFAULT_PROFILE_VIEW = 'overview' as const;

export const TRAINER_MEMBERS_PAGE_LIST = '/frontend_trainer/trainer_members/members_directory_and_profile' as const;
export const TRAINER_MEMBERS_PAGE_ADD = '/frontend_trainer/trainer_members/members_directory_and_profile' as const;

export const TRAINER_MEMBERS_API_BASE = '/trainer/members' as const;
export const TRAINER_MEMBERS_API_STATS = '/trainer/trainer_members/stats' as const;
export const TRAINER_MEMBERS_API_GET_ONE = (id: string) => `/trainer/trainer_members/${id}` as const;
export const TRAINER_MEMBERS_API_UPDATE = (id: string) => `/trainer/trainer_members/${id}` as const;
export const TRAINER_MEMBERS_API_NOTES = (id: string) => `/trainer/trainer_members/${id}/notes` as const;
export const TRAINER_MEMBERS_API_ATTENDANCE = (id: string) => `/trainer/trainer_members/${id}/attendance` as const;
export const TRAINER_MEMBERS_API_DIET_PLANS = '/trainer/trainer_library/diet-plans' as const;
export const TRAINER_MEMBERS_API_WORKOUT_PLANS = '/trainer/trainer_workout/workouts' as const;
export const TRAINER_MEMBERS_API_PROGRESS_ENTRIES = (id: string) => `/trainer/trainer_progress_tracking/${id}/entries` as const;

export const TRAINER_MEMBERS_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_MEMBERS_PAGE_DASHBOARD,
    LIST: TRAINER_MEMBERS_PAGE_LIST,
    ADD: TRAINER_MEMBERS_PAGE_ADD,
  } as const,
  QUERY: {
    VIEW: TRAINER_MEMBERS_QUERY_VIEW,
    MEMBER_ID: TRAINER_MEMBERS_QUERY_MEMBER_ID,
    LIST_VIEW: TRAINER_MEMBERS_LIST_VIEW,
    PROFILE_VIEWS: TRAINER_MEMBERS_PROFILE_VIEW_VALUES,
    DEFAULT_PROFILE_VIEW: TRAINER_MEMBERS_DEFAULT_PROFILE_VIEW,
  } as const,
  API: {
    BASE: TRAINER_MEMBERS_API_BASE,
    STATS: TRAINER_MEMBERS_API_STATS,
    GET_ONE: TRAINER_MEMBERS_API_GET_ONE,
    UPDATE: TRAINER_MEMBERS_API_UPDATE,
    NOTES: TRAINER_MEMBERS_API_NOTES,
    ATTENDANCE: TRAINER_MEMBERS_API_ATTENDANCE,
    DIET_PLANS: TRAINER_MEMBERS_API_DIET_PLANS,
    WORKOUT_PLANS: TRAINER_MEMBERS_API_WORKOUT_PLANS,
    PROGRESS_ENTRIES: TRAINER_MEMBERS_API_PROGRESS_ENTRIES,
  } as const,
} as const;
