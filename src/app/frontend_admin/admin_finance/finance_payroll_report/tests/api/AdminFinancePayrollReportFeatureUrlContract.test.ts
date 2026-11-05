import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_PAYROLL_REPORT_ROUTES, ADMIN_FINANCE_PAYROLL_REPORT_API } from '@/app/frontend_admin/admin_finance/finance_payroll_report/config/finance_payroll_report.url_config';

describe('finance_payroll_report route and API ownership contract', () => {
  it('declares the canonical route under its owning business domain', () => {
    expect(ADMIN_FINANCE_PAYROLL_REPORT_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_payroll_report');
  });
  it('exposes only its own report read endpoint and shared blocked export route', () => {
    expect(ADMIN_FINANCE_PAYROLL_REPORT_API.payroll).toBe('/admin/reports/payroll');
    expect(ADMIN_FINANCE_PAYROLL_REPORT_API.export).toBe('/admin/reports/export');
    expect(Object.keys(ADMIN_FINANCE_PAYROLL_REPORT_API).filter((key) => ['revenue','attendance','members','payroll','pnl'].includes(key))).toEqual(['payroll']);
  });
});
