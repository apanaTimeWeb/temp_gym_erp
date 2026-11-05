import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { fetchSuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/api/superadmin_system_ops_overview.api';
import { useSuperadminSystemOpsOverviewSummary } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/hooks/useSuperadminSystemOpsOverviewSummary';
import { SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/mocks/SuperadminSystemOpsOverviewMockFixtures';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_system_ops/system_ops_overview/api/superadmin_system_ops_overview.api', () => ({ fetchSuperadminSystemOpsSummary: vi.fn() }));
describe('useSuperadminSystemOpsOverviewSummary', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchSuperadminSystemOpsSummary).mockResolvedValue({ success: true, message: 'ok', data: SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsOverviewSummary(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
    expect(result.current.data?.data).toEqual(SUPERADMIN_SYSTEM_OPS_SUMMARY_MOCK_FIXTURE);
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(fetchSuperadminSystemOpsSummary).mockResolvedValue({ success: false, message: 'summary unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-summary' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsOverviewSummary(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
