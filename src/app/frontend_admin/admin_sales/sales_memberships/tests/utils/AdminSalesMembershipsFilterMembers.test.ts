import { describe, expect, it } from 'vitest';
import type { Member } from '@/app/frontend_admin/admin_sales/sales_memberships/types/AdminSalesMembershipsTypes';
import { filterAdminSalesMembershipsMembers } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsFilterMembers';

const rows: Member[] = [
  { id: 'm1', name: 'Asha Khan', email: 'asha@example.test', phone: '111', gender: 'FEMALE', branch: 'North', planId: 'p1', plan: { id: 'p1', name: 'Growth', tier: 'Gold' }, billingCycle: 'monthly', status: 'ACTIVE', joinDate: '2026-01-01', expiryDate: '2027-01-01', paidAmount: 1200, pendingAmount: 0, createdAt: '2026-01-01' },
  { id: 'm2', name: 'Ravi Patel', email: 'ravi@example.test', phone: '222', gender: 'MALE', branch: 'South', planId: 'p2', plan: { id: 'p2', name: 'Starter', tier: 'Silver' }, billingCycle: 'monthly', status: 'ACTIVE', joinDate: '2026-02-01', expiryDate: '2027-02-01', paidAmount: 500, pendingAmount: 0, createdAt: '2026-02-01' },
];

describe('filterAdminSalesMembershipsMembers', () => {
  it('filters by member name, contact, branch, or plan', () => {
    expect(filterAdminSalesMembershipsMembers(rows, 'asha')).toHaveLength(1);
    expect(filterAdminSalesMembershipsMembers(rows, 'starter')[0]?.id).toBe('m2');
  });
  it('returns the original rows for empty search', () => {
    expect(filterAdminSalesMembershipsMembers(rows, '  ')).toEqual(rows);
  });
});
