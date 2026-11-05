import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.api';
import { SUPERADMIN_JOBS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.query_keys';
import { SUPERADMIN_JOBS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';
import { useSuperadminSystemOpsJobsPage } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsPage';


const setParamMock = vi.fn();
let currentParams: Record<string, string> = {};

vi.mock('@/hooks/useUrlState', () => ({
    useUrlState: vi.fn(() => ({
        getParam: (key: string, fallback: string) => currentParams[key] ?? fallback,
        setParam: (key: string, value: string) => {
            currentParams[key] = value;
            setParamMock(key, value);
        },
    })),
}));

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn() })),
    usePathname: vi.fn(() => '/superadmin/system-ops/jobs'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.api", () => ({
    jobsApi: {
        fetchJobs: vi.fn(),
        retryJob: vi.fn(),
        cancelJob: vi.fn(),
        deleteJob: vi.fn(),
    },
}));

vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsMutations", () => ({
    useSuperadminSystemOpsJobsMutations: vi.fn(() => ({
        isRetrying: false,
        isJobActionPending: vi.fn(() => false),
        handleRetryAll: vi.fn(),
        handleRetryJob: vi.fn(),
        handleCancelJob: vi.fn(),
        handleDeleteJob: vi.fn(),
        handleClearCompleted: vi.fn(),
        handleBulkRetry: vi.fn(),
        handleBulkDelete: vi.fn(),
    })),
}));

vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsSelection", () => ({
    useSuperadminSystemOpsJobsSelection: vi.fn(() => ({
        selectedJobIds: new Set<string>(),
        setSelectedJobIds: vi.fn(),
        inspectJob: null,
        setInspectJob: vi.fn(),
        toggleSelection: vi.fn(),
        toggleAll: vi.fn(),
    })),
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

const jobsResponse = {
    success: true,
    message: 'Jobs loaded',
    data: [
        { id: 'JOB-001', queueName: 'billing', jobName: 'Sync', status: SUPERADMIN_JOBS_STATUS_CODES.COMPLETED, attempts: 1, createdAt: new Date().toISOString(), finishedAt: new Date().toISOString(), durationMs: 60000, payload: { source: 'test' } },
        { id: 'JOB-002', queueName: 'export', jobName: 'Failure', status: SUPERADMIN_JOBS_STATUS_CODES.FAILED, attempts: 2, error: 'Temporary failure', createdAt: new Date().toISOString() },
    ],
    meta: { total: 2, page: 1, limit: 10, totalPages: 1 },
} satisfies Awaited<ReturnType<typeof jobsApi.fetchJobs>> & { meta: { total: number; page: number; limit: number; totalPages: number } };

describe('useSuperadminSystemOpsJobsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        currentParams = {};
        vi.mocked(jobsApi.fetchJobs).mockResolvedValue(jobsResponse);
    });

    it('loads jobs through the real QueryClient path and computes metrics', async () => {
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(jobsApi.fetchJobs).toHaveBeenCalledWith({ page: '1', limit: '10' });
        expect(result.current.filteredJobs).toHaveLength(2);
        expect(result.current.metrics.completed24h).toBe(1);
        expect(result.current.metrics.failed24h).toBe(0); // A createdAt timestamp alone does not prove the failure completed within 24 hours.
        expect(result.current.totalPages).toBe(1);
    });

    it('counts 24-hour completion/failure metrics only when finishedAt is present and within the window', async () => {
        const now = Date.now();
        vi.mocked(jobsApi.fetchJobs).mockResolvedValueOnce({
            ...jobsResponse,
            data: [
                { ...jobsResponse.data[0], finishedAt: new Date(now - 60_000).toISOString() },
                { ...jobsResponse.data[1] },
                { ...jobsResponse.data[1], id: 'JOB-003', finishedAt: new Date(now - 60_000).toISOString() },
            ],
        });
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));
        expect(result.current.metrics.completed24h).toBe(1);
        expect(result.current.metrics.failed24h).toBe(1);
    });

    it('propagates server-side status filtering into URL state and the next request', async () => {
        const { result, rerender } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isPending).toBe(false));

        act(() => result.current.setStatusFilter(SUPERADMIN_JOBS_STATUS_CODES.FAILED));

        expect(setParamMock).toHaveBeenCalledWith('statusFilter', SUPERADMIN_JOBS_STATUS_CODES.FAILED);
        expect(setParamMock).toHaveBeenCalledWith('page', '1');

        rerender();
        await waitFor(() => expect(jobsApi.fetchJobs).toHaveBeenCalledWith({
            page: '1',
            limit: '10',
            status: SUPERADMIN_JOBS_STATUS_CODES.FAILED,
        }));
    });

    it('propagates queue filtering into the API request', async () => {
        const { result, rerender } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));

        act(() => result.current.setQueueFilter('export'));
        expect(setParamMock).toHaveBeenCalledWith('queueFilter', 'export');

        rerender();
        await waitFor(() => expect(jobsApi.fetchJobs).toHaveBeenCalledWith({
            page: '1',
            limit: '10',
            queue: 'export',
        }));
    });

    it('surfaces query errors instead of fabricating an empty-success state', async () => {
        vi.mocked(jobsApi.fetchJobs).mockRejectedValueOnce(new Error('jobs-api-failed'));
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: createWrapper() });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.filteredJobs).toEqual([]);
    });

    it('keeps the query key resource shape stable for server-side filters', async () => {
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const Wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client: queryClient }, children);
        const { result } = renderHook(() => useSuperadminSystemOpsJobsPage(), { wrapper: Wrapper });
        await waitFor(() => expect(result.current.isPending).toBe(false));

        expect(SUPERADMIN_JOBS_QUERY_KEYS.list({ page: '1', limit: '10' })).toEqual([
            'superadmin_system_ops_jobs',
            'jobs',
            { page: '1', limit: '10' },
        ]);
    });
});
