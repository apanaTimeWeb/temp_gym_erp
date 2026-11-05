import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { jobsApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.api';
import { useSuperadminSystemOpsJobsMutations } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsMutations';
import { MOCK_BACKGROUND_JOBS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/mocks/SuperadminSystemOpsJobsMockData';

import type { ReactNode } from 'react';


const confirm = vi.fn().mockResolvedValue(true);
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/api/superadmin_system_ops_jobs.api", () => ({ jobsApi: { retryJob: vi.fn(), retryAllJobs: vi.fn(), cancelJob: vi.fn(), deleteJob: vi.fn(), clearCompletedJobs: vi.fn(), bulkRetryJobs: vi.fn(), bulkDeleteJobs: vi.fn() } }));

describe('useSuperadminSystemOpsJobsMutations', () => {
  it('clears a successful retry intent so a later user action gets a fresh key', async () => {
    vi.mocked(jobsApi.retryJob).mockResolvedValue({ success: true, message: 'Retried', data: MOCK_BACKGROUND_JOBS[0]! , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSystemOpsJobsMutations({ selectedJobIds: new Set(), setSelectedJobIds: vi.fn() }), { wrapper });
    await act(async () => { await result.current.handleRetryJob('job-1'); await result.current.handleRetryJob('job-1'); });
    await waitFor(() => expect(jobsApi.retryJob).toHaveBeenCalledTimes(2));
    expect(vi.mocked(jobsApi.retryJob).mock.calls[0]?.[1]).not.toBe(vi.mocked(jobsApi.retryJob).mock.calls[1]?.[1]);
  });

  it('keeps the same idempotency key after an application-level retry failure', async () => {
    vi.mocked(jobsApi.retryJob).mockReset();
    vi.mocked(jobsApi.retryJob)
      .mockResolvedValueOnce({ success: false, message: 'Temporary failure', data: MOCK_BACKGROUND_JOBS[0]! , errorCode: 'TEST_FAILURE', statusCode: 500, requestId: 'test-request-id'})
      .mockResolvedValueOnce({ success: true, message: 'Retried', data: MOCK_BACKGROUND_JOBS[0]! , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSystemOpsJobsMutations({ selectedJobIds: new Set(), setSelectedJobIds: vi.fn() }), { wrapper });
    await act(async () => { await result.current.handleRetryJob('job-1'); await result.current.handleRetryJob('job-1'); });
    await waitFor(() => expect(jobsApi.retryJob).toHaveBeenCalledTimes(2));
    expect(vi.mocked(jobsApi.retryJob).mock.calls[0]?.[1]).toBe(vi.mocked(jobsApi.retryJob).mock.calls[1]?.[1]);
  });

});
