import type { ManagerToastType } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/ManagerSalesOverviewLocalToastTypes';
import type { ManagerSalesOverviewDateRange } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_date_range.types';
import type { ManagerSalesOverviewMembershipFilter } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_membership_filter.types';
import type { SalesMemberSnapshot } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_member_snapshot.types';

export type { ManagerSalesOverviewDateRange } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_date_range.types';
export type { ManagerSalesOverviewMembershipFilter } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview_membership_filter.types';

export type PendingPaymentMember = Omit<SalesMemberSnapshot, 'plan'> & {
  plan?: string;
  pendingAmount?: number;
  daysOverdue?: number;
};

export interface OverviewDataPoint {
  month: string;
  revenue: number;
  storeRevenue?: number;
  newMembers?: number;
}

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
}

export interface MembershipTotals {
  activeCount?: number;
  revenue?: number;
  totalReceivable?: number;
  totalReceived?: number;
  remaining?: number;
  refunds?: number;
}

export interface SalesInitialData {
  overviewData?: OverviewDataPoint[];
  membershipReport?: MembershipReportItem[];
  membershipTotals?: MembershipTotals;
  pendingPayments?: PendingPaymentMember[];
  pendingTotal?: number;
  allMemberships?: SalesMemberSnapshot[];
  allMembershipsTotal?: number;
}

export interface ManagerSalesOverviewViewModel {
  view: SalesView;
  setView: (view: SalesView) => void;
  membershipFilter: ManagerSalesOverviewMembershipFilter;
  setMembershipFilter: (filter: ManagerSalesOverviewMembershipFilter) => void;
  search: string;
  setSearch: (search: string) => void;
  customStartDate: string;
  setCustomStartDate: (s: string) => void;
  customEndDate: string;
  setCustomEndDate: (s: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  
  overviewData: OverviewDataPoint[];
  membershipReport: MembershipReportItem[];
  membershipReportTotal: number;
  membershipTotals: MembershipTotals;
  pendingPayments: PendingPaymentMember[];
  pendingTotal: number;
  allMemberships: SalesMemberSnapshot[];
  allMembershipsTotal: number;
  
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  loadAll: () => Promise<void>;
  
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (message: string, type: ManagerToastType) => void;
}

export type DateFilter = 'Today' | 'This Week' | 'This Month' | 'This Year' | 'Custom';
export type SalesTab = 'Revenue Overview' | 'Membership Report' | 'Pending Payments' | 'All Memberships';
export type SalesView = 'overview' | 'membership-report' | 'pending-payments' | 'all-memberships';
