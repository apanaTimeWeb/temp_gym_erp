import type { SuperadminSystemOpsJobsBackgroundJob, SuperadminSystemOpsJobsMetrics, SuperadminSystemOpsJobsStatusFilter, SuperadminSystemOpsJobsQueueFilter } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';
import type { Dispatch, SetStateAction } from 'react';



export interface SuperadminSystemOpsJobsPageReturn {
  isPending: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
  filteredJobs: SuperadminSystemOpsJobsBackgroundJob[];
  paginatedJobs: SuperadminSystemOpsJobsBackgroundJob[];
  currentPage: number;
  totalPages: number;
  total: number;
  setCurrentPage: (page: number) => void;
  statusFilter: SuperadminSystemOpsJobsStatusFilter;
  setStatusFilter: (value: SuperadminSystemOpsJobsStatusFilter) => void;
  queueFilter: SuperadminSystemOpsJobsQueueFilter;
  setQueueFilter: (value: SuperadminSystemOpsJobsQueueFilter) => void;
  selectedJobIds: Set<string>;
  toggleSelection: (id: string) => void;
  toggleAll: (visibleIds: string[]) => void;
  inspectJob: SuperadminSystemOpsJobsBackgroundJob | null;
  setInspectJob: Dispatch<SetStateAction<SuperadminSystemOpsJobsBackgroundJob | null>>;
  isRetrying: boolean;
  handleRetryAll: () => void;
  handleRetryJob: (id: string) => void;
  handleCancelJob: (id: string) => void;
  handleDeleteJob: (id: string) => void;
  handleClearCompleted: () => void;
  handleBulkRetry: () => void;
  handleBulkDelete: () => void;
  metrics: SuperadminSystemOpsJobsMetrics;
}
