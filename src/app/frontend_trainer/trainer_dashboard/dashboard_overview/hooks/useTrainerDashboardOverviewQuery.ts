"use client";
// RESPONSIBILITY: Owns Dashboard server state. URL parameters are the canonical owner of shareable date-range state.
// DATA FLOW: Dashboard URL/filter state → TanStack Query → TrainerDashboardApi → validated server data → dashboard UI.
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';

import { TrainerDashboardApi } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/api/TrainerDashboardOverviewApi';

import { TRAINER_DASHBOARD_QUERY_KEYS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/TrainerDashboardOverviewQueryKeys';

import { TRAINER_DASHBOARD_URLS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';
import type { TrainerDashboardDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewDateRangeTypes';
import { TRAINER_DASHBOARD_DATE_RANGE_OPTIONS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/utils/TrainerDashboardOverviewDateRangeConstants';
import { TrainerDashboardIsValidDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/utils/TrainerDashboardOverviewDateRangeValidation';
import { TrainerDashboardResolveDateRange } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/utils/TrainerDashboardOverviewResolveDateRange';






/**
 * @description Owns useTrainerDashboardQuery behavior in the Trainer module.
 * @dependencies Dashboard URL/filter state → TanStack Query → TrainerDashboardApi → validated server data → dashboard UI.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerDashboardQuery state and data flow for the dashboard feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented dashboard module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerDashboardQuery() {
  const searchParams = useSearchParams();
  const rangeParam = searchParams.get('range') ?? 'this_month';
  const range = TRAINER_DASHBOARD_DATE_RANGE_OPTIONS.some((option) => option.value === rangeParam) ? rangeParam as TrainerDashboardDateRange : 'this_month';
  const resolvedRange = range === 'custom' ? { startDate: searchParams.get('startDate') ?? '', endDate: searchParams.get('endDate') ?? '' } : TrainerDashboardResolveDateRange(range);
  const { startDate, endDate } = resolvedRange;
  const validWindow = range !== 'custom' || TrainerDashboardIsValidDateRange(startDate, endDate);

  const query = useQuery({
    queryKey: TRAINER_DASHBOARD_QUERY_KEYS.stats(range, startDate, endDate),
    enabled: validWindow,
    queryFn: () => TrainerDashboardApi.fetchDashboardStats(range, startDate, endDate),
    meta: { endpoint: TRAINER_DASHBOARD_URLS.API.STATS },
    staleTime: 5 * 60 * 1000,
  });

  // Disabled invalid custom ranges must not leave the dashboard in an endless loading skeleton.
  return { ...query, isInvalidRange: !validWindow };
}
