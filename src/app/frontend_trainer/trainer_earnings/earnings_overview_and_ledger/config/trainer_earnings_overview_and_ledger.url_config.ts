// trainer_earnings_url_config.ts
// RESPONSIBILITY: Canonical navigation and API endpoint contract owned only by trainer_earnings.
// DATA FLOW: feature navigation/API consumers -> named URL constants -> MODULE_URLS.

export const TRAINER_EARNINGS_PAGE_DASHBOARD = '/frontend_trainer/trainer_dashboard/dashboard_overview' as const;
export const TRAINER_EARNINGS_PAGE_LIST = '/frontend_trainer/trainer_earnings/earnings_overview_and_ledger' as const;

export const TRAINER_EARNINGS_API_DATA = '/trainer/earnings' as const;
export const TRAINER_EARNINGS_API_KPIS = '/trainer/trainer_earnings/kpis' as const;
export const TRAINER_EARNINGS_API_PENDING = '/trainer/trainer_earnings/pending' as const;
export const TRAINER_EARNINGS_API_HISTORY = '/trainer/trainer_earnings/history' as const;

export const TRAINER_EARNINGS_URLS = {
  ROUTES: {
    DASHBOARD: TRAINER_EARNINGS_PAGE_DASHBOARD,
    LIST: TRAINER_EARNINGS_PAGE_LIST,
  } as const,
  API: {
    DATA: TRAINER_EARNINGS_API_DATA,
    KPIS: TRAINER_EARNINGS_API_KPIS,
    PENDING: TRAINER_EARNINGS_API_PENDING,
    HISTORY: TRAINER_EARNINGS_API_HISTORY,
  } as const,
} as const;
