/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsDateRangeConstants owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Defines canonical Superadmin Analytics date-range and boundary identifiers.
export const SUPERADMIN_ANALYTICS_DATE_RANGES = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;
export const SUPERADMIN_ANALYTICS_DATE_FILTER_BOUNDARIES = ['start', 'end'] as const;
export const SUPERADMIN_ANALYTICS_TIME_RANGES = SUPERADMIN_ANALYTICS_DATE_RANGES;
