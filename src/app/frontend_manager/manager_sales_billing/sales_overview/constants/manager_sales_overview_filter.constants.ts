/**
 * @description Provides the ManagerSalesOverviewFilterConstants implementation for the sales module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_MEMBERS_DIRECTORYHIP_FILTERS = ['All', 'Active', 'Expiring Soon', 'Expired'] as const;

export const MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES = { ALL: 'All', ACTIVE: 'Active', EXPIRING_SOON: 'Expiring Soon', EXPIRED: 'Expired' } as const;

export const MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_IDS = ['all', 'active', 'expiring-soon', 'expired'] as const;
export const MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL = {
  [MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ALL]: 'all',
  [MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ACTIVE]: 'active',
  [MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.EXPIRING_SOON]: 'expiring-soon',
  [MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.EXPIRED]: 'expired',
} as const;
