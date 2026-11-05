"use client";
// RESPONSIBILITY: Owns Trainer earnings server state; URL parameters are the single source of truth for browse state.
// DATA FLOW: URL search/date/sort/page -> query key -> Trainer Earnings API -> rendered KPI/history state.
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';

import { TrainerEarningsApi } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/api/TrainerEarningsOverviewAndLedgerEarningsApi';

import { TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';

import { TRAINER_EARNINGS_QUERY_KEYS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsQueryKeys';

import { TrainerEarningsResolveTrainerEarningsDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsResolveTrainerEarningsDateRange';

import type { TrainerEarningsDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsDateRangeTypes';
import { TRAINER_EARNINGS_DATE_RANGE_OPTIONS } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDateRangeConstants';
import { TrainerEarningsIsValidDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsResolveTrainerEarningsDateRange';

import type { TrainerEarningsEarningsSortDirection, TrainerEarningsEarningsSortField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsSortTypes';








/**
 * @description Owns useTrainerEarningsQuery behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerEarningsQuery state and data flow for the earnings feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerEarningsQuery() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const rangeParam = searchParams.get('range') ?? 'this_month';
  const range = TRAINER_EARNINGS_DATE_RANGE_OPTIONS.some((option) => option.value === rangeParam) ? rangeParam as TrainerEarningsDateRange : 'this_month';
  const defaultRange = range === 'custom' ? null : TrainerEarningsResolveTrainerEarningsDateRange(range);
  const startDate = range === 'custom' ? searchParams.get('startDate') ?? '' : defaultRange?.startDate ?? '';
  const endDate = range === 'custom' ? searchParams.get('endDate') ?? '' : defaultRange?.endDate ?? '';
  const validDateWindow = range !== 'custom' || TrainerEarningsIsValidDateRange(startDate, endDate);
  const pageValue = Number(searchParams.get('page') ?? '1');
  const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS[0].value;
  const sortBy: TrainerEarningsEarningsSortField = TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS.some((option) => option.value === sortByValue) ? sortByValue as TrainerEarningsEarningsSortField : TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS[0].value;
  const sortDirection: TrainerEarningsEarningsSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';

  const query = useQuery({
    queryKey: [...TRAINER_EARNINGS_QUERY_KEYS.data({ startDate, endDate, search, page, limit: TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, sortBy, sortDirection }), range],
    enabled: validDateWindow,
    queryFn: () => TrainerEarningsApi.fetchEarningsData(startDate, endDate, search, page, TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, sortBy, sortDirection, range),
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, isInvalidRange: !validDateWindow };
}
