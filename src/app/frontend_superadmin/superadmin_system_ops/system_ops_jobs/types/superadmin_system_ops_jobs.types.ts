import type { SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS, SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs_filter_options.constants';
import type { BackgroundJobSchema, JobsMetricsSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs.schemas';

import type { infer as ZodInfer } from 'zod';


// RESPONSIBILITY: Encapsulates functionality for superadmin_jobs_types.ts
export type SuperadminSystemOpsJobsBackgroundJob = ZodInfer<typeof BackgroundJobSchema>;
export type SuperadminSystemOpsJobsMetrics = ZodInfer<typeof JobsMetricsSchema>;


export type SuperadminSystemOpsJobsStatusFilter = typeof SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS[number]['value'];

export type SuperadminSystemOpsJobsQueueFilter = typeof SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS[number]['value'];
