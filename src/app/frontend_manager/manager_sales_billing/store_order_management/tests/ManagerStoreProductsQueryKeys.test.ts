import { describe, expect, it } from 'vitest';

import { ManagerStoreProductsQueryKeys } from '@/app/frontend_manager/manager_sales_billing/store_order_management/api/manager_sales_billing_store_order_management.query_keys';

describe('manager_store query-key namespace', () => {
  it('uses a stable, feature-specific root for every cache entry', () => {
    expect(ManagerStoreProductsQueryKeys.all).toEqual(['manager_store']);
  });
});
