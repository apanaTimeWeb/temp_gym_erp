import { MANAGER_SALES_OVERVIEW_ROUTES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL, MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_filter.constants';

import { MANAGER_SALES_OVERVIEW_FIRST_PAGE } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_date_filter.constants';
import type { ManagerSalesOverviewMembershipFilter } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_membership_filter.types';

export function getManagerSalesOverviewMembershipFilterId(filter: ManagerSalesOverviewMembershipFilter): string {
  return MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL[filter] ?? '';
}

/** Updates the membership filter in the URL while preserving unrelated state and resetting pagination. */
export function ManagerSalesOverviewBuildMembershipFilterSearchParams(currentSearch: string, filter: ManagerSalesOverviewMembershipFilter): string {
  const params = new URLSearchParams(currentSearch);
  const filterId = MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_ID_BY_LABEL[filter];
  if (filter === MANAGER_SALES_OVERVIEW_MEMBERSHIP_FILTER_VALUES.ALL) params.delete(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.MEMBERSHIP_FILTER);
  else params.set(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.MEMBERSHIP_FILTER, filterId);
  params.set(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.PAGE, String(MANAGER_SALES_OVERVIEW_FIRST_PAGE));
  return params.toString();
}
