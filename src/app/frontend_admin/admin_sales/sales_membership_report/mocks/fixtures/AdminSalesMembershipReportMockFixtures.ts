// RESPONSIBILITY: Schema-shaped mock data for the Sales membership-report endpoint only.
import type { MembershipReportItem, MembershipTotals } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';

export const MOCK_ADMIN_MEMBERSHIP_REPORT: MembershipReportItem[] = [
  { id: 1, name: 'Andheri East', totalMembers: 4500, activeMembers: 3800, revenue: 1200000, receivable: 150000, received: 1050000, remaining: 150000, refund: 9000 },
  { id: 2, name: 'Bandra West', totalMembers: 3200, activeMembers: 2800, revenue: 850000, receivable: 100000, received: 750000, remaining: 100000, refund: 6000 },
];

export const MOCK_ADMIN_MEMBERSHIP_TOTALS: MembershipTotals = {
  activeCount: 6600,
  revenue: 2050000,
  totalReceivable: 250000,
  totalReceived: 1800000,
  remaining: 250000,
  refunds: 15000,
};
