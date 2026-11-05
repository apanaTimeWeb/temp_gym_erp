/**
 * Canonical module-owned URL configuration.
 * Each route/endpoint group has a descriptive, module-prefixed export.
 * Cross-leaf imports are forbidden, including sibling URL-config imports. Role navigation owns its separate public destination registry and duplicates only verified navigation href values; feature route/API contracts remain leaf-local.
 */

export const SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_ROUTES = {
      MAIN: '/frontend_superadmin/superadmin_platform_configuration/platform_configuration_white_labeling_settings',
    } as const;

export const SUPERADMIN_PLATFORM_CONFIGURATION_WHITE_LABELING_SETTINGS_API = {
      DOMAINS: '/superadmin/white-labeling/domains',
      UPDATE_STATUS: (id: string) => `/superadmin/white-labeling/domains/${id}/status`,
    } as const;


