// trainer_library_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_library.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_LIBRARY_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_LIBRARY_PAGE_LIST = '/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments' as const;

export const TRAINER_LIBRARY_API_DIET_PLANS_BASE = '/trainer/trainer_library/diet-plans' as const;
export const TRAINER_LIBRARY_API_ASSIGNED_MEMBERS = '/trainer/trainer_library/assigned-members' as const;
export const TRAINER_LIBRARY_API_ASSIGN_DIET = (memberId: string) => `/trainer/trainer_members/${memberId}/diet` as const;

export const TRAINER_LIBRARY_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_LIBRARY_PAGE_DASHBOARD,
    LIST: TRAINER_LIBRARY_PAGE_LIST,
  } as const,
  API: {
    DIET_PLANS_BASE: TRAINER_LIBRARY_API_DIET_PLANS_BASE,
    ASSIGNED_MEMBERS: TRAINER_LIBRARY_API_ASSIGNED_MEMBERS,
    ASSIGN_DIET: TRAINER_LIBRARY_API_ASSIGN_DIET,
  } as const,
} as const;
