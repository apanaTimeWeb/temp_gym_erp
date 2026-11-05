// RESPONSIBILITY: Owns only the membership report's source-backed mock response and deterministic branch filtering.
import type { ReportDateRange, MembershipReportData } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/types/AdminSalesMembershipGrowthReportTypes';

export const MOCK_ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT: MembershipReportData = {
  membershipGrowth: [
    { gymId: 'g1', gymName: 'Downtown Main', newMembers: 120, renewals: 450, exits: 45, netGrowth: 75, activeMembers: 4500 },
    { gymId: 'g2', gymName: 'Westside Gym', newMembers: 80, renewals: 320, exits: 30, netGrowth: 50, activeMembers: 3200 },
    { gymId: 'g3', gymName: 'Northside Arena', newMembers: 55, renewals: 180, exits: 25, netGrowth: 30, activeMembers: 1800 },
  ],
};

/** Keeps mock responses inside the owning business workflow; dateRange is accepted for fixture API stability. */
export function getAdminSalesMembershipGrowthReportFixture({ gymId = 'all', dateRange = 'this_month' }: { gymId?: string; dateRange?: ReportDateRange }): MembershipReportData {
  void dateRange;
  const membershipGrowth = gymId === 'all' ? MOCK_ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT.membershipGrowth : MOCK_ADMIN_SALES_MEMBERSHIP_GROWTH_REPORT.membershipGrowth.filter((row) => row.gymId === gymId);
  return { membershipGrowth };
}
