import { MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL, MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_filter.constants';
import type { ManagerSalesOverviewMembershipFilter, ManagerSalesOverviewMembershipFilterId } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_membership_filter.types';

/** Resolves a shareable filter ID to the existing display-label value used by the membership table. */
export function resolveManagerSalesOverviewMembershipFilter(value: string | null): ManagerSalesOverviewMembershipFilter {
  const entry = Object.entries(MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL).find(([, id]) => id === value);
  return (entry?.[0] as ManagerSalesOverviewMembershipFilter | undefined) ?? MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ALL;
}

export function getManagerSalesOverviewMembershipFilterId(value: ManagerSalesOverviewMembershipFilter): ManagerSalesOverviewMembershipFilterId {
  return MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL[value];
}
