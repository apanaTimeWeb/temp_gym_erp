/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformConfigurationFeaturesUiConstants owned by the superadmin_platform_configuration_features feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
export const SUPERADMIN_PLATFORM_CONFIGURATION_FEATURES_TABS = ['FLAGS', 'NOTES', 'TIERS'] as const;
export const SUPERADMIN_FEATURE_FLAG_STATUS_CODES = { ACTIVE: 'ACTIVE', DISABLED: 'DISABLED', COMPLETED: 'COMPLETED' } as const;
