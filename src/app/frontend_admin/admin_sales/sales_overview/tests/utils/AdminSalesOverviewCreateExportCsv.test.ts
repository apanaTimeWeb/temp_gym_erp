import { describe, it, expect } from 'vitest';
import { AdminSalesOverviewCreateExportCsv, adminSalesOverviewCsvCell } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewCreateExportCsv';

describe('Sales Overview CSV encoding', () => {
  it('quotes commas, quotation marks, and embedded newlines without altering column order', () => {
    expect(AdminSalesOverviewCreateExportCsv('Date,Revenue,New Members', [{date:'a,"b"\nc',revenue:150.5,newMembers:2}])).toBe('Date,Revenue,New Members\n"a,""b""\nc","150.5","2"');
  });
  it('neutralizes dangerous formula and control-prefix cells', () => {
    for(const input of ['=1+1','+SUM(1,2)','-1+1','@cmd','\t=cmd','\n+cmd','\uFEFF@cmd']) {
      expect(adminSalesOverviewCsvCell(input)).toBe(`"'${input.replaceAll('"','""')}"`);
    }
  });
  it('preserves normal values, decimal precision and deterministic empty exports', () => {
    expect(adminSalesOverviewCsvCell('2026-11-01')).toBe('"2026-11-01"');
    expect(adminSalesOverviewCsvCell(100.25)).toBe('"100.25"');
    expect(adminSalesOverviewCsvCell(-12.5)).toBe('"-12.5"');
    expect(adminSalesOverviewCsvCell('-12.5')).toBe('"\'-12.5"');
    expect(AdminSalesOverviewCreateExportCsv('Date,Revenue,New Members',[])).toBe('Date,Revenue,New Members');
  });
});
