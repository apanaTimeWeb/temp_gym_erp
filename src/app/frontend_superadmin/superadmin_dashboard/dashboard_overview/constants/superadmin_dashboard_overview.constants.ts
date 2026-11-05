/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminDashboardConstants owned by the superadmin_dashboard feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No static module imports; see dynamic import sites in source.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns static Dashboard UI labels and semantic tone mappings; server analytics remain API state.
export const SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES = {
    HIGH: { badge: 'bg-danger-bg text-danger', icon: 'text-danger' },
    MEDIUM: { badge: 'bg-warning-bg text-warning', icon: 'text-warning' },
    LOW: { badge: 'bg-info-bg text-info', icon: 'text-info' },
} as const;

export const SUPERADMIN_DASHBOARD_CHART_COLORS = {
    PRIMARY: 'var(--chart-primary)',
    INFO: 'var(--chart-info)',
    SUCCESS: 'var(--chart-success)',
    WARNING: 'var(--chart-warning)',
    DANGER: 'var(--chart-danger)',
    TEXT_SECONDARY: 'var(--text-secondary)',
    BORDER: 'var(--border)',
    GRID: 'var(--chart-grid)',
    SECONDARY: 'var(--chart-secondary)',
} as const;

export const DASHBOARD_PLAN_BADGE_CLASSES: Record<string, string> = {
    ENTERPRISE: 'bg-primary-subtle text-primary',
    PRO: 'bg-success-bg text-success',
    STARTER: 'bg-info-bg text-info',
};

export function getDashboardPlanBadgeClass(plan: string | null | undefined): string {
    return DASHBOARD_PLAN_BADGE_CLASSES[plan?.trim().toUpperCase() ?? ''] ?? DASHBOARD_PLAN_BADGE_FALLBACK_CLASS;
}

export const DASHBOARD_PLAN_BADGE_FALLBACK_CLASS = 'bg-input text-secondary';

export const DASHBOARD_TIME_RANGE_LABEL_KEYS = {
  this_month: 'ui.date_this_month', last_month: 'ui.date_last_month', last_3_months: 'ui.date_last_3_months',
  last_6_months: 'ui.date_last_6_months', this_year: 'ui.date_this_year', monthly: 'ui.date_monthly_all_time',
  yearly: 'ui.date_yearly_all_time', custom: 'ui.date_custom_range',
} as const;

export const SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER = 1;

export const SUPERADMIN_DASHBOARD_CURRENCY_AXIS_DIVISOR = 1000;
