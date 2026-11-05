// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsJobsHeader.tsx; no business behavior.

import type { SuperadminSystemOpsJobsStatusFilter, SuperadminSystemOpsJobsQueueFilter } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';

export interface SuperadminSystemOpsJobsHeaderProps {
    selectedCount: number;
    isRetrying: boolean;
    statusFilter: SuperadminSystemOpsJobsStatusFilter;
    setStatusFilter: (v: SuperadminSystemOpsJobsStatusFilter) => void;
    queueFilter: SuperadminSystemOpsJobsQueueFilter;
    setQueueFilter: (v: SuperadminSystemOpsJobsQueueFilter) => void;
    onClearCompleted: () => void;
    onRetryAll: () => void;
    onBulkRetry: () => void;
    onBulkDelete: () => void;
    onFilterChange: () => void;
}
