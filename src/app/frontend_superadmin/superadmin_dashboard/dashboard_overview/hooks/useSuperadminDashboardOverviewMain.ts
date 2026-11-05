'use client';
// DATA FLOW: Superadmin UI → useSuperadminDashboardOverviewMain → Superadmin module API/state → consuming component
// DATA FLOW: URL search params → useSuperadminDashboardOverviewMain.ts → TanStack Query → SuperadminDashboardMain → Dashboard child components
// RESPONSIBILITY: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { superadminDashboardApi } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview.api';
import { SUPERADMIN_DASHBOARD_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/api/superadmin_dashboard_overview.query_keys';
import { SUPERADMIN_DASHBOARD_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants';

import type { TimeRange } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';


/**
 * Purpose: Custom hook managing the data fetching for the Dashboard view using TanStack Query.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Custom hook managing the data fetching for the Dashboard view using TanStack Query.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminDashboardOverviewMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminDashboardOverviewMain() {
    const searchParams = useSearchParams();
    const requestedRange = searchParams.get('range') ?? 'this_month';
    const timeRange: TimeRange = (SUPERADMIN_DASHBOARD_TIME_RANGES as readonly string[]).includes(requestedRange)
        ? requestedRange as TimeRange
        : 'this_month';
    const normalizeDate = (value: string | null) => {
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
        const date = new Date(`${value}T00:00:00.000Z`);
        return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? value : '';
    };
    const requestedStartDate = normalizeDate(searchParams.get('startDate'));
    const requestedEndDate = normalizeDate(searchParams.get('endDate'));
    const startDate = timeRange === 'custom' ? requestedStartDate : '';
    const endDate = timeRange === 'custom' && (!startDate || !requestedEndDate || requestedEndDate >= startDate) ? requestedEndDate : '';
    const { data: fetchRes, isPending, isError, refetch } = useQuery({
        queryKey: SUPERADMIN_DASHBOARD_QUERY_KEYS.byRange(timeRange, startDate, endDate),
        queryFn: async () => {
            const params: Record<string, string> = { range: timeRange };
            if (timeRange === 'custom') {
                if (startDate)
                    params.startDate = startDate;
                if (endDate)
                    params.endDate = endDate;
            }
            const response = await superadminDashboardApi.fetchDashboard(params);
            if (!response.success) throw new Error(response.message || 'Failed to load dashboard');
            return response;
        },
    });
    const apiData = fetchRes?.data;
    return {
        isPending,
        isError,
        retryDashboard: () => void refetch(),
        apiData,
        timeRange
    };
}
