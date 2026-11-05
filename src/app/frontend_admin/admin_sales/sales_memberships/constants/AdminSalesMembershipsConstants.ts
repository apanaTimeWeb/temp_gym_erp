// RESPONSIBILITY: Status and filter constants for the Sales memberships workflow.
export const ADMIN_SALES_MEMBERSHIP_STATUS = { ACTIVE: 'active', EXPIRED: 'expired' } as const;
export const ADMIN_SALES_MEMBERSHIP_STATUS_LABEL_KEYS: Record<string, string> = { active: 'sales.admin_sales_all_memberships.status_active', expired: 'sales.admin_sales_all_memberships.status_expired' };
export const ADMIN_SALES_MEMBERSHIP_FILTER = { ALL: 'all', ACTIVE: 'active', EXPIRING_SOON: 'expiring_soon', EXPIRED: 'expired' } as const;
export const DATE_FILTERS = ['this_month', 'last_month', 'last_3_months', 'last_6_months', 'this_year', 'monthly', 'yearly', 'custom'] as const;
export const SALES_ITEMS_PER_PAGE = 10;
