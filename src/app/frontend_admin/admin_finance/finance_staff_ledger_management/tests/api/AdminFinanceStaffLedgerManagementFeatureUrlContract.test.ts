import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_STAFF_LEDGER_ROUTES, ADMIN_FINANCE_STAFF_LEDGER_API } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/config/admin_finance_staff_ledger_management.url_config';

describe('finance_staff_ledger_management route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_FINANCE_STAFF_LEDGER_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_staff_ledger_management'));
  it('declares the source-verified API URLs', () => {
    expect(ADMIN_FINANCE_STAFF_LEDGER_API.staffBase).toBe('/admin/hr/staff');
    expect(ADMIN_FINANCE_STAFF_LEDGER_API.summary).toBe('/admin/hr/summary');
    expect(ADMIN_FINANCE_STAFF_LEDGER_API.ledger('staff/1')).toBe('/admin/hr/staff/staff%2F1/ledger');
  });
});
