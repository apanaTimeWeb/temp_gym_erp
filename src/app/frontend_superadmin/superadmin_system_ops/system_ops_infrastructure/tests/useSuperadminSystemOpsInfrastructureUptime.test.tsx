import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api';
import { useSuperadminSystemOpsInfrastructureUptime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureUptime';

import type { ReactNode } from 'react';



vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api", () => ({ infrastructureApi: { fetchUptimeHistory: vi.fn() } }));

describe('useSuperadminSystemOpsInfrastructureUptime', () => {
  it('returns the validated uptime series through TanStack Query', async () => {
    vi.mocked(infrastructureApi.fetchUptimeHistory).mockResolvedValue({ success: true, message: 'Loaded', data: [{ timestamp: '2026-01-01T00:00:00Z', uptimePercent: 99.9 }] , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureUptime(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.data?.data).toHaveLength(1);
  });

  it('treats a resolved uptime API failure envelope as a query error', async () => {
    vi.mocked(infrastructureApi.fetchUptimeHistory).mockResolvedValue({ success: false, message: 'uptime unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-uptime' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureUptime(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
