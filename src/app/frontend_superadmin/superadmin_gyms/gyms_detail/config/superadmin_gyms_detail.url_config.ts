const SUPERADMIN_GYMS_PHYSICAL_ROUTES = {
  MAIN: '/frontend_superadmin/superadmin_gyms',
  DIRECTORY_LEAF: '/frontend_superadmin/superadmin_gyms/gyms_directory',
  DETAIL_LEAF: (gymId: string) => `/frontend_superadmin/superadmin_gyms/gyms_detail/${encodeURIComponent(gymId)}`,
} as const;
const SUPERADMIN_GYMS_PUBLIC_ROUTES = {
  MAIN: '/superadmin/gyms',
  ADD: '/superadmin/gyms/add',
  DETAIL: (gymId: string) => `/superadmin/gyms/${encodeURIComponent(gymId)}`,
} as const;
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_GYMS_DETAIL_ROUTES = {
  ...({
  ...SUPERADMIN_GYMS_PUBLIC_ROUTES,
  /** Domain-root URL kept for external compatibility; internal links use canonical leaf routes. */
  MAIN: SUPERADMIN_GYMS_PHYSICAL_ROUTES.MAIN,
  DIRECTORY_LEAF: SUPERADMIN_GYMS_PHYSICAL_ROUTES.DIRECTORY_LEAF,
  DETAIL_LEAF: SUPERADMIN_GYMS_PHYSICAL_ROUTES.DETAIL_LEAF,
  /** Canonical screen-level navigation factory. The old query-only detail route is never emitted. */
  VIEW: (view: 'list' | 'add' | 'detail', gymId?: string) => {
    if (view === 'add') return `${SUPERADMIN_GYMS_PHYSICAL_ROUTES.DIRECTORY_LEAF}?view=add`;
    if (view === 'detail' && gymId) return SUPERADMIN_GYMS_PHYSICAL_ROUTES.DETAIL_LEAF(gymId);
    return SUPERADMIN_GYMS_PHYSICAL_ROUTES.DIRECTORY_LEAF;
  },
  BILLING_PLANS: '/superadmin/saas-billing/plans',
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const),

} as const;
export const SUPERADMIN_GYMS_DETAIL_API = {
  ...({
  BASE: '/superadmin/gyms',
  BY_ID: (gymId: string) => `/superadmin/gyms/${encodeURIComponent(gymId)}`,
  STATUS: (gymId: string) => `/superadmin/gyms/${encodeURIComponent(gymId)}/status`,
  IMPERSONATE_GYM: (gymId: string) => `/superadmin/gyms/${encodeURIComponent(gymId)}/impersonate`,
  EMAIL_OWNER: (gymId: string) => `/superadmin/gyms/${encodeURIComponent(gymId)}/email`,
  EXPORT: '/superadmin/gyms/export',
  STATS: '/superadmin/gyms/stats',
  PROVISION: '/superadmin/gyms/provision',
  MOCK_EXPORT_FILE: '/__mocks__/superadmin/gyms/export.csv',
  SUBSCRIPTION_PLANS: '/superadmin/saas-billing/plans',
  GHOST_LOGIN: {
    SET_COOKIE_PROXY: '/auth/set-cookie',
    EXIT_GHOST_LOGIN_PROXY: '/auth/exit-ghost-login',
  },
  BUSINESS_CONTROLS: { BACKEND_API: { BASE: '/superadmin/gyms/business-controls' } },
  GYM_DETAIL: {
    BACKEND_API: {
      BASE: '/superadmin/gym-detail/business-overview',
      BY_GYM: (gymId: string) => `/superadmin/gym-detail/business-overview?gymId=${encodeURIComponent(gymId)}`,
    },
  },
} as const),

} as const;
