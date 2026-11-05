// RESPONSIBILITY: Static hardcoded data and style constants for the Reports module.
// All mock data lives here so the client component stays pure UI. Replace with API calls tomorrow.
// Removed REVENUE_DATA, CANCELLATIONS_DATA, and HEALTH_DATA to enforce dynamic API usage.
export const GRADE_STYLES: Record<string, string> = {
    A: 'bg-success-bg text-success border border-border',
    B: 'bg-primary-subtle text-primary border border-border',
    C: 'bg-warning-bg text-warning border border-border',
    D: 'bg-danger-bg text-danger border border-border',
    F: 'bg-danger-bg text-danger border border-border font-bold',
};
export const PAYMENT_HEALTH_STYLES: Record<string, string> = {
    GOOD: 'text-success',
    AT_RISK: 'text-warning',
    OVERDUE: 'text-danger',
};
/** Threshold above which support ticket count is shown in danger color. */
export const TICKET_DANGER_THRESHOLD = 10;
/** Threshold above which support ticket count is shown in warning color. */
export const TICKET_WARNING_THRESHOLD = 5;

// MERGED_FROM: superadmin_analytics_reports/superadmin_analytics_reports_utils/SuperadminAnalyticsReportsConstants.ts
// RESPONSIBILITY: Owns static UI configuration for Superadmin report filters. Server data never belongs here.
export const SUPERADMIN_REPORT_PLAN_OPTIONS = [
  { value: 'ALL', label: 'All Plans' },
  { value: 'ENTERPRISE', label: 'Enterprise' },
  { value: 'PRO', label: 'Pro' },
  { value: 'STARTER', label: 'Starter' },
  { value: 'BASIC', label: 'Basic' },
] as const;

export const SUPERADMIN_ANALYTICS_REPORTS_DATE_PRESET_OPTIONS = [
  { value: 'THIS_MONTH', label: 'This Month' },
  { value: 'LAST_MONTH', label: 'Last Month' },
  { value: 'LAST_3_MONTHS', label: 'Last 3 Months' },
  { value: 'LAST_6_MONTHS', label: 'Last 6 Months' },
  { value: 'THIS_YEAR', label: 'This Year' },
  { value: 'CUSTOM', label: 'Custom Range' },
] as const;

export const SUPERADMIN_REPORT_PAYMENT_HEALTH_CODES = Object.freeze({
  GOOD: 'GOOD',
  AT_RISK: 'AT_RISK',
  OVERDUE: 'OVERDUE',
} as const);

export const SUPERADMIN_REPORT_FILTER_ALL = 'ALL' as const;
