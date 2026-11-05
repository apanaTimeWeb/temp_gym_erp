import {
  MANAGER_STORE_PRODUCTS_ORDERS_VIEW,
  MANAGER_STORE_PRODUCTS_PRODUCTS_VIEW,
  MANAGER_STORE_PRODUCTS_VIEW_IDS,
} from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/constants/manager_store_products_view.constants';
import type { ManagerStoreProductsViewId } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/types/manager_store_products_view.types';

/** Resolves canonical view IDs and legacy Products/Orders tab bookmarks safely. */
export function resolveManagerStoreProductsView(requestedView: string | null, legacyTab: string | null = null): ManagerStoreProductsViewId {
  if (requestedView && (MANAGER_STORE_PRODUCTS_VIEW_IDS as readonly string[]).includes(requestedView)) return requestedView as ManagerStoreProductsViewId;
  const legacy = legacyTab ?? requestedView;
  if (legacy === 'Orders' || legacy === MANAGER_STORE_PRODUCTS_ORDERS_VIEW) return MANAGER_STORE_PRODUCTS_ORDERS_VIEW;
  if (legacy === 'Products' || legacy === MANAGER_STORE_PRODUCTS_PRODUCTS_VIEW) return MANAGER_STORE_PRODUCTS_PRODUCTS_VIEW;
  return MANAGER_STORE_PRODUCTS_PRODUCTS_VIEW;
}
