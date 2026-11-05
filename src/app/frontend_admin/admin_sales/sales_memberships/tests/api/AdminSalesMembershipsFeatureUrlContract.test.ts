import { describe, expect, it } from 'vitest';
import { ADMIN_SALES_ROUTES, ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_memberships/config/admin_sales_memberships.url_config';

describe('sales_memberships route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_SALES_ROUTES.root).toBe('/frontend_admin/admin_sales/sales_memberships'));
  it('exposes only the backend endpoint(s) owned by this leaf', () => {
    expect(ADMIN_SALES_API.allMemberships).toBe('/admin/sales/all-memberships');
    expect(Object.keys(ADMIN_SALES_API).sort()).toEqual(['allMemberships'].sort());
  });
});
