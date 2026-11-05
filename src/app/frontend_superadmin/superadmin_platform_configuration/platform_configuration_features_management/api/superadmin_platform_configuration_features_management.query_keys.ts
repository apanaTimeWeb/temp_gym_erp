/**
 * @description Canonical TanStack Query key registry for the Superadmin Features feature.
 * @invariant Query identity preserves feature-flag and rollout-tenant resource identity.
 */
export const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_QUERY_KEYS = {
  all: ['superadmin_platform_configuration_features', 'features'] as const,
  history: (flagId: string) => ['superadmin_platform_configuration_features', 'features', 'history', flagId] as const,
  tenants: ['superadmin_platform_configuration_features', 'features', 'tenants'] as const,
  rolloutInsights: ['superadmin_platform_configuration_features', 'features_rollout_insights'] as const,
} as const;
