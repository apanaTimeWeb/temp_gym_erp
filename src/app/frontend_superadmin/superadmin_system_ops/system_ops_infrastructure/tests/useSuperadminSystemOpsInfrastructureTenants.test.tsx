import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api';
import { useSuperadminSystemOpsInfrastructureTenants } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureTenants';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockFixtures';

import type { ReactNode } from 'react';


vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api", () => ({ infrastructureApi: { fetchInfrastructureNodes: vi.fn(), fetchRedisTelemetry: vi.fn(), fetchTenants: vi.fn(), fetchUptimeHistory: vi.fn(), flushGlobalCache: vi.fn(), flushTenantCache: vi.fn() } }));

describe('useSuperadminSystemOpsInfrastructureTenants', () => {
  beforeEach(() => vi.clearAllMocks());
  it('loads tenants only while the flush dialog is open', async () => {
    vi.mocked(infrastructureApi.fetchTenants).mockResolvedValue({ success: true, message: 'ok', data: MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result, rerender } = renderHook(({ isOpen }) => useSuperadminSystemOpsInfrastructureTenants(isOpen), { initialProps: { isOpen: false }, wrapper });
    expect(infrastructureApi.fetchTenants).not.toHaveBeenCalled();
    rerender({ isOpen: true });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(infrastructureApi.fetchTenants).toHaveBeenCalledTimes(1);
    expect(result.current.data?.data).toEqual(MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS);
  });

  it('treats a resolved tenant API failure envelope as a query error', async () => {
    vi.mocked(infrastructureApi.fetchTenants).mockResolvedValue({ success: false, message: 'tenants unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-tenants' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result, rerender } = renderHook(({ isOpen }) => useSuperadminSystemOpsInfrastructureTenants(isOpen), { initialProps: { isOpen: false }, wrapper });
    rerender({ isOpen: true });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
  });
});
