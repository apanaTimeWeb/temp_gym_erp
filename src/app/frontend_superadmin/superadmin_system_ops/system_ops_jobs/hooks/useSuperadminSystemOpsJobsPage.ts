'use client';
/**

 * @description Owns custom hook responsibility for useSuperadminSystemOpsJobsPage, keeping feature-specific state and orchestration isolated inside `superadmin_system_ops`.
 * @dependencies Uses only approved application infrastructure plus module-owned APIs, schemas, types, and query/state primitives.
 * @edge-case Preserves loading/error/retry and resource identity semantics defined by the owning feature contract.
 */
// DATA FLOW: Superadmin UI → useSuperadminSystemOpsJobsPage → Superadmin module API/state → consuming component
// RESPONSIBILITY: Logic hook for the Background Jobs page. Owns all data-fetching, filter state,
// pagination, and action handlers. Exposes a clean interface to SuperadminSystemOpsJobsMain (view only).
// No JSX — pure logic (Rule 6, Rule 56).
//
// DATA FLOW: jobsApi.fetchJobs() → useSuperadminSystemOpsJobsPage → SuperadminSystemOpsJobsMain → Sub-components


import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.api';
import { SUPERADMIN_JOBS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.query_keys';
import { SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS, SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs_filter_options.constants';
import { SUPERADMIN_JOBS_STATUS_CODES, SUPERADMIN_JOBS_FILTER_STATUS_CODES, SUPERADMIN_JOBS_FILTER_QUEUE_CODES, SUPERADMIN_JOBS_PAGE_SIZE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';
import { useSuperadminSystemOpsJobsMutations } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsMutations';
import { useSuperadminSystemOpsJobsSelection } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsSelection';

import type { SuperadminSystemOpsJobsPageReturn } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_page.types';
import type { SuperadminSystemOpsJobsStatusFilter, SuperadminSystemOpsJobsQueueFilter, SuperadminSystemOpsJobsBackgroundJob } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';


/**
 * Logic hook for the Background Jobs page.
 * Returns job data, filter state, pagination, selection state, and all action handlers.
 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminSystemOpsJobsPage(): SuperadminSystemOpsJobsPageReturn {
    const { getParam, setParam } = useUrlState();
    const requestedStatusFilter = getParam('statusFilter', SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL);
    const requestedQueueFilter = getParam('queueFilter', SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL);
    const statusFilter = SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS.some((option) => option.value === requestedStatusFilter) ? requestedStatusFilter as SuperadminSystemOpsJobsStatusFilter : SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL;
    const queueFilter = SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS.some((option) => option.value === requestedQueueFilter) ? requestedQueueFilter as SuperadminSystemOpsJobsQueueFilter : SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL;
    const requestedPage = Number(getParam('page', '1'));
    const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const ITEMS_PER_PAGE = SUPERADMIN_JOBS_PAGE_SIZE;
    const setStatusFilter = (value: SuperadminSystemOpsJobsStatusFilter) => { const safeValue = SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS.some((option) => option.value === value) ? value : SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL; setParam('statusFilter', safeValue); setParam('page', '1'); };
    const setQueueFilter = (value: SuperadminSystemOpsJobsQueueFilter) => { const safeValue = SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS.some((option) => option.value === value) ? value : SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL; setParam('queueFilter', safeValue); setParam('page', '1'); };
    const setCurrentPage = (page: number) => setParam('page', String(page));
    const { selectedJobIds, setSelectedJobIds, inspectJob, setInspectJob, toggleSelection, toggleAll } = useSuperadminSystemOpsJobsSelection();
    const queryParams: Record<string, string> = {
        page: String(currentPage),
        limit: String(ITEMS_PER_PAGE),
        ...(statusFilter !== SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL && { status: statusFilter }),
        ...(queueFilter !== SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL && { queue: queueFilter }),
    };
    const { data: fetchRes, isPending, isError, refetch } = useQuery({
        queryKey: SUPERADMIN_JOBS_QUERY_KEYS.list(queryParams),
        queryFn: async () => {
            const response = await jobsApi.fetchJobs(queryParams);
            if (!response.success) throw new Error(response.message);
            return response;
        },
    });
    const rawJobs: SuperadminSystemOpsJobsBackgroundJob[] = fetchRes?.data ?? [];
    const allJobs = rawJobs;
    const total = (fetchRes as {
        meta?: {
            total?: number;
        };
    } | undefined)?.meta?.total ?? rawJobs.length;
    const cutoff24h = Date.now() - 24 * 60 * 60 * 1000;
    const occurredWithin24h = (job: SuperadminSystemOpsJobsBackgroundJob) => { if (!job.finishedAt) return false; const eventAt = Date.parse(job.finishedAt); return Number.isFinite(eventAt) && eventAt >= cutoff24h && eventAt <= Date.now(); };
    // The supplied API exposes only paginated job rows and no aggregate metrics endpoint. These metrics describe the current page only; 24h completion/failure counts require finishedAt and never infer completion from createdAt.
    const metrics = {
        activeJobs: allJobs.filter((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.ACTIVE).length,
        completed24h: allJobs.filter((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.COMPLETED && occurredWithin24h(job)).length,
        failed24h: allJobs.filter((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.FAILED && occurredWithin24h(job)).length,
        delayed: allJobs.filter((job) => job.status === SUPERADMIN_JOBS_STATUS_CODES.DELAYED).length,
    };
    // Server-side filtering applied — no client-side filter needed
    const filteredJobs = allJobs;
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;
    useEffect(() => { if (!isPending && currentPage > totalPages) setCurrentPage(totalPages); }, [isPending, currentPage, totalPages]);
    const paginatedJobs = allJobs; // Server-side pagination applied
    const mutations = useSuperadminSystemOpsJobsMutations({ setSelectedJobIds, selectedJobIds });
    return {
        isPending,
        isError,
        refetch,
        filteredJobs,
        paginatedJobs,
        currentPage,
        totalPages,
        total,
        setCurrentPage,
        statusFilter,
        setStatusFilter,
        queueFilter,
        setQueueFilter,
        selectedJobIds,
        toggleSelection,
        toggleAll,
        inspectJob,
        setInspectJob,
        ...mutations,
        metrics,
    };
}
