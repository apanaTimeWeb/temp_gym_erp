import { MANAGER_STORE_PRODUCTS_API } from '@/app/frontend_manager/manager_sales_billing/store_order_management/config/manager_sales_billing_store_order_management.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_store API URL contract', () => {
  it('matches the feature API contract for ORDERS_BASE', () => { expect(MANAGER_STORE_PRODUCTS_API.ORDERS_BASE).toBe("/api/v1/manager/store/orders"); });
  it('matches the feature API contract for PRODUCTS_BASE', () => { expect(MANAGER_STORE_PRODUCTS_API.PRODUCTS_BASE).toBe("/api/v1/manager/store/products"); });
  it('matches the feature API contract for PRODUCT_DELETE', () => { expect(MANAGER_STORE_PRODUCTS_API.PRODUCT_DELETE('sample-id')).toBe("/api/v1/manager/store/products/sample-id"); });
  it('matches the feature API contract for PRODUCT_UPDATE', () => { expect(MANAGER_STORE_PRODUCTS_API.PRODUCT_UPDATE('sample-id')).toBe("/api/v1/manager/store/products/sample-id"); });
  it('matches the feature API contract for SUMMARY', () => { expect(MANAGER_STORE_PRODUCTS_API.SUMMARY).toBe("/api/v1/manager/store/summary"); });
});
