import { describe, expect, it } from 'vitest';

import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/api/manager_sales_billing_store_products_catalog.query_keys';

describe('manager_store_products_catalog query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerStoreProductsQueryKeys.all).toEqual(['manager_store_products_catalog']);
  });
});
