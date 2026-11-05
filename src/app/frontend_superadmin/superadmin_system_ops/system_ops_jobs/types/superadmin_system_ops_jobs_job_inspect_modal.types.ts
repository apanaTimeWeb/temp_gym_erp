// RESPONSIBILITY: Type contract extracted from SuperadminSystemOpsJobsJobInspectModal.tsx; no business behavior.
import type { SuperadminSystemOpsJobsBackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';

export interface SuperadminSystemOpsJobsJobInspectModalProps {
    job: SuperadminSystemOpsJobsBackgroundJob;
    onClose: () => void;
}
