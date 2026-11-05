'use client';


import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
// DATA FLOW: Owning feature API/query/store state → useSuperadminGymsDirectoryTable → consuming feature component.
import { SUPERADMIN_GYMS_DIRECTORY_ROUTES as SUPERADMIN_GYMS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/config/superadmin_gyms_directory.url_config';
import { useSuperadminGymsDirectoryGymMutations } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymMutations';
import { confirmSuperadminGymsDirectoryProgrammaticNavigation } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard';
import { useSuperadminGymsDirectoryUrlState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';
import { createSuperadminGymsDirectoryFormApiError } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryFormApiErrors';

import type { SuperadminGymsSortOrder } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory_table.types';
import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/types/superadmin_gyms_directory.types';
import type { MouseEvent } from 'react';

/**
 * Purpose: Provides the logic and state for the SuperadminGymsTable component using TanStack Query.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDirectoryTable.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDirectoryTable → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms table concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDirectoryTable() {
    const router = useRouter();
    const { getParam, setParam } = useSuperadminGymsDirectoryUrlState();
    const search = getParam('search', '');
    const statusFilter = getParam('statusFilter', 'All');
    const planFilter = getParam('planFilter', 'All');
    const sortBy = getParam('sortBy', 'createdAt');
    const sortOrder = getParam('sortOrder', 'desc') as SuperadminGymsSortOrder;
    const segmentId = getParam('segmentId', '');
    const currentPage = Number(getParam('page', '1'));
    const pageLimit = Number(getParam('limit', '20'));
    const setCurrentPage = (page: number) => setParam('page', String(page));
    const setSortBy = (col: string) => setParam('sortBy', col);
    const setSortOrder = (order: SuperadminGymsSortOrder) => setParam('sortOrder', order);
    const openDeleteModal = useSuperadminGymsDirectoryStore(state => state.openDeleteModal);
    const openWhatsappModal = useSuperadminGymsDirectoryStore(state => state.openWhatsappModal);
    // Fetch Gyms
    const queryParams = {
        ...(search && { search }),
        ...(statusFilter !== 'All' && { status: statusFilter }),
        ...(planFilter !== 'All' && { plan: planFilter }),
        ...(segmentId && { segmentId }),
        sortBy,
        order: sortOrder,
        page: String(currentPage),
        limit: String(pageLimit),
    };
    const { data: fetchRes, isPending, isError, error, refetch } = useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.list(queryParams),
        queryFn: async () => {
            const response = await gymsApi.fetchGyms(queryParams);
            if (!response.success) throw createSuperadminGymsDirectoryFormApiError(response);
            return response;
        },
    });
    const gyms = fetchRes?.data && fetchRes.data.length > 0 ? fetchRes.data : [];
    const total = fetchRes?.meta?.total || gyms.length;
    const filteredGyms = useMemo(() => {
        if (!gyms)
            return [];
        return gyms;
    }, [gyms]);
    const { actionLoadingId, onGhostLoginClick, onSuspendClick, } = useSuperadminGymsDirectoryGymMutations(gyms);
    const handleRowClick = async (gym: Tenant) => {
        const allowed = await confirmSuperadminGymsDirectoryProgrammaticNavigation();
        if (!allowed) return;
        router.push(SUPERADMIN_GYMS_MANAGEMENT_ROUTES.VIEW('detail', gym.id));
    };
    const onDeleteClick = (e: MouseEvent, gym: Tenant) => {
        e.stopPropagation();
        openDeleteModal(gym);
    };
    return {
        filteredGyms,
        isPending,
        isError,
        error,
        total,
        actionLoadingId,
        handleRowClick,
        onGhostLoginClick,
        onSuspendClick,
        onDeleteClick,
        openWhatsappModal,
        currentPage,
        pageLimit,
        sortBy,
        sortOrder,
        segmentId,
        setCurrentPage,
        setSortBy,
        setSortOrder,
        refetch,
    };
}

