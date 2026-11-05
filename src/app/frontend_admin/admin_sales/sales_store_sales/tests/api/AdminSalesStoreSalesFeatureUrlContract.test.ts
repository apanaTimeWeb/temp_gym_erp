import { describe, expect, it } from 'vitest';
import { ADMIN_SALES_ROUTES, ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_store_sales/config/admin_sales_store_sales.url_config';

describe('sales_store_sales route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_SALES_ROUTES.root).toBe('/frontend_admin/admin_sales/sales_store_sales'));
  it('exposes only the backend endpoint(s) owned by this leaf', () => {
    expect(ADMIN_SALES_API.storeOrders).toBe('/admin/sales/store-orders');
    expect(ADMIN_SALES_API.storeSummary).toBe('/admin/sales/store-summary');
    expect(Object.keys(ADMIN_SALES_API).sort()).toEqual(['storeOrders', 'storeSummary'].sort());
  });
});
