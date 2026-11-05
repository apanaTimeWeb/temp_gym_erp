// Guards POS API ownership: checkout can read products and create orders, but cannot mutate the catalogue.
import { describe, expect, it } from 'vitest';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/api/manager_sales_billing_store_point_of_sale.api';

describe('Store POS API ownership', () => {
  it('exposes only product reads and order creation', () => {
    expect(Object.keys(ManagerStoreProductsApi).sort()).toEqual(['createOrder', 'fetchProducts']);
  });
});
