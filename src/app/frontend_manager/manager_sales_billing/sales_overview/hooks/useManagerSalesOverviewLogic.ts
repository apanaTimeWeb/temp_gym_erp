// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { MANAGER_SALES_OVERVIEW_ROUTES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLocalDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewLocalGetErrorMessage';


import { MANAGER_SALES_OVERVIEW_CUSTOM_DATE_RANGE, MANAGER_SALES_OVERVIEW_DEFAULT_DATE_RANGE, MANAGER_SALES_OVERVIEW_FIRST_PAGE, MANAGER_SALES_OVERVIEW_PAGE_SIZE } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/manager_sales_overview_date_filter.constants';

import { ManagerSalesOverviewQueryKeys } from '@/app/frontend_manager/manager_sales_billing/sales_overview/api/manager_sales_overview.query_keys';
import { ManagerSalesOverviewResolveView } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewResolveView';
import { useSalesOverviewQuery, useMembershipReportQuery, usePendingPaymentsQuery, useAllMembershipsQuery } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewQueries';
import { getManagerSalesOverviewMembershipFilterId, ManagerSalesOverviewBuildMembershipFilterSearchParams } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewBuildMembershipFilterSearchParams';
import { resolveManagerSalesOverviewMembershipFilter } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewResolveMembershipFilter';
import type { ManagerSalesOverviewMembershipFilter } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';
import { useManagerSalesOverviewUiStore } from '@/app/frontend_manager/manager_sales_billing/sales_overview/state/useManagerSalesOverviewUiStore';
import type { ManagerSalesOverviewViewModel, SalesInitialData } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates sales feature state and its documented UI/API boundary through useManagerSalesOverviewLogic.
 * @dependencies Uses ManagerDebounce, useManagerSalesOverviewQueries, useManagerSalesOverviewUiStore, ManagerSalesOverviewTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerSalesOverviewLogic owns the sales feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerSalesOverviewLogic(initialData?: SalesInitialData | null): ManagerSalesOverviewViewModel {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
  const router = useRouter(); const searchParams = useSearchParams(); const pathname = usePathname(); const queryClient = useQueryClient(); const ui = useManagerSalesOverviewUiStore();
  const view = ManagerSalesOverviewResolveView(
    searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.VIEW),
    searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.LEGACY_TAB),
  );
  const membershipFilter = resolveManagerSalesOverviewMembershipFilter(searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.MEMBERSHIP_FILTER));
  const setMembershipFilter = useCallback((filter: ManagerSalesOverviewMembershipFilter) => { const query = ManagerSalesOverviewBuildMembershipFilterSearchParams(searchParams.toString(), filter); router.replace(`${pathname}?${query}`, { scroll: false }); }, [pathname, router, searchParams]);
  const [search, setSearchState] = useState('');
  const customStartDate = searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.START_DATE) || '';
  const customEndDate = searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.END_DATE) || '';
  const currentPage = Math.max(MANAGER_SALES_OVERVIEW_FIRST_PAGE, Number(searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.PAGE)) || MANAGER_SALES_OVERVIEW_FIRST_PAGE); const debouncedSearch = useManagerInfrastructureDebounce(search, 300);
  const updateUrl = useCallback((updates: Record<string, string | null>, resetPage = true) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    if (resetPage && !Object.hasOwn(updates, MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.PAGE)) params.set(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.PAGE, String(MANAGER_SALES_OVERVIEW_FIRST_PAGE));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const setSearch = useCallback((value: string) => { setSearchState(value); updateUrl({}, true); }, [updateUrl]);
  const setView = useCallback((value: ManagerSalesOverviewViewModel['view']) => updateUrl({ [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.VIEW]: value, [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.LEGACY_TAB]: null }, false), [updateUrl]);
  const setCustomStartDate = useCallback((value: string) => updateUrl({ [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.START_DATE]: value || null, [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.RANGE]: MANAGER_SALES_OVERVIEW_CUSTOM_DATE_RANGE }), [updateUrl]);
  const setCustomEndDate = useCallback((value: string) => updateUrl({ [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.END_DATE]: value || null, [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.RANGE]: MANAGER_SALES_OVERVIEW_CUSTOM_DATE_RANGE }), [updateUrl]);
  const setCurrentPage = useCallback((value: number) => updateUrl({ [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.PAGE]: String(Math.max(MANAGER_SALES_OVERVIEW_FIRST_PAGE, value)) }, false), [updateUrl]);
  const queryParams = useMemo(() => {
    const range = searchParams.get(MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.RANGE) || MANAGER_SALES_OVERVIEW_DEFAULT_DATE_RANGE;
    const params: Record<string, string> = { [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.RANGE]: range, [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.SEARCH]: debouncedSearch, [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.PAGE]: String(currentPage), [MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.LIMIT]: String(MANAGER_SALES_OVERVIEW_PAGE_SIZE) };
    if (membershipFilter !== 'All') params[MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.MEMBERSHIP_FILTER] = getManagerSalesOverviewMembershipFilterId(membershipFilter);
    if (range === MANAGER_SALES_OVERVIEW_CUSTOM_DATE_RANGE) { if (customStartDate) params[MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.START_DATE] = customStartDate; if (customEndDate) params[MANAGER_SALES_OVERVIEW_ROUTES.QUERY_PARAMS.END_DATE] = customEndDate; }
    return params;
  }, [customEndDate, customStartDate, currentPage, debouncedSearch, membershipFilter, searchParams]);
  const overview = useSalesOverviewQuery(queryParams); const report = useMembershipReportQuery(queryParams); const pending = usePendingPaymentsQuery(queryParams); const all = useAllMembershipsQuery(queryParams);
  const salesQueryError = [overview.error, report.error, pending.error, all.error].find(Boolean);
  const errorMessage = salesQueryError ? ManagerInfrastructureGetErrorMessage(salesQueryError, t('TEXT_GENERIC_ERROR')) : '';
  const loadAll = useCallback(async () => { await queryClient.invalidateQueries({ queryKey: ManagerSalesOverviewQueryKeys.all }); }, [queryClient]);
  return {
    view, setView, membershipFilter, setMembershipFilter, search, setSearch, customStartDate, setCustomStartDate, customEndDate, setCustomEndDate, currentPage, setCurrentPage,
    overviewData: overview.data ?? initialData?.overviewData ?? [], membershipReport: report.data?.report ?? initialData?.membershipReport ?? [],
    membershipReportTotal: report.data?.total ?? report.data?.report?.length ?? initialData?.membershipReport?.length ?? 0, membershipTotals: report.data?.totals ?? initialData?.membershipTotals ?? { activeCount: 0, revenue: 0, totalReceivable: 0, totalReceived: 0, remaining: 0, refunds: 0 },
    pendingPayments: pending.data?.members ?? initialData?.pendingPayments ?? [], pendingTotal: pending.data?.total ?? initialData?.pendingTotal ?? 0,
    allMemberships: all.data?.members ?? initialData?.allMemberships ?? [], allMembershipsTotal: all.data?.total ?? initialData?.allMembershipsTotal ?? 0,
    isPending: overview.isPending || report.isPending || pending.isPending || all.isPending, isError: overview.isError || report.isError || pending.isError || all.isError, errorMessage,
    loadAll, toast: ui.toast, showToast: ui.showToast,
  };
}
