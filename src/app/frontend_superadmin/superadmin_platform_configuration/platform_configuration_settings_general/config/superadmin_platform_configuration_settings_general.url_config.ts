/** Canonical URL contracts for the autonomous Superadmin Settings General sub-module. */
export const SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_ROUTES = { MAIN: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_settings_general' } as const;

export const SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_GENERAL_API = {
  BASE: '/superadmin/settings',
  UPDATE: (id: string) => `/superadmin/settings/${encodeURIComponent(id)}`,
  UPDATE_PATTERN: '/superadmin/settings/:id',
  /** Retained as documented source metadata; not wired without a confirmed consuming contract. */
  GOVERNANCE: { BACKEND_API: { BASE: '/superadmin/settings/governance' } },
} as const;

