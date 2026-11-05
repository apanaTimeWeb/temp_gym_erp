import { StatusCodes } from 'http-status-codes';
import { http, HttpResponse, delay } from 'msw';

import { SUPERADMIN_SYSTEM_OPS_JOBS_API } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/config/superadmin_system_ops_jobs.url_config';
import { SUPERADMIN_JOBS_STATUS_CODES, SUPERADMIN_JOBS_FILTER_STATUS_CODES, SUPERADMIN_JOBS_FILTER_QUEUE_CODES, SUPERADMIN_JOBS_PAGE_SIZE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';
import { MOCK_BACKGROUND_JOBS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockData';


/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsJobsMockHandlers owned by the superadmin_system_ops_jobs feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: http-status-codes, msw, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockData, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants, @/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/config/superadmin_system_ops_jobs.url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns module-specific MSW handlers for Superadmin background-job list and mutation scenarios.


const BASE_URL = `*${SUPERADMIN_SYSTEM_OPS_JOBS_API.BASE}`;
let mockJobs = [...MOCK_BACKGROUND_JOBS];

export function resetSuperadminSystemOpsJobsMockState(): void {
  mockJobs = [...MOCK_BACKGROUND_JOBS];
}

const getPagedResponse = (jobs: typeof mockJobs, request: Request) => {
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1);
    const limit = Math.max(1, Number(url.searchParams.get('limit')) || SUPERADMIN_JOBS_PAGE_SIZE);
    const status = url.searchParams.get('status');
    const queue = url.searchParams.get('queue');
    let filtered = [...jobs];
    if (status && status !== SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL) filtered = filtered.filter((job) => job.status === status);
    if (queue && queue !== SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL) filtered = filtered.filter((job) => job.queueName === queue);
    const total = filtered.length;
    const data = filtered.slice((page - 1) * limit, page * limit);
    return { data, meta: { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page < (Math.ceil(total / limit)), hasPrevPage: page > 1} };
};

function jsonSuccess<T>(message: string, data: T) {
  return HttpResponse.json({ success: true, message, data, requestId: crypto.randomUUID()});
}

export const superadminJobsHandlers = [
    http.get(BASE_URL, async ({ request }) => {
        await delay(250);
        const result = getPagedResponse(mockJobs, request);
        return HttpResponse.json({ success: true, message: 'Jobs loaded.', data: result.data, meta: result.meta, requestId: crypto.randomUUID()});
    }),
    http.post(`${BASE_URL}/retry-all`, async () => {
        await delay(300);
        const failedBefore = mockJobs.filter((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.FAILED).length;
        mockJobs = mockJobs.map((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.FAILED ? { ...job, status: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, attempts: job.attempts + 1 } : job);
        return jsonSuccess(`Queued ${failedBefore} failed jobs for retry.`, { queuedCount: failedBefore });
    }),
    http.post(`${BASE_URL}/:id/retry`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const index = mockJobs.findIndex((job) => job.id === id);
        if (index < 0) return HttpResponse.json({ success: false, message: 'Job not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const job = mockJobs[index]!;
        mockJobs[index] = { ...job, status: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, attempts: job.attempts + 1 };
        return jsonSuccess('Job queued for retry.', mockJobs[index]);
    }),
    http.post(`${BASE_URL}/:id/cancel`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const index = mockJobs.findIndex((job) => job.id === id);
        if (index < 0) return HttpResponse.json({ success: false, message: 'Job not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        const job = mockJobs[index]!;
        mockJobs[index] = { ...job, status: SUPERADMIN_JOBS_STATUS_CODES.CANCELLED };
        return jsonSuccess('Job cancelled.', mockJobs[index]);
    }),
    http.delete(`${BASE_URL}/:id`, async ({ params }) => {
        await delay(250);
        const id = String(params.id);
        const exists = mockJobs.some((job) => job.id === id);
        if (!exists) return HttpResponse.json({ success: false, message: 'Job not found.', data: null, errorCode: 'NOT_FOUND', statusCode: StatusCodes.NOT_FOUND, requestId: crypto.randomUUID()}, { status: StatusCodes.NOT_FOUND });
        mockJobs = mockJobs.filter((job) => job.id !== id);
        return jsonSuccess('Job deleted.', null);
    }),
    http.post(`${BASE_URL}/clear-completed`, async () => {
        await delay(250);
        const completedCount = mockJobs.filter((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.COMPLETED).length;
        mockJobs = mockJobs.filter((job) => job.status !== SUPERADMIN_JOBS_STATUS_CODES.COMPLETED);
        return jsonSuccess(`Cleared ${completedCount} completed jobs.`, { affectedCount: completedCount });
    }),
    http.post(`${BASE_URL}/bulk-retry`, async ({ request }) => {
        await delay(300);
        const body = await request.json() as { ids?: unknown };
        const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string') : [];
        let affectedCount = 0;
        mockJobs = mockJobs.map((job) => {
            if (ids.includes(job.id) && job.status === SUPERADMIN_JOBS_STATUS_CODES.FAILED) {
                affectedCount += 1;
                return { ...job, status: SUPERADMIN_JOBS_STATUS_CODES.ACTIVE, attempts: job.attempts + 1 };
            }
            return job;
        });
        return jsonSuccess(`Queued ${affectedCount} selected jobs for retry.`, { affectedCount });
    }),
    http.post(`${BASE_URL}/bulk-delete`, async ({ request }) => {
        await delay(300);
        const body = await request.json() as { ids?: unknown };
        const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === 'string') : [];
        const before = mockJobs.length;
        mockJobs = mockJobs.filter((job) => !ids.includes(job.id));
        const affectedCount = before - mockJobs.length;
        return jsonSuccess(`Deleted ${affectedCount} selected jobs.`, { affectedCount });
    }),
];
