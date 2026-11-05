// trainer_account_security.url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_account_security.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_ACCOUNT_SECURITY_VIEW_QUERY_PARAM = 'view' as const;
export const TRAINER_ACCOUNT_SECURITY_SCREEN_VIEWS = ['personal', 'security'] as const;

export const TRAINER_ACCOUNT_SECURITY_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_ACCOUNT_SECURITY_PAGE_LIST = '/frontend_trainer/trainer_account/account_security' as const;

export const TRAINER_PROFILE_API_PROFILE = '/trainer/profile' as const;
export const TRAINER_PROFILE_API_PASSWORD = '/trainer/trainer_profile/password' as const;

export const TRAINER_ACCOUNT_SECURITY_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_ACCOUNT_SECURITY_PAGE_DASHBOARD,
    LIST: TRAINER_ACCOUNT_SECURITY_PAGE_LIST,
  } as const,
  API: {
    PROFILE: TRAINER_PROFILE_API_PROFILE,
    PASSWORD: TRAINER_PROFILE_API_PASSWORD,
  } as const,
} as const;
