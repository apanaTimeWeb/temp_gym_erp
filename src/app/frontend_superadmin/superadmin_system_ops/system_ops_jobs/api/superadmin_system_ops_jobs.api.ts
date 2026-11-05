import { superadminSystemOpsJobsApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs_api_fetch.api';
import { SUPERADMIN_SYSTEM_OPS_JOBS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/config/superadmin_system_ops_jobs.url_config';
import { SuperadminSystemOpsJobsNullDataSchema, SuperadminSystemOpsJobsRetryAllDataSchema, SuperadminSystemOpsJobsListDataSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_api.schemas';
import { CountResponseSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_count.schemas';
import { BackgroundJobSchema } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs.schemas';

import type { SuperadminSystemOpsJobsCountResponse } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_count.types';
import type { SuperadminSystemOpsJobsBackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsApi owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_api.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/schemas/superadmin_system_ops_jobs_count.schemas, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs_api_fetch.api, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/config/superadmin_system_ops_jobs.url_config, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_count.types, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides typed API access for Superadmin background-job list and mutation operations.


export const jobsApi = {
    fetchJobs: (params?: Record<string, string>) => {
        const query = params ? `?${new URLSearchParams(params).toString()}` : '';
        return apiFetch<SuperadminSystemOpsJobsBackgroundJob[]>(`${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}${query}`, {
            dataSchema: SuperadminSystemOpsJobsListDataSchema,
        });
    },
    retryAllJobs: (idempotencyKey: string) => apiFetch<{ queuedCount: number }>(SUPERADMIN_SYSTEM_OPS_JOBS_API.RETRY_ALL, {
        method: 'POST',
        dataSchema: SuperadminSystemOpsJobsRetryAllDataSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    retryJob: (id: string, idempotencyKey: string) => apiFetch<SuperadminSystemOpsJobsBackgroundJob>(SUPERADMIN_SYSTEM_OPS_JOBS_API.RETRY_JOB(id), {
        method: 'POST',
        dataSchema: BackgroundJobSchema,
        headers: { 'Idempotency-Key': idempotencyKey }
    }),
    cancelJob: (id: string, idempotencyKey: string) => apiFetch<SuperadminSystemOpsJobsBackgroundJob>(SUPERADMIN_SYSTEM_OPS_JOBS_API.CANCEL_JOB(id), {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: BackgroundJobSchema,
    }),
    deleteJob: (id: string, idempotencyKey: string) => apiFetch<null>(SUPERADMIN_SYSTEM_OPS_JOBS_API.JOB_BY_ID(id), {
        method: 'DELETE',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: SuperadminSystemOpsJobsNullDataSchema,
    }),
    clearCompletedJobs: (idempotencyKey: string) => apiFetch<SuperadminSystemOpsJobsCountResponse>(SUPERADMIN_SYSTEM_OPS_JOBS_API.CLEAR_COMPLETED, {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
    bulkRetryJobs: (ids: string[], idempotencyKey: string) => apiFetch<SuperadminSystemOpsJobsCountResponse>(SUPERADMIN_SYSTEM_OPS_JOBS_API.BULK_RETRY, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
    bulkDeleteJobs: (ids: string[], idempotencyKey: string) => apiFetch<SuperadminSystemOpsJobsCountResponse>(SUPERADMIN_SYSTEM_OPS_JOBS_API.BULK_DELETE, {
        method: 'POST',
        body: JSON.stringify({ ids }),
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        dataSchema: CountResponseSchema,
    }),
};
