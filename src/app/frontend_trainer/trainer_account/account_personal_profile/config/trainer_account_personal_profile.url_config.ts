// RESPONSIBILITY: Canonical personal-profile navigation and profile API contract.
// DATA FLOW: personal-profile consumers -> named route/profile API constants -> MODULE_URLS; password execution belongs to account_security.

export const TRAINER_PROFILE_VIEW_QUERY_PARAM = 'view' as const;
export const TRAINER_PROFILE_SCREEN_VIEWS = ['personal', 'security'] as const;

export const TRAINER_PROFILE_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_PROFILE_PAGE_SECURITY = '/frontend_trainer/trainer_account/account_security' as const;
export const TRAINER_PROFILE_PAGE_LIST = '/frontend_trainer/trainer_account/account_personal_profile' as const;

export const TRAINER_PROFILE_API_PROFILE = '/trainer/profile' as const;
// Frozen compatibility definition only; password requests are implemented exclusively by account_security.
export const TRAINER_PROFILE_API_PASSWORD = '/trainer/trainer_profile/password' as const;

export const TRAINER_PROFILE_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_PROFILE_PAGE_DASHBOARD,
    LIST: TRAINER_PROFILE_PAGE_LIST,
  } as const,
  API: {
    PROFILE: TRAINER_PROFILE_API_PROFILE,
  } as const,
} as const;
