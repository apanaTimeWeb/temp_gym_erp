// DATA FLOW: URL-backed history filters → campaign/KPI queries → History-owned table and cards.
'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_history/api/manager_communications_communications_history.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_history/api/manager_communications_communications_history.query_keys';

/**
 * @description Fetches the communications-history campaign page and KPI summary as independent TanStack Query resources.
 * @param search Debounced campaign search string.
 * @param channel Selected channel filter; the caller supplies its all-channel sentinel when no channel is selected.
 * @param page One-based page number for the campaign-history request.
 * @dependencies Uses ManagerCommunicationsCampaignsApi and ManagerCommunicationsCampaignsQueryKeys.
 * @cacheKey Uses ManagerCommunicationsCampaignsQueryKeys.campaigns({ search, channel, page, limit: 10 }) for the page and ManagerCommunicationsCampaignsQueryKeys.kpis() for the summary.
 * @edge-case Missing campaign payloads normalize to an empty campaign list and zero total; query pending/error values are exposed rather than converted into a parallel async state enum.
 * @returns Campaign rows/count, campaign pending/error state and error value, plus KPI data when available.
 */
export function useManagerCommunicationsCampaignsQueries(search: string, channel: string, page: number) {
  const campaignsQuery = useQuery({
    queryKey: ManagerCommunicationsCampaignsQueryKeys.campaigns({ search, channel, page, limit: 10 }),
    queryFn: async () => { const response = await ManagerCommunicationsCampaignsApi.fetchCampaigns({ search, channel, page: String(page), limit: '10' }); if (!response.success || !response.data) throw new Error(response.message || 'Unable to load campaign history'); return response; },
    staleTime: 120_000,
  });
  const kpisQuery = useQuery({
    queryKey: ManagerCommunicationsCampaignsQueryKeys.kpis(),
    queryFn: async () => { const response = await ManagerCommunicationsCampaignsApi.fetchCommunicationKPIs(); if (!response.success || !response.data) throw new Error(response.message || 'Unable to load communication KPIs'); return response; },
    staleTime: 300_000,
  });
  return {
    campaigns: campaignsQuery.data.data.campaigns,
    campaignsTotal: campaignsQuery.data.data.total,
    campaignsLoading: campaignsQuery.isPending,
    campaignsError: campaignsQuery.isError,
    campaignsErrorValue: campaignsQuery.error,
    kpis: kpisQuery.data?.data,
    kpisError: kpisQuery.error,
    retryCampaigns: campaignsQuery.refetch,
  };
}
