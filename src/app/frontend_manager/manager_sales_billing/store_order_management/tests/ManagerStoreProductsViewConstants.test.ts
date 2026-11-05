import { describe, expect, it } from 'vitest';
import { MANAGER_STORE_PRODUCTS_VIEW_IDS } from '@/app/frontend_manager/manager_sales_billing/store_order_management/constants/manager_store_products_view.constants';
import { resolveManagerStoreProductsView } from '@/app/frontend_manager/manager_sales_billing/store_order_management/utils/ManagerStoreProductsResolveView';

describe('Manager Store URL view contract', () => {
  it('exposes unique canonical screen IDs', () => {
    expect(MANAGER_STORE_PRODUCTS_VIEW_IDS).toEqual(['products', 'orders']);
    expect(new Set(MANAGER_STORE_PRODUCTS_VIEW_IDS).size).toBe(MANAGER_STORE_PRODUCTS_VIEW_IDS.length);
  });
  it.each([['products', null, 'products'], ['orders', null, 'orders'], ['unknown', null, 'products'], [null, 'Orders', 'orders'], [null, 'Products', 'products'], [null, null, 'products']] as const)('resolves view=%s legacyTab=%s', (view, legacyTab, expected) => {
    expect(resolveManagerStoreProductsView(view, legacyTab)).toBe(expected);
  });
});
