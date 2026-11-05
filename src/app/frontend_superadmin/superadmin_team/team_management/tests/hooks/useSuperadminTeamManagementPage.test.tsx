import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchTeam } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.api';
import { useSuperadminTeamManagementPage } from '@/app/frontend_superadmin/superadmin_team/team_management/hooks/useSuperadminTeamManagementPage';
import { SUPERADMIN_TEAM_MOCK_FIXTURE } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/fixtures/SuperadminTeamManagementMockFixtures';
import { resetSuperadminTeamMockState } from '@/app/frontend_superadmin/superadmin_team/team_management/mocks/handlers/SuperadminTeamManagementMockHandlers';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.api', () => ({ fetchTeam: vi.fn() }));
const mockedFetch = vi.mocked(fetchTeam);
beforeEach(() => {
  resetSuperadminTeamMockState();
});

describe('useSuperadminTeamManagementPage integration', () => {
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
            data: SUPERADMIN_TEAM_MOCK_FIXTURE,
        });
        const { result } = renderHook(() => useSuperadminTeamManagementPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.data).toEqual(SUPERADMIN_TEAM_MOCK_FIXTURE));
        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(result.current.isError).toBe(false);
    });
    it('exposes request failures through the query state', async () => {
        mockedFetch.mockRejectedValue(new Error('network failure'));
        const { result } = renderHook(() => useSuperadminTeamManagementPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });

    it('treats a resolved API failure envelope as a query error', async () => {
        mockedFetch.mockResolvedValue({ success: false, message: 'team unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-team' } as never);
        const { result } = renderHook(() => useSuperadminTeamManagementPage(), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeNull();
    });
});
