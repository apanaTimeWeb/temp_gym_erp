// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
// RESPONSIBILITY: Orchestrates Manager Reports URL/tab state and summary query state; no synchronous export/download flow exists for the Manager role.
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { ManagerReportsOverviewQueryKeys } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/api/manager_reports_overview.query_keys';
import { useManagerReportsOverviewSummaryQuery } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewSummaryQuery';
import { useManagerReportsOverviewUiStore } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/state/useManagerReportsOverviewUiStore';
import type { ManagerReportsOverviewViewModel } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview_view_model.types';

/**
 * @description Coordinates Manager Reports summary state, URL-backed date range, tab selection, and targeted reload behavior.
 * @dependencies Uses only Manager Reports UI/query state plus TanStack Query and Next.js navigation infrastructure.
 * @edge-case Preserves the active range in the URL and invalidates only the Manager Reports query namespace when retrying.
 */
export function useManagerReportsOverviewLogic(): ManagerReportsOverviewViewModel {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const ui = useManagerReportsOverviewUiStore();
  const dateRange = searchParams.get('range') || 'this_month';
  const setDateRange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'this_month') params.set('range', value); else params.delete('range');
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);
  const summaryQuery = useManagerReportsOverviewSummaryQuery(dateRange);
  const reload = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ManagerReportsOverviewQueryKeys.all });
  }, [queryClient]);
  return {
    tab: ui.tab,
    setTab: ui.setTab,
    dateRange,
    setDateRange,
    summary: summaryQuery.data ?? null,
    isPending: summaryQuery.isPending,
    isError: summaryQuery.isError,
    reload,
  };
}
