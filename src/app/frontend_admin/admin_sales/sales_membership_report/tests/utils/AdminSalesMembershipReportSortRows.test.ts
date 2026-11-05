// RESPONSIBILITY: Protects sorting by the report's visible plan label without changing the API payload or original rows.
import { describe, expect, it } from 'vitest';
import { sortAdminSalesMembershipReportRows } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportSortRows';

describe('sortAdminSalesMembershipReportRows', () => {
  const rows = [
    { id: 1, plan: undefined, name: 'Starter', receivable: 300 },
    { id: 2, plan: 'Growth', name: 'Alias', receivable: 100 },
    { id: 3, plan: undefined, name: 'Basic', receivable: 200 },
  ];
  it('sorts the visible plan/name label in both directions, without mutating the API list', () => {
    expect(sortAdminSalesMembershipReportRows(rows, 'plan', 'asc').map(x => x.id)).toEqual([3, 2, 1]);
    expect(sortAdminSalesMembershipReportRows(rows, 'plan', 'desc').map(x => x.id)).toEqual([1, 2, 3]);
    expect(rows.map(x => x.id)).toEqual([1, 2, 3]);
  });
  it('retains numeric monetary sorting without changing the displayed financial masking policy', () => {
    expect(sortAdminSalesMembershipReportRows(rows, 'receivable', 'desc').map(x => x.id)).toEqual([1, 3, 2]);
  });
});
