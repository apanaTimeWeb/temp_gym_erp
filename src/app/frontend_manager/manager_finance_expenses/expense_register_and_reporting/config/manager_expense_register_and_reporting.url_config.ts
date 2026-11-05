// RESPONSIBILITY: Owns every route path used by the Manager expenses module.
/**
 * @description Canonical Manager expenses URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_EXPENSE_REGISTER_AND_REPORTING_UI_PAGE_HOME_URL = '/frontend_manager/manager_finance_expenses/expense_register_and_reporting';
const MANAGER_EXPENSE_REGISTER_AND_REPORTING_BACKEND_API_BASE_URL = '/api/v1/manager/expenses';
const MANAGER_EXPENSE_REGISTER_AND_REPORTING_BACKEND_API_GET_ONE_URL = (id: string) => `/api/v1/manager/expenses/${id}`;
const MANAGER_EXPENSE_REGISTER_AND_REPORTING_BACKEND_API_STATS_URL = '/api/v1/manager/expenses/stats';

export const MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES = {
  UI: {
    HOME: MANAGER_EXPENSE_REGISTER_AND_REPORTING_UI_PAGE_HOME_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_finance_expenses' as const, LEAF: '/frontend_manager/manager_finance_expenses/expense_register_and_reporting' as const }
} as const;

export const MANAGER_EXPENSE_REGISTER_AND_REPORTING_API = {
  BASE: MANAGER_EXPENSE_REGISTER_AND_REPORTING_BACKEND_API_BASE_URL,
    GET_ONE: MANAGER_EXPENSE_REGISTER_AND_REPORTING_BACKEND_API_GET_ONE_URL,
    STATS: MANAGER_EXPENSE_REGISTER_AND_REPORTING_BACKEND_API_STATS_URL
} as const;
