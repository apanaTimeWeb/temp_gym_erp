// RESPONSIBILITY: Centralizes route and endpoint constants for plans_catalog; URL literals are evidence-derived and API endpoints remain unchanged.
// DATA FLOW: leaf route/components → admin_billing_plans_catalog.url_config.ts → internal route constants or existing backend API URLs.

// admin_plans_url_config.ts
// Owned by: frontend_admin/admin_plans feature module
// URL strings only; no business logic and no hardcoded URLs in callers.
//
// ─── Internal Navigation Routes ────────────────────────────────────────────
/** Fail closed for empty/reserved path IDs: browsers normalize dot segments before fetch. */
function encodeAdminBillingPlansCatalogPathSegment(id: string): string {
  if (!id || !id.trim() || id === '.' || id === '..') throw new TypeError('Invalid path identifier');
  return encodeURIComponent(id);
}

export const ADMIN_PLANS_ROUTES = {
  root: '/frontend_admin/admin_billing/billing_plans_catalog' as const,
  dashboard: '/frontend_admin/admin_dashboard' as const,
} as const;

// ─── Backend API Endpoints ─────────────────────────────────────────────────
export const ADMIN_PLANS_BASE_URL = '/frontend_admin/admin_billing/billing_plans_catalog' as const;
export const ADMIN_PLANS_GET_ALL_URL = '/admin/plans/fetchAllPlans' as const;
export const ADMIN_PLANS_GET_ONE_CONTRACT_URL = '/admin/plans/fetchPlanById' as const;
export const ADMIN_PLANS_CREATE_URL = '/admin/plans/createPlan' as const;
export const ADMIN_PLANS_UPDATE_CONTRACT_URL = '/admin/plans/updatePlan' as const;
export const ADMIN_PLANS_DELETE_CONTRACT_URL = '/admin/plans/deletePlan' as const;
export const ADMIN_PLANS_GET_ONE_URL = (id: string) => `/admin/plans/${encodeAdminBillingPlansCatalogPathSegment(id)}` as const;
export const ADMIN_PLANS_UPDATE_URL = (id: string) => `/admin/plans/${encodeAdminBillingPlansCatalogPathSegment(id)}` as const;
export const ADMIN_PLANS_DELETE_URL = (id: string) => `/admin/plans/${encodeAdminBillingPlansCatalogPathSegment(id)}` as const;

export const ADMIN_PLANS_URLS = {
  base: ADMIN_PLANS_BASE_URL,
  getAll: ADMIN_PLANS_GET_ALL_URL,
  getOneContract: ADMIN_PLANS_GET_ONE_CONTRACT_URL,
  create: ADMIN_PLANS_CREATE_URL,
  updateContract: ADMIN_PLANS_UPDATE_CONTRACT_URL,
  deleteContract: ADMIN_PLANS_DELETE_CONTRACT_URL,
  getOne: ADMIN_PLANS_GET_ONE_URL,
  update: ADMIN_PLANS_UPDATE_URL,
  delete: ADMIN_PLANS_DELETE_URL,
} as const;

export const ADMIN_PLANS_API = ADMIN_PLANS_URLS;

// Canonical local fallback destination for this autonomous feature.
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard/dashboard_overview' as const;
