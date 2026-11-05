/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationSettingsQueryKeys owned by the superadmin_platform_configuration_settings feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines the canonical TanStack Query keys for the settings feature.
export const SUPERADMIN_PLATFORM_CONFIGURATION_SETTINGS_QUERY_KEYS = {
  all: ['superadmin_platform_configuration_settings'] as const,
  governance: ['superadmin_platform_configuration_settings', 'governance'] as const,
};
