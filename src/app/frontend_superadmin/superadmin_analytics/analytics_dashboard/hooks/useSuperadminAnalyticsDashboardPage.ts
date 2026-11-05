'use client';
// DATA FLOW: Superadmin UI → useSuperadminAnalyticsDashboardPage → Superadmin module API/state → consuming component
// RESPONSIBILITY: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
// Exposes isPending, isError. No JSX — pure logic.
//
// DATA FLOW: analyticsApi.fetchRevenueMetrics() → useSuperadminAnalyticsDashboardPage → SuperadminAnalyticsMain → UI
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { analyticsApi } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/api/superadmin_analytics_dashboard.api';
import { SUPERADMIN_ANALYTICS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/api/superadmin_analytics_dashboard.query_keys';
import { hasValidAnalyticsCustomRange, isSuperadminAnalyticsDateRange } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/utils/SuperadminAnalyticsDashboardDateRangeUtils';

import type { SuperadminAnalyticsPageReturn, SuperadminAnalyticsTimeRange } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/types/superadmin_analytics_dashboard_page.types';


/**
 * Purpose: Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 
 * @description Logic hook for the Analytics page. Fetches revenue metrics and monthly chart data.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminAnalyticsDashboardPage responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminAnalyticsDashboardPage(): SuperadminAnalyticsPageReturn {
    const t = useTranslations('superadmin_analytics');
    const searchParams = useSearchParams();
    const rangeParam = searchParams.get('range');
    const timeRange: SuperadminAnalyticsTimeRange = isSuperadminAnalyticsDateRange(rangeParam) ? rangeParam : 'this_month';
    const customStart = searchParams.get('startDate') || '';
    const customEnd = searchParams.get('endDate') || '';
    const customRangeInvalid = timeRange === 'custom' && !hasValidAnalyticsCustomRange(customStart, customEnd);
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: SUPERADMIN_ANALYTICS_QUERY_KEYS.byRange(timeRange, customStart, customEnd),
        enabled: !customRangeInvalid,
        queryFn: async () => {
          const response = await analyticsApi.fetchRevenueMetrics(timeRange === 'custom'
            ? { timeRange, customStart, customEnd }
            : { timeRange });
          if (!response.success) throw new Error(response.message || 'Failed to load analytics');
          return response;
        },
    });
    return {
        metrics: customRangeInvalid ? null : data?.data?.metrics || null,
        monthlyData: customRangeInvalid ? [] : data?.data?.monthly || [],
        isPending: isPending && !customRangeInvalid,
        isError: isError || customRangeInvalid,
        error: (() => { if (customRangeInvalid) { return (t('ui.analytics_custom_range_invalid')); } if (isError) { return (t('ui.failed_to_load_view_e9d01d7')); } return (null); })(),
        timeRange,
        customStart,
        customEnd,
        refetch
    };
}
