// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsJobsTable.tsx; no business behavior.
import type { SuperadminSystemOpsJobsBackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';

export interface SuperadminSystemOpsJobsTableProps {
    jobs: SuperadminSystemOpsJobsBackgroundJob[];
    allJobsFiltered: boolean;
    selectedJobIds: Set<string>;
    toggleSelection: (id: string) => void;
    toggleAll: (ids: string[]) => void;
    onInspect: (job: SuperadminSystemOpsJobsBackgroundJob) => void;
    onRetry: (id: string) => void;
    onCancel: (id: string) => void;
    onDelete: (id: string) => void;
}
