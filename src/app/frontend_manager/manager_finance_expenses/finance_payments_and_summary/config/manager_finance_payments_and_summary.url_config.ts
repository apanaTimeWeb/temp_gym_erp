// RESPONSIBILITY: Owns every route path used by the Manager finance module.
/**
 * @description Canonical Manager finance URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAGES_LIST_URL = '/frontend_manager/manager_finance_expenses/finance_payments_and_summary';
const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_BASE_URL = '/api/v1/manager/finance';
const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_PAYMENTS_BASE_URL = '/api/v1/manager/finance/payments';
const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_PAYMENTS_BY_MEMBER_URL = (memberId: string) => `/api/v1/manager/finance/payments/member/${encodeURIComponent(memberId)}`;
const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_SUMMARY_URL = '/api/v1/manager/finance/summary';
const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_EXPORT_URL = '/api/v1/manager/finance/export';

export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_ROUTES = {
  PAGES: {
    LIST: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_PAGES_LIST_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_finance_expenses' as const, LEAF: '/frontend_manager/manager_finance_expenses/finance_payments_and_summary' as const }
} as const;

export const MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_API = {
  BASE: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_BASE_URL,
    PAYMENTS_BASE: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_PAYMENTS_BASE_URL,
    PAYMENTS_BY_MEMBER: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_PAYMENTS_BY_MEMBER_URL,
    SUMMARY: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_SUMMARY_URL,
    EXPORT: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_BACKEND_API_EXPORT_URL,
} as const;
