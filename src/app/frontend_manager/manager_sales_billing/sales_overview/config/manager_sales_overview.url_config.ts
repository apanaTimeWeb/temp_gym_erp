// RESPONSIBILITY: Owns every route path used by the Manager sales module.
/**
 * @description Canonical Manager sales URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_SALES_OVERVIEW_UI_PAGE_HOME_URL = '/frontend_manager/manager_sales_billing/sales_overview';
const MANAGER_SALES_OVERVIEW_QUERY_VIEW_PARAM = 'view';
const MANAGER_SALES_OVERVIEW_QUERY_LEGACY_TAB_PARAM = 'tab';
const MANAGER_SALES_OVERVIEW_BACKEND_API_BASE_URL = '/api/v1/manager/sales';
const MANAGER_SALES_OVERVIEW_BACKEND_API_OVERVIEW_URL = '/api/v1/manager/sales/overview';
const MANAGER_SALES_OVERVIEW_BACKEND_API_MEMBERSHIP_REPORT_URL = '/api/v1/manager/sales/membership-report';
const MANAGER_SALES_OVERVIEW_BACKEND_API_PENDING_PAYMENTS_URL = '/api/v1/manager/sales/pending-payments';
const MANAGER_SALES_OVERVIEW_BACKEND_API_ALL_MEMBERSHIPS_URL = '/api/v1/manager/sales/all-memberships';
const MANAGER_SALES_OVERVIEW_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_SALES_OVERVIEW_ROUTES = {
  UI: {
    HOME: MANAGER_SALES_OVERVIEW_UI_PAGE_HOME_URL
  },
  QUERY_PARAMS: {
    VIEW: MANAGER_SALES_OVERVIEW_QUERY_VIEW_PARAM,
    LEGACY_TAB: MANAGER_SALES_OVERVIEW_QUERY_LEGACY_TAB_PARAM,
    SEARCH: 'search',
    PAGE: 'page',
    RANGE: 'range',
    START_DATE: 'startDate',
    END_DATE: 'endDate',
    LIMIT: 'limit',
    MEMBERSHIP_FILTER: 'membershipFilter',
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_sales_billing' as const, LEAF: '/frontend_manager/manager_sales_billing/sales_overview' as const }
} as const;

export const MANAGER_SALES_OVERVIEW_API = {
  BASE: MANAGER_SALES_OVERVIEW_BACKEND_API_BASE_URL,
    OVERVIEW: MANAGER_SALES_OVERVIEW_BACKEND_API_OVERVIEW_URL,
    MEMBERSHIP_REPORT: MANAGER_SALES_OVERVIEW_BACKEND_API_MEMBERSHIP_REPORT_URL,
    PENDING_PAYMENTS: MANAGER_SALES_OVERVIEW_BACKEND_API_PENDING_PAYMENTS_URL,
    ALL_MEMBERSHIPS: MANAGER_SALES_OVERVIEW_BACKEND_API_ALL_MEMBERSHIPS_URL,
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_SALES_OVERVIEW_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;
