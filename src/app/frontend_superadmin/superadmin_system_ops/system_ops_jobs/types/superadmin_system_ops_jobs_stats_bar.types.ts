import type { SuperadminSystemOpsJobsMetrics, SuperadminSystemOpsJobsStatusFilter } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';

export interface SuperadminSystemOpsJobsStatsBarProps {
  metrics: SuperadminSystemOpsJobsMetrics;
  selectedStatus: SuperadminSystemOpsJobsStatusFilter;
  onFilterSelect?: (status: SuperadminSystemOpsJobsStatusFilter) => void;
}
