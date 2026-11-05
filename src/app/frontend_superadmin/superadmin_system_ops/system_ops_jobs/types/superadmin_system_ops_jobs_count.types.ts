import type { CountResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_count.schemas';

import type { infer as ZodInfer } from 'zod';


export type SuperadminSystemOpsJobsCountResponse = ZodInfer<typeof CountResponseSchema>;
