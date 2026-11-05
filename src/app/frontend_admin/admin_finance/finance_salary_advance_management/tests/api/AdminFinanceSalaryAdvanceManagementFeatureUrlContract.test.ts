import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_SALARY_ADVANCE_ROUTES, ADMIN_FINANCE_SALARY_ADVANCE_API } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/config/admin_finance_salary_advance_management.url_config';

describe('finance_salary_advance_management route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_FINANCE_SALARY_ADVANCE_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_salary_advance_management'));
  it('declares the source-verified API URLs', () => {
    expect(ADMIN_FINANCE_SALARY_ADVANCE_API.staffBase).toBe('/admin/hr/staff');
    expect(ADMIN_FINANCE_SALARY_ADVANCE_API.summary).toBe('/admin/hr/summary');
    expect(ADMIN_FINANCE_SALARY_ADVANCE_API.advances).toBe('/admin/hr/advances');
  });
});
