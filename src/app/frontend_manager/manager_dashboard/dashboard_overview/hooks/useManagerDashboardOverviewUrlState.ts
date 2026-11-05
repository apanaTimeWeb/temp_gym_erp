// DATA FLOW: URL parameters and user input → derived module state → consuming module-owned UI.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import type { ManagerDashboardOverviewDateRange } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates dashboard feature state and its documented UI/API boundary through useManagerDashboardOverviewUrlState.
 * @dependencies Uses ManagerDashboardOverviewDateFilterConstants.
 * @edge-case preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerDashboardOverviewUrlState owns the dashboard feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
const MANAGER_DASHBOARD_OVERVIEW_DATE_RANGES: readonly ManagerDashboardOverviewDateRange[] = ['weekly', 'monthly', 'yearly', 'custom'];

function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
}

function parseManagerDashboardOverviewDateRange(value: string | null): ManagerDashboardOverviewDateRange {
  return value && MANAGER_DASHBOARD_OVERVIEW_DATE_RANGES.includes(value as ManagerDashboardOverviewDateRange)
    ? (value as ManagerDashboardOverviewDateRange)
    : 'monthly';
}

export function useManagerDashboardOverviewUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const range = parseManagerDashboardOverviewDateRange(searchParams.get('range'));
  const rawStartDate = searchParams.get('startDate') ?? '';
  const rawEndDate = searchParams.get('endDate') ?? '';
  const startDate = isIsoDate(rawStartDate) ? rawStartDate : '';
  const endDate = isIsoDate(rawEndDate) ? rawEndDate : '';
  const hasValidCustomRange = Boolean(startDate && endDate && startDate <= endDate);

  const updateUrl = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value !== null && value !== '' ? params.set(key, value) : params.delete(key));
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const setRange = useCallback((value: ManagerDashboardOverviewDateRange) => updateUrl({ range: value, startDate: value === 'custom' && hasValidCustomRange ? startDate : null, endDate: value === 'custom' && hasValidCustomRange ? endDate : null }), [endDate, hasValidCustomRange, startDate, updateUrl]);
  const setCustomDateRange = useCallback((start: string, end: string) => {
    if (!isIsoDate(start) || !isIsoDate(end) || start > end) return;
    updateUrl({ range: 'custom', startDate: start, endDate: end });
  }, [updateUrl]);

  return { range, startDate, endDate, setRange, setCustomDateRange };
}
