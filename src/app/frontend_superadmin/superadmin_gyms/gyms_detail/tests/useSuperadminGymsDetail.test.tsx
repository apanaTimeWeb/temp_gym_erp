import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchGymDetailBusinessOverview } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail_business_overview.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.query_keys';
import { useSuperadminGymsDetail } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/hooks/useSuperadminGymsDetail';
import { SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockFixtures';
import { resetSuperadminGymsMockState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/mocks/SuperadminGymsDetailMockHandlers';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail_business_overview.api', () => ({
    fetchGymDetailBusinessOverview: vi.fn(),
}));
const mockedFetch = vi.mocked(fetchGymDetailBusinessOverview);
beforeEach(() => {
  resetSuperadminGymsMockState();
});

describe('useSuperadminGymsDetail', () => {
    let queryClient: QueryClient;
    function TestQueryProvider({ children }: {
        children: ReactNode;
    }) {
        return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }
    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });
        mockedFetch.mockReset();
    });
    it('passes the route gym ID to the API and namespaces its query cache', async () => {
        mockedFetch.mockResolvedValue({
            success: true,
            message: 'Gym loaded.',
            data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t2,
        });
        const { result } = renderHook(() => useSuperadminGymsDetail('t2'), {
            wrapper: TestQueryProvider,
        });
        await waitFor(() => expect(result.current.data?.data?.gymId).toBe('t2'));
        expect(mockedFetch).toHaveBeenCalledWith('t2');
        expect(queryClient.getQueryData(SUPERADMIN_GYMS_QUERY_KEYS.detailBusinessOverview('t2'))).toEqual({
            success: true,
            message: 'Gym loaded.',
            data: SUPERADMIN_GYM_DETAIL_BUSINESS_OVERVIEW_MOCK_FIXTURES.t2,
        });
    });

    it('treats a resolved API failure envelope as a query error', async () => {
        mockedFetch.mockResolvedValue({ success: false, message: 'gym unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-gym' } as never);
        const { result } = renderHook(() => useSuperadminGymsDetail('t2'), { wrapper: TestQueryProvider });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBeUndefined();
        expect(queryClient.getQueryData(SUPERADMIN_GYMS_QUERY_KEYS.detailBusinessOverview('t2'))).toBeUndefined();
    });
});
