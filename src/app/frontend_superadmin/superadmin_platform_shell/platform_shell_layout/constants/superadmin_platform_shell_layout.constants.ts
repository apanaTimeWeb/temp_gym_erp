/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminPlatformShellLayoutConstants owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin layout theme identifiers and role-shell static values.
export const SUPERADMIN_PLATFORM_SHELL_LAYOUT_THEMES = ['dark', 'light'] as const;

export const SUPERADMIN_PLATFORM_SHELL_LAYOUT_ERROR_BOUNDARY_VARIANTS = ['default', 'inline'] as const;
