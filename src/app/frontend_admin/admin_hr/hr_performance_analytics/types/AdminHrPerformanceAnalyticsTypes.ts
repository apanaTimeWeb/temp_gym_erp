// RESPONSIBILITY: Types for Staff Performance Dashboard.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes.ts)

export type PerformancePeriod = 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER';
export type PerformanceSortKey = 'name' | 'role' | 'sessionsTaken' | 'membersAdded' | 'attendancePct' | 'rating';
import type { AdminHrSortDirection } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsSortTypes';
export type PerformanceSortDirection = AdminHrSortDirection;
export type PerformanceStatus = (typeof import('@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants').PERFORMANCE_STATUS_VALUES)[keyof typeof import('@/app/frontend_admin/admin_hr/hr_performance_analytics/constants/AdminHrPerformanceAnalyticsConstants').PERFORMANCE_STATUS_VALUES];

export interface StaffPerformanceRecord {
  id: string;
  name: string;
  role: string;
  branchName: string;
  sessionsTaken: number;
  membersAdded: number;
  attendancePct: number;
  rating: number;
  status: PerformanceStatus;
}

export interface PerformanceAggregates {
  totalSessions: number;
  totalMembersAdded: number;
  avgAttendance: number;
  avgRating: number;
  topPerformersCount: number;
  lowPerformersCount: number;
}
