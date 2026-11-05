// RESPONSIBILITY: Defines feature-local TypeScript contracts for hr_performance_analytics; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsPeriodSelectorPropsTypes.ts)

import type { PerformancePeriod } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';
export interface AdminHrPerformancePeriodSelectorProps {
  period: PerformancePeriod;
  onPeriodChange: (p: PerformancePeriod) => void;
}
