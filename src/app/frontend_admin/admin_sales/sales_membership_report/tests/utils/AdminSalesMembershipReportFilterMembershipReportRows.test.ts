// RESPONSIBILITY: Defines regression tests for AdminSalesAnalyticsFilterMembershipReportRows.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_sales/sales_membership_report/tests/utils/AdminSalesAnalyticsFilterMembershipReportRows.test.ts)

import { describe, expect, it } from 'vitest';
import { filterAdminSalesMembershipReportRows } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportFilterMembershipReportRows';

describe('filterAdminSalesMembershipReportRows', () => {
  const rows = [
    { id: 1, plan: 'Growth', receivable: 1000, received: 800, remaining: 200, refund: 0 },
    { id: 2, plan: 'Starter', receivable: 500, received: 400, remaining: 100, refund: 0 },
  ];

  it('returns matching plan rows only', () => {
    expect(filterAdminSalesMembershipReportRows(rows, 'growth')).toHaveLength(1);
    expect(filterAdminSalesMembershipReportRows(rows, 'growth')[0]?.plan).toBe('Growth');
  });

  it('returns all rows for blank search', () => {
    expect(filterAdminSalesMembershipReportRows(rows, '   ')).toHaveLength(2);
  });
});
