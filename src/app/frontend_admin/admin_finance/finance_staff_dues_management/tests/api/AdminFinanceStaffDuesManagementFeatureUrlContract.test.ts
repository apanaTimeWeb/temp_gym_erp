import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_STAFF_DUES_ROUTES, ADMIN_FINANCE_STAFF_DUES_API } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/config/admin_finance_staff_dues_management.url_config';

describe('finance_staff_dues_management route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_FINANCE_STAFF_DUES_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_staff_dues_management'));
  it('declares the source-verified API URLs', () => {
    expect(ADMIN_FINANCE_STAFF_DUES_API.staffBase).toBe('/admin/hr/staff');
    expect(ADMIN_FINANCE_STAFF_DUES_API.summary).toBe('/admin/hr/summary');
    expect(ADMIN_FINANCE_STAFF_DUES_API.duesPay).toBe('/admin/hr/dues/pay');
  });
});
