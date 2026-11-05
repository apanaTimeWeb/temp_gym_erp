import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_STAFF_LEDGER_API } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/config/admin_finance_staff_ledger_management.url_config';

describe('AdminFinanceStaffLedgerManagement URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_FINANCE_STAFF_LEDGER_API.ledger('valid-1')).toBe("/admin/hr/staff/valid-1/ledger");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_FINANCE_STAFF_LEDGER_API.ledger('a/b?x#y')).toBe("/admin/hr/staff/a%2Fb%3Fx%23y/ledger");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_FINANCE_STAFF_LEDGER_API.ledger(id)).toThrow(TypeError);
  });
});
