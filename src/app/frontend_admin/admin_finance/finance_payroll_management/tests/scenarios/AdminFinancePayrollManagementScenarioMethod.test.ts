import { describe, expect, it } from 'vitest';
import { createAdminFinancePayrollManagementScenarioHandler } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/scenarios/admin_finance_payroll_management.scenarios';
describe('Payroll mock scenario contract', () => {
  it('intercepts only GET so mutation handlers are not shadowed', () => {
    const handler = createAdminFinancePayrollManagementScenarioHandler('SERVER_500', '/admin/payroll/test');
    expect(handler.info.method).toBe('GET');
  });
  it('requires a caller-verified EMPTY payload', () => {
    expect(() => createAdminFinancePayrollManagementScenarioHandler('EMPTY', '/admin/payroll/test')).toThrow();
  });
});
