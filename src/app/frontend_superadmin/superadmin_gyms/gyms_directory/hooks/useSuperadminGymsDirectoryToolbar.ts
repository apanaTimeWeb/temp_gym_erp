'use client';
import { useEffect, useMemo } from 'react';

import { useTranslations as useFeedbackTranslations } from 'next-intl';
import { toast } from 'sonner';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { useSuperadminGymsDirectoryUrlState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';
import { debounce } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryDebounce';
import { resolveSuperadminGymsDirectoryFeedback } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFeedback';


// DATA FLOW: toolbar controls → URL/query state → Superadmin gyms table query → rendered result
/**
 * RESPONSIBILITY: Manages the logic for the Superadmin gyms search/filter/export toolbar.
 * DATA FLOW: UI input → debounced URL state → TanStack Query parameters → Superadmin Gym API.
 */


/** Owns URL-synchronized toolbar state and delegates export execution to the Gyms API client. */
/** Purpose: Owns the useSuperadminGymsDirectoryToolbar data/state orchestration for this Superadmin feature and exposes its typed UI-facing contract. */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryToolbar.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryToolbar → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms toolbar concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryToolbar() {
 const feedback = useFeedbackTranslations('superadmin_gyms');

    const { getParam, setParam, setParams } = useSuperadminGymsDirectoryUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'All');
    const planFilter = getParam('planFilter', 'All');
    const debouncedSearchChange = useMemo(() => debounce((value: string) => { setParams({ search: value || null, page: '1' }); }, 300), [setParams]);
// EFFECT INTENT: synchronizes this client-side side effect with the dependency list; changes to captured values intentionally re-run it.
    useEffect(() => () => debouncedSearchChange.cancel(), [debouncedSearchChange]);
    const handleSearchChange = (value: string) => debouncedSearchChange(value);
    const setStatusFilter = (value: string) => { setParams({ statusFilter: value === 'All' ? null : value, page: '1' }); };
    const setPlanFilter = (value: string) => { setParams({ planFilter: value === 'All' ? null : value, page: '1' }); };
    const viewMode = useSuperadminGymsDirectoryStore(state => state.viewMode);
    const setViewMode = useSuperadminGymsDirectoryStore(state => state.setViewMode);
    const handleExportGyms = async () => {
        try {
            const res = await gymsApi.exportGymsReport({ search, ...(statusFilter !== 'All' ? { status: statusFilter } : {}), ...(planFilter !== 'All' ? { plan: planFilter } : {}) });
            if (res.data?.downloadUrl) {
                const downloadUrl = new URL(res.data.downloadUrl, window.location.origin);
                if (downloadUrl.protocol !== 'https:' && downloadUrl.protocol !== 'http:') throw new Error('Export URL must use HTTP or HTTPS');
                window.open(downloadUrl.toString(), '_blank', 'noopener,noreferrer');
                toast.success(res.message, { id: 'gyms-export' });
            }
            else toast.error(res.message, { id: 'gyms-export' });
        } catch (error: unknown) { toast.error(resolveSuperadminGymsDirectoryFeedback(error, feedback('errors.unexpected')), { id: 'gyms-export' }); }
    };
    return { search, handleSearchChange, statusFilter, setStatusFilter, planFilter, setPlanFilter, viewMode, setViewMode, handleExportGyms };
}
