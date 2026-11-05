"use client";
// RESPONSIBILITY: Query and control logic for the Admin Plan Revenue page.
// DATA FLOW: URL/query controls → AdminPlansRevenueApi → module-owned MSW → Query cache → view.

import { ADMIN_PLANS_REVENUE_QUERY_KEYS } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/constants/AdminFinancePlanRevenueAnalyticsQueryKeys';
import { normalizeAdminFinancePlanRevenueAnalyticsUrlPage } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsUrlPage';
import { PLANS_ITEMS_PER_PAGE, REVENUE_PERIOD_OPTIONS } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/constants/AdminFinancePlanRevenueAnalyticsConstants';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminPlansRevenueApi } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/api/admin_finance_plan_revenue_analytics_api';
import { useAdminPlansRevenueDebounce } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsDebounce';
import { useAdminPlansRevenueUrlQuerySync } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsUrlQuerySync';
import type { PlanRevenueRecord, RevenueAggregates, RevenuePeriod, RevenueSortDirection, RevenueSortKey } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
/** @description useAdminPlansRevenueLogic: Query and control logic for the Admin Plan Revenue page. @dependencies Consumes AdminPlansQueryKeys, AdminPlansRevenueApi, useAdminNavigationLayoutDebounce, useAdminPlansRevenueUrlQuerySync, AdminPlansRevenueTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminPlansRevenueLogic() {
  const [period, setPeriodState] = useState<RevenuePeriod>('THIS_MONTH');
  const [searchQuery, setSearchQueryState] = useState('');
  const [sortKey, setSortKey] = useState<RevenueSortKey>('totalRevenue');
  const [sortDir, setSortDir] = useState<RevenueSortDirection>('desc');
  const [currentPage, setCurrentPageState] = useState(1);
  const periodValues = REVENUE_PERIOD_OPTIONS.map((option) => option.value);
  const setPeriod = (value: RevenuePeriod) => { setPeriodState(periodValues.includes(value) ? value : 'THIS_MONTH'); setCurrentPageState(1); };
  const setSearchQuery = (value: string) => { setSearchQueryState(value); setCurrentPageState(1); };
  const setCurrentPage = (value: number) => setCurrentPageState(normalizeAdminFinancePlanRevenueAnalyticsUrlPage(value));
  const debouncedSearch = useAdminPlansRevenueDebounce(searchQuery, 300);

  useAdminPlansRevenueUrlQuerySync([
    { key: 'period', value: period, defaultValue: 'THIS_MONTH', setValue: (value) => setPeriodState(periodValues.includes(String(value) as RevenuePeriod) ? String(value) as RevenuePeriod : 'THIS_MONTH') },
    { key: 'search', value: searchQuery, defaultValue: '', setValue: (val) => setSearchQueryState(String(val ?? '')) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPageState(normalizeAdminFinancePlanRevenueAnalyticsUrlPage(value)) },
  ]);

  const query = useQuery({
    queryKey: ADMIN_PLANS_REVENUE_QUERY_KEYS.key('revenue', { period, search: debouncedSearch, sortKey, sortDir, page: currentPage, limit: PLANS_ITEMS_PER_PAGE }),
    queryFn: () => AdminPlansRevenueApi.fetchPlanRevenue(period, { search: debouncedSearch, sortKey, sortDir, page: currentPage, limit: PLANS_ITEMS_PER_PAGE }),
  });
  // A shareable page can become invalid when filtering reduces the result count.
  // Wait for a successful response before correcting the page (never while loading/error).
  const reportedTotalPages = query.data?.meta?.totalPages;
  useEffect(() => {
    if (query.isPending || query.isError || typeof reportedTotalPages !== 'number' || !Number.isSafeInteger(reportedTotalPages)) return;
    const lastPage = Math.max(1, reportedTotalPages);
    if (currentPage > lastPage) setCurrentPageState(lastPage);
  }, [currentPage, query.isPending, query.isError, reportedTotalPages]);
  const revenueData = query.data?.data ?? [];
  const aggregatesComplete = query.data?.meta?.totalPages === 1 && query.data?.meta?.total === revenueData.length;
  const handleSort = (key: RevenueSortKey) => { if (sortKey === key) setSortDir((prev) => prev === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('desc'); } setCurrentPageState(1); };
  const aggregates = useMemo<RevenueAggregates>(() => {
    const source = query.data?.data ?? [];
    if (!source.length) return { totalRevenue: 0, totalSubscriptions: 0, avgRenewalRate: 0, topPerformingPlanName: '—' };
    const sums = source.reduce((acc, row) => ({
      totalRevenue: acc.totalRevenue + row.totalRevenue,
      totalSubscriptions: acc.totalSubscriptions + row.activeSubscriptions,
      avgRenewalRate: acc.avgRenewalRate + row.renewalRate,
    }), { totalRevenue: 0, totalSubscriptions: 0, avgRenewalRate: 0 });
    const topPerformingPlan = source.reduce((top, row) => row.totalRevenue > top.totalRevenue ? row : top, source[0]!);
    return { ...sums, topPerformingPlanName: topPerformingPlan.planName };
  }, [query.data?.data]);
  const avgRenewalRate = revenueData.length ? aggregates.avgRenewalRate / revenueData.length : 0;
  return { period, setPeriod, searchQuery, setSearchQuery, sortKey, sortDir, handleSort, sortedData: revenueData as PlanRevenueRecord[], aggregates: { ...aggregates, avgRenewalRate }, aggregatesComplete, isPending: query.isPending, isError: query.isError, retry: query.refetch, currentPage, setCurrentPage, totalPages: query.data?.meta?.totalPages ?? 1, totalItems: query.data?.meta?.total ?? 0 };
}
