import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_REVENUE_REPORT_ROUTES, ADMIN_FINANCE_REVENUE_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_revenue_report/config/finance_revenue_report.url_config';

describe('finance_revenue_report route and API ownership contract', () => {
  it('declares the canonical route under its owning business domain', () => {
    expect(ADMIN_FINANCE_REVENUE_REPORT_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_revenue_report');
  });
  it('exposes only its own report read endpoint and shared blocked export route', () => {
    expect(ADMIN_FINANCE_REVENUE_REPORT_API.revenue).toBe('/admin/reports/revenue');
    expect(ADMIN_FINANCE_REVENUE_REPORT_API.export).toBe('/admin/reports/export');
    expect(Object.keys(ADMIN_FINANCE_REVENUE_REPORT_API).filter((key) => ['revenue','attendance','members','payroll','pnl'].includes(key))).toEqual(['revenue']);
  });
});
