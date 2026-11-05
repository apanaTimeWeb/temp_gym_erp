import { describe, expect, it } from 'vitest';
import { normalizeAdminSalesMembershipsUrlPage } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsUrlPage';

describe('AdminSalesMemberships URL pagination', () => {
  it('preserves valid page values and bounds huge requests', () => {
    expect(normalizeAdminSalesMembershipsUrlPage('2')).toBe(2);
    expect(normalizeAdminSalesMembershipsUrlPage(3)).toBe(3);
    expect(normalizeAdminSalesMembershipsUrlPage('100001')).toBe(100000);
  });
  it('rejects malformed inbound page strings and outgoing actions', () => {
    for (const raw of [null, '', '0', '-1', '1.5', '2abc', '1e4', 'Infinity', ' 2 ', '9007199254740992']) expect(normalizeAdminSalesMembershipsUrlPage(raw)).toBe(1);
    expect(normalizeAdminSalesMembershipsUrlPage(1.25)).toBe(1);
    expect(normalizeAdminSalesMembershipsUrlPage(Infinity)).toBe(1);
  });
});
