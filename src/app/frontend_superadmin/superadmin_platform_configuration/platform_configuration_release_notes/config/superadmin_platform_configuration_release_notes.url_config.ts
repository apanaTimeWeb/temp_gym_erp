const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE = "/superadmin/features";
const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE = `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE}/flags`;
const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_NOTES_BASE = `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE}/notes`;
/** Feature-owned navigation and frozen wire endpoints. Only these two contracts are exported. */
export const SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_ROUTES = {
  ...({ MAIN: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_release_notes', LEGACY: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management' } as const),
  SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_MANAGEMENT_ROUTES: ({ DESTINATION_1: "/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management",  MAIN: "/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management" } as const),
} as const;
export const SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_API = {
  ...({
  BASE: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_API_BASE,
  TENANTS: "/superadmin/gyms",
  FLAGS: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE,
  FLAG: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE}/${encodeURIComponent(id)}`,
  FLAG_HISTORY: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE}/${encodeURIComponent(id)}/history`,
  FLAG_TOGGLE: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_FLAGS_BASE}/${encodeURIComponent(id)}/toggle`,
  NOTES: SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_NOTES_BASE,
  NOTE: (id: string) => `${SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_NOTES_BASE}/${encodeURIComponent(id)}`,
} as const),
  SUPERADMIN_PLATFORM_CONFIGURATION_RELEASE_NOTES_EXISTING_ENDPOINTS: ({
  "FETCH_COMBINED": "/superadmin/features",
  "NOTES": "/superadmin/features/notes",
  "NOTE": "/superadmin/features/notes/:id"
} as const),
} as const;
