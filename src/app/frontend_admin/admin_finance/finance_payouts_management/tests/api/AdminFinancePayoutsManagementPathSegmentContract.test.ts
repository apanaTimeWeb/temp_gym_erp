import { describe, expect, it } from 'vitest';
import { ADMIN_PAYOUTS_DETAIL_URL } from '@/app/frontend_admin/admin_finance/finance_payouts_management/config/admin_finance_payouts_management.url_config';

describe('AdminFinancePayoutsManagement URL path segment boundary', () => {
  it('preserves the existing endpoint for an ordinary identifier', () => {
    expect(ADMIN_PAYOUTS_DETAIL_URL('valid-1')).toBe("/admin/payouts/valid-1");
  });
  it('encodes separators, query and fragment delimiters in identifiers', () => {
    expect(ADMIN_PAYOUTS_DETAIL_URL('a/b?x#y')).toBe("/admin/payouts/a%2Fb%3Fx%23y");
  });
  it.each(['', ' ', '.', '..'])('rejects empty or reserved identifier %s', (id) => {
    expect(() => ADMIN_PAYOUTS_DETAIL_URL(id)).toThrow(TypeError);
  });
});
