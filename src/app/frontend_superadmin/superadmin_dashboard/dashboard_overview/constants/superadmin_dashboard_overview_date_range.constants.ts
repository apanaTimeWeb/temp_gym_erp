/** Feature-owned canonical values for dashboard filters and tenant statuses. */
export const SUPERADMIN_DASHBOARD_TENANT_STATUS_CODES = { ACTIVE: 'ACTIVE', SUSPENDED: 'SUSPENDED', TRIAL: 'TRIAL', CANCELLED: 'CANCELLED' } as const;
export const SUPERADMIN_DASHBOARD_TIME_RANGES = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;
export const SUPERADMIN_DASHBOARD_CUSTOM_DATE_FIELDS = ['start', 'end'] as const;
