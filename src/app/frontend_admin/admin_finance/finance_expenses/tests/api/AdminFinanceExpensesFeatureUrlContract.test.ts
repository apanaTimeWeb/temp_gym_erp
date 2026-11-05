import { describe, expect, it } from 'vitest';
import { ADMIN_FINANCE_ROUTES, ADMIN_FINANCE_API } from '@/app/frontend_admin/admin_finance/finance_expenses/config/admin_finance_expenses.url_config';

describe('finance_expenses route and API contract', () => {
  it('declares its canonical internal route', () => expect(ADMIN_FINANCE_ROUTES.root).toBe('/frontend_admin/admin_finance/finance_expenses'));
  it('encodes member ID as a single API path segment', () => {
    expect(ADMIN_FINANCE_API.paymentsByMember('m/1?x#y')).toBe('/admin/finance/payments/member/m%2F1%3Fx%23y');
    expect(ADMIN_FINANCE_API.paymentsByMember('50%')).toBe('/admin/finance/payments/member/50%25');
    expect(ADMIN_FINANCE_API.paymentsByMember('member-1')).toBe('/admin/finance/payments/member/member-1');
  });
  it('rejects reserved dot-only ID path segments before browser normalization', () => {
    expect(() => ADMIN_FINANCE_API.paymentsByMember('.')).toThrow('Invalid path identifier');
    expect(() => ADMIN_FINANCE_API.paymentsByMember('..')).toThrow('Invalid path identifier');
  });
});
