import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_PAYROLL_ROUTES, ADMIN_FINANCE_PAYROLL_API } from '@/app/frontend_admin/admin_finance/finance_payroll_management/config/admin_finance_payroll_management.url_config';

describe('finance_payroll_management route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_FINANCE_PAYROLL_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_payroll_management'));
  it('declares the source-verified API URLs', () => {
    expect(ADMIN_FINANCE_PAYROLL_API.staffBase).toBe('/admin/hr/staff');
    expect(ADMIN_FINANCE_PAYROLL_API.staffUpdate('staff-1')).toBe('/admin/hr/staff/staff-1');
    expect(ADMIN_FINANCE_PAYROLL_API.payrollsBase).toBe('/admin/hr/payrolls');
    expect(ADMIN_FINANCE_PAYROLL_API.payrollUpdate('payroll-1')).toBe('/admin/hr/payrolls/payroll-1');
    expect(ADMIN_FINANCE_PAYROLL_API.summary).toBe('/admin/hr/summary');
  });
  it('does not allow staff or payroll IDs to alter API path or query structure', () => {
    expect(ADMIN_FINANCE_PAYROLL_API.staffUpdate('s/1?x#y')).toBe('/admin/hr/staff/s%2F1%3Fx%23y');
    expect(ADMIN_FINANCE_PAYROLL_API.payrollUpdate('p/1?x#y')).toBe('/admin/hr/payrolls/p%2F1%3Fx%23y');
    expect(ADMIN_FINANCE_PAYROLL_API.staffUpdate('50%')).toBe('/admin/hr/staff/50%25');
    expect(ADMIN_FINANCE_PAYROLL_API.payrollUpdate('payroll-1')).toBe('/admin/hr/payrolls/payroll-1');
  });
  it('rejects reserved dot-only ID path segments before browser normalization', () => {
    expect(() => ADMIN_FINANCE_PAYROLL_API.payrollUpdate('.')).toThrow('Invalid path identifier');
    expect(() => ADMIN_FINANCE_PAYROLL_API.payrollUpdate('..')).toThrow('Invalid path identifier');
  });
});
