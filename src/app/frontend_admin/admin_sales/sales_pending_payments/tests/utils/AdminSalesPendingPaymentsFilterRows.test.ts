import { describe, expect, it } from 'vitest';
import type { PendingPaymentMember } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsTypes';
import { filterAdminSalesPendingPaymentsRows } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsFilterRows';

const rows: PendingPaymentMember[] = [
  { id: 'm1', name: 'Asha Khan', email: 'asha@example.test', phone: '111', gender: 'FEMALE', branch: 'North', planId: 'p1', plan: 'Growth', billingCycle: 'monthly', status: 'PENDING', joinDate: '2026-01-01', expiryDate: '2027-01-01', paidAmount: 200, pendingAmount: 500, createdAt: '2026-01-01', daysOverdue: 2 },
  { id: 'm2', name: 'Ravi Patel', email: 'ravi@example.test', phone: '222', gender: 'MALE', branch: 'South', planId: 'p2', plan: 'Starter', billingCycle: 'monthly', status: 'PENDING', joinDate: '2026-02-01', expiryDate: '2027-02-01', paidAmount: 0, pendingAmount: 700, createdAt: '2026-02-01', daysOverdue: 5 },
];
describe('filterAdminSalesPendingPaymentsRows', () => {
  it('filters pending payments by customer, plan, or branch', () => { expect(filterAdminSalesPendingPaymentsRows(rows, 'starter')[0]?.id).toBe('m2'); });
  it('returns every row for a blank query', () => expect(filterAdminSalesPendingPaymentsRows(rows, '')).toEqual(rows));
});
