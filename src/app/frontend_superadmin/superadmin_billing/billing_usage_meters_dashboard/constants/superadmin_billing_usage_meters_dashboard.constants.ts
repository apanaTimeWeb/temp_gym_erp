/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminBillingUsageMetersConstants owned by the superadmin_billing_usage_meters feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Centralized mock data constants for the Usage Meters Module.
export const SUPERADMIN_BILLING_USAGE_METERS_DATE_RANGE_OPTIONS = [
  { value: 'this_week', labelKey: 'ui.date_range_this_week' },
  { value: 'this_month', labelKey: 'ui.date_range_this_month' },
  { value: 'custom', labelKey: 'ui.date_range_custom' },
] as const;
