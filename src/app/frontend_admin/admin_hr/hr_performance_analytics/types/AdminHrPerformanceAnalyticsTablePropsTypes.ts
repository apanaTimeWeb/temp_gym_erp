// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_performance_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTablePropsTypes.ts)

import type { StaffPerformanceRecord, PerformanceSortKey, PerformanceSortDirection } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';
export interface AdminHrPerformanceTableProps {
  data: StaffPerformanceRecord[];
  sortKey: PerformanceSortKey;
  sortDir: PerformanceSortDirection;
  onSort: (key: PerformanceSortKey) => void;
}
