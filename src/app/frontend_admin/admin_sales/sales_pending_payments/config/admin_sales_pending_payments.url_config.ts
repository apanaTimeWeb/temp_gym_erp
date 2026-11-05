// RESPONSIBILITY: Canonical routes and pending-payment API endpoint owned by this leaf.
export const ADMIN_SALES_ROUTES = { root: '/frontend_admin/admin_sales/sales_pending_payments', dashboard: '/frontend_admin/admin_dashboard' } as const;
export const ADMIN_SALES_PENDING_PAYMENTS_URL = '/admin/sales/pending-payments' as const;
export const ADMIN_SALES_API = { pendingPayments: ADMIN_SALES_PENDING_PAYMENTS_URL } as const;

/** External destination retained verbatim from the supplied Admin v43 source. */
export const ADMIN_SALES_WHATSAPP_WEB_URL = 'https://wa.me/91' as const;
export const ADMIN_SALES_EXTERNAL_URLS = { whatsappWeb: ADMIN_SALES_WHATSAPP_WEB_URL } as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
