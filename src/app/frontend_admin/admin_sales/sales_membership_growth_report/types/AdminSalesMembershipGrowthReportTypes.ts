// RESPONSIBILITY: Defines only the membership report contracts owned by admin_sales/sales_membership_growth_report.
// DATA FLOW: Verified response schema → scoped API → query hook → owning report view.

export type ReportDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'custom';
export type AdminSalesMembershipGrowthReportExportFormat = 'pdf' | 'csv';

export interface MembershipGrowthRow {
gymId: string;
  gymName: string;
  newMembers: number;
  renewals: number;
  exits: number;
  netGrowth: number;
  activeMembers: number;
}

export interface AdminSalesMembershipGrowthReportQueryParams { from: string; to: string; branchId?: string; }
export interface AdminSalesMembershipGrowthReportExportParams extends AdminSalesMembershipGrowthReportQueryParams { type: 'membership'; format: AdminSalesMembershipGrowthReportExportFormat; }

export interface MembershipReportData {
  membershipGrowth: MembershipGrowthRow[];
}
