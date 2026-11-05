import { describe, expect, it } from 'vitest';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/api/manager_sales_billing_store_point_of_sale.api';

describe('store_point_of_sale API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerStoreProductsApi).sort()).toEqual(['createOrder', 'fetchProducts']);
  });
});
