import { describe, expect, it } from 'vitest';
import { ADMIN_SALES_ROUTES, ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_pending_payments/config/admin_sales_pending_payments.url_config';

describe('sales_pending_payments route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_SALES_ROUTES.root).toBe('/frontend_admin/admin_sales/sales_pending_payments'));
  it('exposes only the backend endpoint(s) owned by this leaf', () => {
    expect(ADMIN_SALES_API.pendingPayments).toBe('/admin/sales/pending-payments');
    expect(Object.keys(ADMIN_SALES_API).sort()).toEqual(['pendingPayments'].sort());
  });
});
