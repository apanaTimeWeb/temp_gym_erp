'use client';
// DATA FLOW: Superadmin UI → useSuperadminDashboardOverviewDateFilter → Superadmin module API/state → consuming component
// DATA FLOW: feature API/schema → hook/context → useSuperadminDashboardOverviewDateFilter consumers.
// RESPONSIBILITY: Custom hook managing the URL-backed state for the Dashboard date filter.


import { useState, useEffect, useCallback } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import { SUPERADMIN_DASHBOARD_TIME_RANGES } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/constants/superadmin_dashboard_overview_date_range.constants';
import { getSuperadminDashboardPresetRange } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewDateRangeUtils';

import type { SuperadminDashboardCustomDateField } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview_date_filter.types';
import type { TimeRange } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

/**
 * Purpose: Custom hook managing the URL-backed state for the Dashboard date filter.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.

 * @description Custom hook managing the URL-backed state for the Dashboard date filter.
 * @dependencies values defined by the exported hook signature.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
/**
 * @description Owns the useSuperadminDashboardOverviewDateFilter responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export function useSuperadminDashboardOverviewDateFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const requestedRange = searchParams.get('range') ?? 'this_month';
    const value: TimeRange = (SUPERADMIN_DASHBOARD_TIME_RANGES as readonly string[]).includes(requestedRange) ? requestedRange as TimeRange : 'this_month';
    const normalizeDate = (value: string | null) => {
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return '';
        const date = new Date(`${value}T00:00:00.000Z`);
        return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? '' : value;
    };
    const currentStartDate = normalizeDate(searchParams.get('startDate'));
    const currentEndCandidate = normalizeDate(searchParams.get('endDate'));
    const currentEndDate = currentStartDate && currentEndCandidate >= currentStartDate ? currentEndCandidate : '';
    const [customStart, setCustomStart] = useState(currentStartDate);
    const [customEnd, setCustomEnd] = useState(currentEndDate);
    // RESPONSIBILITY: Handle side-effects for useSuperadminDashboardOverviewDateFilter
    // EXPLANATION: Synchronize component state with external dependencies.
    // EFFECT DEPENDENCIES: Documented intentionally.
    // EFFECT INTENT: Synchronize local/UI state with the listed external dependencies.
    useEffect(() => {
        if (value === 'custom') {
            setCustomStart(currentStartDate);
            setCustomEnd(currentEndDate);
        }
    }, [value, currentStartDate, currentEndDate]);
    const handleCustomDateChange = useCallback((type: SuperadminDashboardCustomDateField, val: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (val && !/^\d{4}-\d{2}-\d{2}$/.test(val)) return;
        if (val) { const d = new Date(`${val}T00:00:00.000Z`); if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== val) return; }
        params.set('range', 'custom');
        if (type === 'start') {
            setCustomStart(val);
            if (val) params.set('startDate', val); else params.delete('startDate');
            const end = params.get('endDate');
            if (val && end && end < val) { params.delete('endDate'); setCustomEnd(''); }
        } else {
            setCustomEnd(val);
            if (val) params.set('endDate', val); else params.delete('endDate');
            const start = params.get('startDate');
            if (val && start && val < start) { params.delete('startDate'); setCustomStart(''); }
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    const handlePresetChange = useCallback((preset: string) => {
        if (!(SUPERADMIN_DASHBOARD_TIME_RANGES as readonly string[]).includes(preset)) return;
        const { from, to } = getSuperadminDashboardPresetRange(preset);
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', preset);
        if (preset !== 'custom' && preset !== 'monthly' && preset !== 'yearly') {
            params.set('startDate', from);
            params.set('endDate', to);
        } else if (preset !== 'custom') {
            params.delete('startDate');
            params.delete('endDate');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [router, searchParams, pathname]);
    return {
        value,
        customStart,
        customEnd,
        handlePresetChange,
        handleCustomDateChange
    };
}
