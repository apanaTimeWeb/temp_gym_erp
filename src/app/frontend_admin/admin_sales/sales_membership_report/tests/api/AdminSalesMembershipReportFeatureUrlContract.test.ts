import { describe, expect, it } from 'vitest';
import { ADMIN_SALES_ROUTES, ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_membership_report/config/admin_sales_membership_report.url_config';

describe('sales_membership_report route and API contract', () => {
  it('declares its canonical internal route', () => {
    expect(ADMIN_SALES_ROUTES.root).toBe('/frontend_admin/admin_sales/sales_membership_report');
  });
  it('declares only the verified membership-report endpoint for this leaf', () => {
    expect(ADMIN_SALES_API.membershipReport).toBe('/admin/sales/membership-report');
    expect(Object.keys(ADMIN_SALES_API)).toEqual(['membershipReport']);
  });
});
