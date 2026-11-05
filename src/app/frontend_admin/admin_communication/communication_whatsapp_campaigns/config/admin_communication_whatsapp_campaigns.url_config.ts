// RESPONSIBILITY: Centralizes route and endpoint constants for communication_whatsapp_campaigns; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_communication_whatsapp_campaigns.url_config.ts → internal route constants or existing backend API URLs.

// admin_campaigns_url_config.ts
// Owned by: frontend_admin/admin_communication/communication_whatsapp_campaigns
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
export const ADMIN_CAMPAIGNS_ROUTES = {
  root: '/frontend_admin/admin_communication/communication_whatsapp_campaigns' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_CAMPAIGNS_AUDIENCES_URL = '/admin/campaigns/audiences' as const;
export const ADMIN_CAMPAIGNS_TEMPLATES_URL = '/admin/campaigns/templates' as const;
export const ADMIN_CAMPAIGNS_RECIPIENTS_URL = '/admin/campaigns/recipients' as const;

export const ADMIN_CAMPAIGNS_URLS = {
  audiences: ADMIN_CAMPAIGNS_AUDIENCES_URL,
  templates: ADMIN_CAMPAIGNS_TEMPLATES_URL,
  recipients: ADMIN_CAMPAIGNS_RECIPIENTS_URL,
} as const;

export const ADMIN_CAMPAIGNS_API = ADMIN_CAMPAIGNS_URLS;

export const ADMIN_CAMPAIGNS_WHATSAPP_WEB_URL = 'https://wa.me' as const;
export const ADMIN_CAMPAIGNS_EXTERNAL_URLS = { whatsappWeb: ADMIN_CAMPAIGNS_WHATSAPP_WEB_URL } as const;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
