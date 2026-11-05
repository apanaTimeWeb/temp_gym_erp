/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminAnalyticsKpiConstants owned by the superadmin_analytics feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
export const SUPERADMIN_ANALYTICS_KPI_ICON_BACKGROUND_CLASSES = [
  'bg-success-bg',
  'bg-primary-subtle',
  'bg-danger-bg',
  'bg-warning-bg',
] as const;

export const SUPERADMIN_ANALYTICS_KPI_ICON_TEXT_CLASSES = [
  'text-success',
  'text-primary',
  'text-danger',
  'text-warning',
] as const;

export const SUPERADMIN_ANALYTICS_SECONDARY_METRIC_KEYS = ['ltv', 'cac'] as const;
export const SUPERADMIN_ANALYTICS_SECONDARY_METRIC_TONES = ['success', 'warning'] as const;
export const SUPERADMIN_ANALYTICS_SECONDARY_METRIC_ICONS = ['activity', 'currency'] as const;
export const SUPERADMIN_ANALYTICS_KPI_DELTA_PERIOD_KEYS = ['ui.from_last_month', 'ui.from_last_year', 'ui.vs_last_month'] as const;
