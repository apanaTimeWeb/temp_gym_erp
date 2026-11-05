import type { DateFilter, SalesTab, SalesView } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';
// RESPONSIBILITY: Provides the implementation for manager_sales_overview_shared.constants.ts functionality within its module.
/**
 * @description Provides the ManagerSalesOverviewSharedConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const DATE_FILTERS = ['Today', 'This Week', 'This Month', 'This Year', 'Custom'] as const satisfies readonly DateFilter[];

export const SALES_TABS = ['Revenue Overview', 'Membership Report', 'Pending Payments', 'All Memberships'] as const satisfies readonly SalesTab[];

/** Canonical, locale-independent screen identifiers used by the Manager Sales URL contract. */
export const SALES_VIEW_IDS = ['overview', 'membership-report', 'pending-payments', 'all-memberships'] as const satisfies readonly SalesView[];

export const SALES_VIEW_TO_TAB: Record<SalesView, SalesTab> = {
  overview: 'Revenue Overview',
  'membership-report': 'Membership Report',
  'pending-payments': 'Pending Payments',
  'all-memberships': 'All Memberships',
};

export const SALES_TAB_TO_VIEW: Record<SalesTab, SalesView> = {
  'Revenue Overview': 'overview',
  'Membership Report': 'membership-report',
  'Pending Payments': 'pending-payments',
  'All Memberships': 'all-memberships',
};




export const SALES_ACTIVE_STATUS = 'ACTIVE' as const;
