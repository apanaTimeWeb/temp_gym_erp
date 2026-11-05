// Branch reference mocks must match the report's validated items envelope and gym identifiers.
import { describe, expect, it } from 'vitest';
import { MOCK_REPORTS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/fixtures/AdminSalesMembershipGrowthReportBranchReferenceMockFixtures';
import { MOCK_ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/fixtures/AdminSalesMembershipGrowthReportMockFixtures';
describe('membership growth branch reference',()=>{
  it('exposes exactly the report gym identifiers',()=>{
    expect(MOCK_REPORTS_BRANCH_REFERENCES.map(item=>item.id).sort()).toEqual(MOCK_ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT.membershipGrowth.map(item=>item.gymId).sort());
  });
});
