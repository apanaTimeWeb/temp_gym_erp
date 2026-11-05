// RESPONSIBILITY: Centralized constants and status style maps for the Dashboard module.
/**
 * @description Provides the ManagerDashboardOverviewSharedConstants implementation for the dashboard module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const DASHBOARD_STATUS_STYLES: Record<string, { bg: string; text: string }> = {
 ACTIVE: { bg: 'bg-success-bg', text: 'text-success-text' },
 PENDING: { bg: 'bg-warning-bg', text: 'text-warning-text' },
 EXPIRED: { bg: 'bg-danger-bg', text: 'text-danger-text' } };

export const DASHBOARD_PLAN_BG_COLORS: Record<string, string> = {
 BASIC: 'bg-info',
 GOLD: 'bg-warning',
 PREMIUM: 'bg-primary' };

export const DASHBOARD_RECENT_MEMBERS_PAGE_SIZE = 5;
export const RECENT_MEMBERS_HEADERS = ['COPY_MEMBER', 'COPY_PLAN', 'COPY_STATUS', 'COPY_JOINED', 'COPY_AMOUNT'] as const;

