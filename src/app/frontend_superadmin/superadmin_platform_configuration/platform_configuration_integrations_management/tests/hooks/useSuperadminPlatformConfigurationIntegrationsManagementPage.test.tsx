// RESPONSIBILITY: Renders the useSuperadminPlatformConfigurationIntegrationsManagementPage.test UI for the integrations feature. Business/data orchestration is delegated to module-owned hooks.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchIntegrations } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_crud.api';
import { useSuperadminPlatformConfigurationIntegrationsManagementPage } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementPage';
import { SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/mocks/fixtures/SuperadminPlatformConfigurationIntegrationsManagementMockFixtures';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/api/superadmin_platform_configuration_integrations_management_api_crud.api', () => ({ fetchIntegrations: vi.fn() }));
const mockedFetch = vi.mocked(fetchIntegrations);
describe('useSuperadminPlatformConfigurationIntegrationsManagementPage integration', () => {
    let queryClient: QueryClient;
    function TestQueryProvider({ children }: {
        children: ReactNode;
    }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        });
        mockedFetch.mockReset();
    });
    it('delivers API response data through TanStack Query', async () => {
        mockedFetch.mockResolvedValue({
            success: true,
            message: 'Loaded successfully.',
            data: SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE,
        });
        const { result } = renderHook(() => useSuperadminPlatformConfigurationIntegrationsManagementPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data).toEqual(SUPERADMIN_PLATFORM_CONFIGURATION_INTEGRATIONS_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(result.current.isError).toBe(false);
    });
    it('exposes request failures through the query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminPlatformConfigurationIntegrationsManagementPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });

    it('treats a resolved API failure envelope as a query error', async () => {
        mockedFetch.mockResolvedValue({ success: false, message: 'integrations unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-integrations' } as never);
        const { result } = renderHook(() => useSuperadminPlatformConfigurationIntegrationsManagementPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });
});
