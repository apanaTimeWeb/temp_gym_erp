// RESPONSIBILITY: Owns every route path used by the Manager store module.
/**
 * @description Canonical Manager store URL/path registry. All URL literals are declared once as named constants and composed into the two canonical typed contracts below.
 * @dependencies Only module routing/API contract consumers; no business logic.
 * @edge-case Dynamic resource paths preserve the supplied identifier/query string exactly.
 */
const MANAGER_STORE_PRODUCTS_PAGES_PRODUCTS_URL = '/frontend_manager/manager_sales_billing/store_order_management';
const MANAGER_STORE_PRODUCTS_PAGES_ORDERS_URL = '/frontend_manager/manager_sales_billing/store_order_management';
const MANAGER_STORE_PRODUCTS_BACKEND_API_BASE_URL = '/api/v1/manager/store';
const MANAGER_STORE_PRODUCTS_BACKEND_API_PRODUCTS_BASE_URL = '/api/v1/manager/store/products';
const MANAGER_STORE_PRODUCTS_BACKEND_API_PRODUCT_UPDATE_URL = (id: string) => `/api/v1/manager/store/products/${id}`;
const MANAGER_STORE_PRODUCTS_BACKEND_API_PRODUCT_DELETE_URL = (id: string) => `/api/v1/manager/store/products/${id}`;
const MANAGER_STORE_PRODUCTS_BACKEND_API_ORDERS_BASE_URL = '/api/v1/manager/store/orders';
const MANAGER_STORE_PRODUCTS_BACKEND_API_SUMMARY_URL = '/api/v1/manager/store/summary';
const MANAGER_STORE_PRODUCTS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL = 'https://wa.me';

export const MANAGER_STORE_PRODUCTS_ROUTES = {
  PAGES: {
    PRODUCTS: MANAGER_STORE_PRODUCTS_PAGES_PRODUCTS_URL,
    ORDERS: MANAGER_STORE_PRODUCTS_PAGES_ORDERS_URL
  },
  PATHS: { ROOT_COMPATIBILITY: '/frontend_manager/manager_sales_billing' as const, LEAF: '/frontend_manager/manager_sales_billing/store_order_management' as const }
} as const;

export const MANAGER_STORE_PRODUCTS_API = {
  BASE: MANAGER_STORE_PRODUCTS_BACKEND_API_BASE_URL,
    PRODUCTS_BASE: MANAGER_STORE_PRODUCTS_BACKEND_API_PRODUCTS_BASE_URL,
    PRODUCT_UPDATE: MANAGER_STORE_PRODUCTS_BACKEND_API_PRODUCT_UPDATE_URL,
    PRODUCT_DELETE: MANAGER_STORE_PRODUCTS_BACKEND_API_PRODUCT_DELETE_URL,
    ORDERS_BASE: MANAGER_STORE_PRODUCTS_BACKEND_API_ORDERS_BASE_URL,
    SUMMARY: MANAGER_STORE_PRODUCTS_BACKEND_API_SUMMARY_URL,
  INTEGRATIONS: {
    WHATSAPP_WEB_BASE: MANAGER_STORE_PRODUCTS_INTEGRATIONS_WHATSAPP_WEB_BASE_URL
  }
} as const;
