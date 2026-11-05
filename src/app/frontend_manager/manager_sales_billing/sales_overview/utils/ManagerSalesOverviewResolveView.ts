// RESPONSIBILITY: Validates Sales view IDs and maps legacy tab labels to canonical views.
import type { SalesTab, SalesView } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';
import { SALES_TAB_TO_VIEW, SALES_VIEW_IDS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_shared.constants';

export function ManagerSalesOverviewResolveView(viewParam: string | null, legacyTabParam: string | null): SalesView {
  if (viewParam && (SALES_VIEW_IDS as readonly string[]).includes(viewParam)) return viewParam as SalesView;
  if (legacyTabParam && Object.prototype.hasOwnProperty.call(SALES_TAB_TO_VIEW, legacyTabParam)) return SALES_TAB_TO_VIEW[legacyTabParam as SalesTab];
  return SALES_VIEW_IDS[0];
}
