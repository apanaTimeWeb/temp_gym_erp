import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { infrastructureApi } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api';
import { useSuperadminSystemOpsInfrastructureData } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureData';
import { MOCK_INFRASTRUCTURE_NODES, MOCK_REDIS_TELEMETRY } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockData';
import { MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockFixtures';

import type { ReactNode } from 'react';


vi.mock("@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/api/superadmin_system_ops_infrastructure.api", () => ({ infrastructureApi: { fetchInfrastructureNodes: vi.fn(), fetchRedisTelemetry: vi.fn(), fetchTenants: vi.fn(), fetchUptimeHistory: vi.fn(), flushGlobalCache: vi.fn(), flushTenantCache: vi.fn() } }));

describe('useSuperadminSystemOpsInfrastructureData', () => {
  beforeEach(() => vi.clearAllMocks());
  it('loads nodes independently from the extracted cache workflow using the declared API facade and query params', async () => {
    vi.mocked(infrastructureApi.fetchInfrastructureNodes).mockResolvedValue({ success: true, message: 'ok', data: MOCK_INFRASTRUCTURE_NODES , requestId: 'test-request-id'});
    vi.mocked(infrastructureApi.fetchRedisTelemetry).mockResolvedValue({ success: true, message: 'ok', data: MOCK_REDIS_TELEMETRY , requestId: 'test-request-id'});
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const queryParams = { statusFilter: 'HEALTHY' };
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureData(queryParams), { wrapper });
    await waitFor(() => expect(result.current.nodesQuery.isSuccess).toBe(true));
    expect(infrastructureApi.fetchInfrastructureNodes).toHaveBeenCalledWith(queryParams);
    expect(infrastructureApi.fetchRedisTelemetry).not.toHaveBeenCalled();
    expect(result.current.nodesQuery.data?.data).toEqual(MOCK_INFRASTRUCTURE_NODES);
    expect(result.current.redisQuery.data).toBeUndefined();
    expect(infrastructureApi.fetchTenants).not.toHaveBeenCalled();
  });

  it('treats resolved API failure envelopes as errors for nodes, Redis, and tenants', async () => {
    const failure = { success: false, message: 'infrastructure unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-infrastructure' };
    vi.mocked(infrastructureApi.fetchInfrastructureNodes).mockResolvedValue(failure as never);
    vi.mocked(infrastructureApi.fetchRedisTelemetry).mockResolvedValue(failure as never);
    vi.mocked(infrastructureApi.fetchTenants).mockResolvedValue(failure as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureData({}, true), { wrapper });
    await waitFor(() => expect(result.current.nodesQuery.isError && result.current.tenantsQuery.isError).toBe(true));
    expect(result.current.nodesQuery.data).toBeUndefined();
    expect(result.current.redisQuery.data).toBeUndefined();
    expect(result.current.tenantsQuery.data).toBeUndefined();
  });

  it('preserves successful tenant response data when tenant selection is enabled', async () => {
    const tenantFixture = MOCK_SUPERADMIN_INFRASTRUCTURE_TENANTS;
    vi.mocked(infrastructureApi.fetchInfrastructureNodes).mockResolvedValue({ success: true, message: 'ok', data: MOCK_INFRASTRUCTURE_NODES , requestId: 'test-request-id'});
    vi.mocked(infrastructureApi.fetchRedisTelemetry).mockResolvedValue({ success: true, message: 'ok', data: MOCK_REDIS_TELEMETRY , requestId: 'test-request-id'});
    vi.mocked(infrastructureApi.fetchTenants).mockResolvedValue({ success: true, message: 'ok', data: tenantFixture , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructureData({}, true), { wrapper });
    await waitFor(() => expect(result.current.tenantsQuery.isSuccess).toBe(true));
    expect(result.current.tenantsQuery.data?.data).toEqual(tenantFixture);
  });
});
