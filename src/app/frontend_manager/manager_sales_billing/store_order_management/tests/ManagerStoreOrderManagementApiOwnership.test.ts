import { describe, expect, it } from 'vitest';
import { ManagerStoreProductsApi } from '@/app/frontend_manager/manager_sales_billing/store_order_management/api/manager_sales_billing_store_order_management.api';

describe('store_order_management API ownership', () => {
  it('exposes only the methods owned by this autonomous leaf', () => {
    expect(Object.keys(ManagerStoreProductsApi).sort()).toEqual(['fetchOrders']);
  });
});
