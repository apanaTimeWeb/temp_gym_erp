import { describe, expect, it } from 'vitest';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/api/manager_sales_billing_store_products_catalog.api';

describe('store_products_catalog API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerStoreProductsApi).sort()).toEqual(['createProduct', 'deleteProduct', 'fetchProducts', 'fetchStoreSummary', 'updateProduct']);
  });
});
