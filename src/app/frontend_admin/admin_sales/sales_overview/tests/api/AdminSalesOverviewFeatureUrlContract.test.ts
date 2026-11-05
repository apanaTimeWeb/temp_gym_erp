import { ADMIN_SALES_SUMMARY_URL } from '@/app/frontend_admin/admin_sales/sales_overview/config/admin_sales_overview.url_config';
import { describe, expect, it } from 'vitest';
import { ADMIN_SALES_ROUTES, ADMIN_SALES_API } from '@/app/frontend_admin/admin_sales/sales_overview/config/admin_sales_overview.url_config';

describe('sales_overview route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_SALES_ROUTES.root).toBe('/frontend_admin/admin_sales/sales_overview'));
  it('exposes only the backend endpoint(s) owned by this leaf', () => {

    expect(ADMIN_SALES_SUMMARY_URL).toBe('/admin/sales/summary');
    expect(ADMIN_SALES_API.overview).toBe('/admin/sales/overview');
    expect(ADMIN_SALES_API.referralSources).toBe('/admin/sales/referral-sources');
    expect(Object.keys(ADMIN_SALES_API).sort()).toEqual(['overview', 'referralSources'].sort());
  });
});
