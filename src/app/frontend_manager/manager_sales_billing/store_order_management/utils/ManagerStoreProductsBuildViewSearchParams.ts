import {
  MANAGER_STORE_PRODUCTS_LEGACY_TAB_QUERY_PARAM,
  MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM,
} from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products_view.constants';
import type { ManagerStoreProductsViewId } from '@/app/frontend_manager/manager_sales_billing/store_order_management/types/manager_store_products_view.types';

/** Updates only the screen selector while retaining unrelated query state and removing the legacy alias. */
export function ManagerStoreProductsBuildViewSearchParams(currentSearch: string, nextView: ManagerStoreProductsViewId): string {
  const params = new URLSearchParams(currentSearch);
  params.set(MANAGER_STORE_PRODUCTS_VIEW_QUERY_PARAM, nextView);
  params.delete(MANAGER_STORE_PRODUCTS_LEGACY_TAB_QUERY_PARAM);
  return params.toString();
}
