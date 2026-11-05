import { superadminSystemOpsJobsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_JOBS_API as SUPERADMIN_SYSTEM_OPS_JOBS_QUEUE_HEALTH_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/config/superadmin_system_ops_jobs.url_config';
import { SuperadminSystemOpsJobsV1DataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_v1.schemas';

import type { SuperadminSystemOpsJobsV1Data } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_v1.types';
import type { ApiResponse } from '@/lib/api';


// RESPONSIBILITY: Provides API access for the Background Job Queue Health feature within Superadmin only.


export async function fetchJobsQueueHealth(): Promise<ApiResponse<SuperadminSystemOpsJobsV1Data>> {
    return apiFetch<SuperadminSystemOpsJobsV1Data>(SUPERADMIN_SYSTEM_OPS_JOBS_QUEUE_HEALTH_URL_CONTRACT.SUPERADMIN_SYSTEM_OPS_JOBS_QUEUE_HEALTH.BACKEND_API.BASE, { dataSchema: SuperadminSystemOpsJobsV1DataSchema });
}
