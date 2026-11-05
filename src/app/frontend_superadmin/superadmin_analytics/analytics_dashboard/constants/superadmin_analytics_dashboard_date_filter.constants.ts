/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsDateFilterConstants owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static date-filter options for the Superadmin Analytics feature.
export const SUPERADMIN_ANALYTICS_DATE_FILTER_OPTIONS = [
  { value: 'this_month', labelKey: 'ui.date_this_month' },
  { value: 'last_month', labelKey: 'ui.date_last_month' },
  { value: 'last_3_months', labelKey: 'ui.date_last_3_months' },
  { value: 'last_6_months', labelKey: 'ui.date_last_6_months' },
  { value: 'this_year', labelKey: 'ui.date_this_year' },
  { value: 'monthly', labelKey: 'ui.date_monthly_all_time' },
  { value: 'yearly', labelKey: 'ui.date_yearly_all_time' },
  { value: 'custom', labelKey: 'ui.date_custom_range' },
] as const;
