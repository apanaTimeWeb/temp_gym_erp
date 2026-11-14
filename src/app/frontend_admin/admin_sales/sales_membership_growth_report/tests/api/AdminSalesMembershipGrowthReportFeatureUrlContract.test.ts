import { describe, expect, it } from 'vitest';
import { ADMIN_DASHBOARD_URL, ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_ROUTES, ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/config/sales_membership_growth_report.url_config';

describe('sales_membership_growth_report route and API ownership contract', () => {
  it('keeps the dashboard fallback within its own canonical URL contract', () => {
    expect(ADMIN_DASHBOARD_URL).toBe('/frontend_admin/admin_dashboard/dashboard_overview');
  });
  it('declares the canonical route under its owning business domain', () => {
    expect(ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_ROUTES.root).toBe('/frontend_admin/admin_sales/sales_membership_growth_report');
  });
  it('exposes only its own report read endpoint and shared blocked export route', () => {
    expect(ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API.membership).toBe('/admin/reports/members');
    expect(ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API.export).toBe('/admin/reports/export');
    expect(Object.keys(ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT_API).filter((key) => ['revenue','attendance','membership','payroll','pnl'].includes(key))).toEqual(['membership']);
  });
});
