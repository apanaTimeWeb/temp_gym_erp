import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { superadminDashboardApi } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview.api';
import { SUPERADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview.query_keys';
import { useSuperadminDashboardOverviewMain } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewMain';
import { MOCK_SUPERADMIN_DASHBOARD_DATA } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/mocks/fixtures/SuperadminDashboardOverviewMockFixtures';

import type { SuperadminDashboardApiData } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';
import type { ApiResponse } from '@/lib/api';

let params = new URLSearchParams();
vi.mock('next/navigation', () => ({
    useSearchParams: vi.fn(() => params),
}));
vi.mock('@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview.api', () => ({
    superadminDashboardApi: { fetchDashboard: vi.fn() },
}));

function createWrapper() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminDashboardOverviewMain', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        params = new URLSearchParams();
        vi.mocked(superadminDashboardApi.fetchDashboard).mockResolvedValue({ success: true, message: 'Dashboard loaded', data: MOCK_SUPERADMIN_DASHBOARD_DATA } satisfies ApiResponse<SuperadminDashboardApiData>);
    });

    it('loads the default dashboard range from the real query path', async () => {
        const { result } = renderHook(() => useSuperadminDashboardOverviewMain(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));
        expect(result.current.timeRange).toBe('this_month');
        expect(result.current.apiData).toEqual(MOCK_SUPERADMIN_DASHBOARD_DATA);
        expect(superadminDashboardApi.fetchDashboard).toHaveBeenCalledWith({ range: 'this_month' });
    });

    it('preserves custom date parameters in the API request and query key', async () => {
        params = new URLSearchParams({ range: 'custom', startDate: '2024-01-01', endDate: '2024-01-31' });
        const { result } = renderHook(() => useSuperadminDashboardOverviewMain(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isPending).toBe(false));
        expect(superadminDashboardApi.fetchDashboard).toHaveBeenCalledWith({ range: 'custom', startDate: '2024-01-01', endDate: '2024-01-31' });
        expect(SUPERADMIN_DASHBOARD_QUERY_KEYS.byRange('custom', '2024-01-01', '2024-01-31')).toEqual([
            ...SUPERADMIN_DASHBOARD_QUERY_KEYS.all, 'custom', '2024-01-01', '2024-01-31',
        ]);
    });

    it('surfaces loading and error states from the actual Query lifecycle', async () => {
        let resolve!: (value: ApiResponse<SuperadminDashboardApiData>) => void;
        vi.mocked(superadminDashboardApi.fetchDashboard).mockReturnValueOnce(new Promise<ApiResponse<SuperadminDashboardApiData>>((res) => { resolve = res; }));
        const { result } = renderHook(() => useSuperadminDashboardOverviewMain(), { wrapper: createWrapper() });
        expect(result.current.isPending).toBe(true);
        resolve({ success: true, message: 'ok', data: MOCK_SUPERADMIN_DASHBOARD_DATA });
        await waitFor(() => expect(result.current.isPending).toBe(false));

        vi.mocked(superadminDashboardApi.fetchDashboard).mockRejectedValueOnce(new Error('dashboard-api-failed'));
        const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const Wrapper = ({ children }: { children: React.ReactNode }) => createElement(QueryClientProvider, { client }, children);
        params = new URLSearchParams({ range: 'custom', startDate: '2025-01-01', endDate: '2025-01-31' });
        const errorHook = renderHook(() => useSuperadminDashboardOverviewMain(), { wrapper: Wrapper });
        await waitFor(() => expect(errorHook.result.current.isError).toBe(true));
    });

    it('treats a resolved API failure envelope as an error rather than dashboard data', async () => {
        vi.mocked(superadminDashboardApi.fetchDashboard).mockResolvedValue({ success: false, message: 'dashboard unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-dashboard' } as never);
        const { result } = renderHook(() => useSuperadminDashboardOverviewMain(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.apiData).toBeUndefined();
    });
});
