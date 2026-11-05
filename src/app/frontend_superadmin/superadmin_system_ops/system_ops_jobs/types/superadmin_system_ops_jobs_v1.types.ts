import type { SuperadminSystemOpsJobsV1ResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_v1_response.schemas';
import type { SuperadminSystemOpsJobsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_v1.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Defines the runtime-validated data contract for Background Job Queue Health.

export type SuperadminSystemOpsJobsV1Data = ZodInfer<typeof SuperadminSystemOpsJobsV1DataSchema>;
export type SuperadminSystemOpsJobsV1Response = ZodInfer<typeof SuperadminSystemOpsJobsV1ResponseSchema>;
export interface SuperadminSystemOpsJobsV1SectionProps {
    data: SuperadminSystemOpsJobsV1Data;
}
