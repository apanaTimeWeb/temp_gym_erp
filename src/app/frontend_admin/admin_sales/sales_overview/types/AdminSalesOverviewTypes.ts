// RESPONSIBILITY: Types rendered and queried by the Sales Overview leaf only.
import type { QueryStatus } from '@tanstack/react-query';
import { DATE_FILTERS } from '@/app/frontend_admin/admin_sales/sales_overview/constants/AdminSalesOverviewConstants';
export type DateFilter = (typeof DATE_FILTERS)[number];
export interface OverviewDataPoint { date: string; revenue: number; newMembers: number; }
export interface ReferralDataPoint { source: string; revenue: number; }
export interface AdminSalesOverviewState {
  isCustomRangeBlocked: boolean; startDate: string; endDate: string; search: string; setSearch: (value: string) => void;
  overviewData: OverviewDataPoint[]; overviewStatus: QueryStatus; overviewError: string; retryOverview: () => Promise<unknown>;
  referralData: ReferralDataPoint[]; referralStatus: QueryStatus; referralError: string; retryReferrals: () => Promise<unknown>;
}
