'use client';
// DATA FLOW: Superadmin UI → useSuperadminCommunicationBroadcastsCampaignsData → Superadmin module API/state → consuming component
// DATA FLOW: feature API/schema → hook/context → useSuperadminCommunicationBroadcastsCampaignsData consumers.
// RESPONSIBILITY: Encapsulates functionality for useSuperadminCommunicationBroadcastsCampaignsData.ts


import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useUrlState } from '@/hooks/useUrlState';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.api';
import { SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/api/superadmin_communication_broadcasts_campaigns.query_keys';
import { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { createSuperadminCommunicationBroadcastsCampaignsFormApiError } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/utils/SuperadminCommunicationBroadcastsCampaignsFormApiErrors';

import type { Broadcast, SuperadminCommunicationBroadcastsTenant, BroadcastStatusFilter } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';


/**
 * Purpose: Encapsulates functionality for useSuperadminCommunicationBroadcastsCampaignsData.ts.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminCommunicationBroadcastsCampaignsData.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCommunicationBroadcastsCampaignsData → consuming feature component.
/**
 * @description Coordinates the use Superadmin broadcasts data concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export const useSuperadminCommunicationBroadcastsCampaignsData = () => {
    const { getParam, setParam } = useUrlState();
    const committedSearchQuery = getParam('search', '').slice(0, 200);
    const [draftSearchQuery, setDraftSearchQuery] = useState(committedSearchQuery);

    useEffect(() => {
        setDraftSearchQuery(committedSearchQuery);
    }, [committedSearchQuery]);

    useEffect(() => {
        if (draftSearchQuery === committedSearchQuery) return;
        const timeoutId = window.setTimeout(() => {
            setParam('search', draftSearchQuery.trim().slice(0, 200));
            setParam('page', '1');
        }, 300);
        return () => window.clearTimeout(timeoutId);
    }, [draftSearchQuery, committedSearchQuery, setParam]);
    const searchQuery = draftSearchQuery;
    const rawStatus = getParam('status', SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL);
    const statusFilter = (Object.values(SUPERADMIN_BROADCAST_STATUS_FILTER_CODES) as string[]).includes(rawStatus)
        ? rawStatus as BroadcastStatusFilter
        : SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL as BroadcastStatusFilter;
    const rawPage = Number(getParam('page', '1'));
    const currentPage = Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
    const pageSize = 10;
    const setSearchQuery = (val: string) => setDraftSearchQuery(val.slice(0, 200));
    const setStatusFilter = (val: BroadcastStatusFilter) => { setParam('status', val); setParam('page', '1'); };
    const setCurrentPage = (val: number) => setParam('page', String(Number.isSafeInteger(val) && val > 0 ? val : 1));
    const queryParams = useMemo(() => {
        const params: Record<string, string> = {};
        if (committedSearchQuery)
            params.search = committedSearchQuery;
        if (statusFilter !== SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL)
            params.status = statusFilter;
        params.page = String(currentPage);
        params.limit = String(pageSize);
        return params;
    }, [committedSearchQuery, statusFilter, currentPage]);
    const queryKey = useMemo(() => SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.list(queryParams), [queryParams]);
    const { data: broadcastsRes, status, error, refetch: retryBroadcasts } = useQuery({
        queryKey,
        queryFn: async () => {
            const response = await broadcastsApi.fetchBroadcasts(queryParams);
            if (!response.success) throw createSuperadminCommunicationBroadcastsCampaignsFormApiError(response);
            return response;
        },
    });
    const { data: gymsRes, error: gymsError, refetch: retryGyms } = useQuery({
        queryKey: SUPERADMIN_COMMUNICATION_BROADCASTS_QUERY_KEYS.tenants,
        queryFn: async () => {
            const response = await broadcastsApi.fetchTenants();
            if (!response.success) throw createSuperadminCommunicationBroadcastsCampaignsFormApiError(response);
            return response;
        },
    });
    const broadcasts = useMemo(() => (broadcastsRes?.data as Broadcast[]) ?? [], [broadcastsRes]);
    const gyms = useMemo(() => (gymsRes?.data as SuperadminCommunicationBroadcastsTenant[]) ?? [], [gymsRes]);
    return {
        broadcasts,
        gyms,
        status,
        error,
        retryBroadcasts,
        gymsError,
        retryGyms,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        currentPage,
        pageSize,
        totalPages: Math.max(1, Math.ceil(Number((broadcastsRes as {
            meta?: {
                total?: number;
            };
        } | undefined)?.meta?.total ?? broadcasts.length) / pageSize)),
        setCurrentPage
    };
};
