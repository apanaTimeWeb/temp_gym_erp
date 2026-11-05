/**
 * Canonical module-owned URL configuration.
 * Host rewrites/public route mapping are integration-owned and intentionally remain unverified.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */
const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE = "/superadmin/features";
const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE = `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE}/flags`;
const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_NOTES_BASE = `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE}/notes`;

export const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES = { DESTINATION_1: "/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes",  MAIN: "/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management" } as const;

export const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_API = {
  BASE: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE,
  TENANTS: "/superadmin/gyms",
  FLAGS: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE,
  FLAG: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE}/${encodeURIComponent(id)}`,
  FLAG_HISTORY: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE}/${encodeURIComponent(id)}/history`,
  FLAG_TOGGLE: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE}/${encodeURIComponent(id)}/toggle`,
  NOTES: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_NOTES_BASE,
  NOTE: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_NOTES_BASE}/${encodeURIComponent(id)}`,
} as const;


