// Canonical isolated Dashboard Overview contract. All URLs are copied from the supplied v5 client contract.
// trainer_dashboard_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_dashboard.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_DASHBOARD_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_DASHBOARD_PAGE_LIST = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_DASHBOARD_PAGE_WORKOUT = '/frontend_trainer/trainer_coaching/coaching_workout_plans' as const;
export const TRAINER_DASHBOARD_PAGE_ATTENDANCE = '/frontend_trainer/trainer_operations/operations_member_attendance' as const;
export const TRAINER_DASHBOARD_PAGE_MEMBERS = '/frontend_trainer/trainer_members/members_directory_and_profile' as const;
export const TRAINER_DASHBOARD_PAGE_LIBRARY = '/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments' as const;
export const TRAINER_DASHBOARD_PAGE_PROGRESS_TRACKING = '/frontend_trainer/trainer_coaching/coaching_individual_progress' as const;
export const TRAINER_DASHBOARD_PAGE_SCHEDULE = '/frontend_trainer/trainer_operations/operations_weekly_availability' as const;

export const TRAINER_DASHBOARD_API_STATS = '/trainer/trainer_dashboard/stats' as const;

export const TRAINER_DASHBOARD_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_DASHBOARD_PAGE_DASHBOARD,
    LIST: TRAINER_DASHBOARD_PAGE_LIST,
    WORKOUT: TRAINER_DASHBOARD_PAGE_WORKOUT,
    ATTENDANCE: TRAINER_DASHBOARD_PAGE_ATTENDANCE,
    MEMBERS: TRAINER_DASHBOARD_PAGE_MEMBERS,
    LIBRARY: TRAINER_DASHBOARD_PAGE_LIBRARY,
    PROGRESS_TRACKING: TRAINER_DASHBOARD_PAGE_PROGRESS_TRACKING,
    SCHEDULE: TRAINER_DASHBOARD_PAGE_SCHEDULE,
  } as const,
  API: {
    STATS: TRAINER_DASHBOARD_API_STATS,
  } as const,
} as const;
