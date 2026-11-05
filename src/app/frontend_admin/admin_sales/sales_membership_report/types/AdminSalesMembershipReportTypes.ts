// RESPONSIBILITY: Types returned and rendered by the Sales membership-report workflow only.
import type { QueryStatus } from '@tanstack/react-query';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_membership_report/constants/AdminSalesMembershipReportConstants';

export type DateFilter = (typeof DATE_FILTERS)[number];

export interface MembershipReportItem {
  id?: number;
  name?: string;
  totalMembers?: number;
  activeMembers?: number;
  revenue?: number;
  plan?: string;
  receivable?: number;
  received?: number;
  remaining?: number;
  refund?: number;
  referralSource?: string;
  couponCode?: string;
  renewalCount?: number;
}

export interface MembershipTotals {
  activeCount?: number;
  revenue?: number;
  totalReceivable?: number;
  totalReceived?: number;
  remaining?: number;
  refunds?: number;
}

export interface AdminSalesMembershipReportState {
  isCustomRangeBlocked: boolean;
  startDate: string;
  endDate: string;
  search: string;
  setSearch: (search: string) => void;
  membershipReport: MembershipReportItem[];
  membershipTotals: MembershipTotals;
  membershipReportStatus: QueryStatus;
  membershipReportError: string;
  retryMembershipReport: () => Promise<unknown>;
}
