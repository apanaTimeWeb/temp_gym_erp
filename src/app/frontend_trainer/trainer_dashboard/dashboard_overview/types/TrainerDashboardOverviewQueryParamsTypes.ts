// RESPONSIBILITY: Dashboard query parameter type for the feature-owned query contract.
import type { TrainerDashboardDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewDateRangeTypes';

export interface TrainerDashboardQueryParams {
  range?: TrainerDashboardDateRange;
  startDate?: string;
  endDate?: string;
}
