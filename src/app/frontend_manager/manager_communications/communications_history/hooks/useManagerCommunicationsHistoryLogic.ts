// DATA FLOW: URL-backed search/channel/page → History queries → read-only history UI.
'use client';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { COMM_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_communications/communications_history/constants/manager_communications_campaigns_shared.constants';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_history/api/manager_communications_communications_history.query_keys';
import { useManagerCommunicationsCampaignsQueries } from '@/app/frontend_manager/manager_communications/communications_history/hooks/useManagerCommunicationsHistoryQueries';

/**
 * @description Coordinates shareable communications-history search, channel, and pagination state with the history query hook.
 * @dependencies Uses Next.js URL navigation, useManagerInfrastructureDebounce, COMM_ITEMS_PER_PAGE, and useManagerCommunicationsCampaignsQueries.
 * @edge-case Missing or invalid page values resolve to page 1; the default channel is all; changing search or channel clears the page parameter; URL updates use replace with scroll disabled.
 * @returns History KPIs, campaign rows/count, pending/error state and message, search/channel/page values and setters, and derived totalPages.
 */
export function useManagerCommunicationsCampaignsLogic() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get('page'));
  const currentPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, 10000) : 1;
  const historySearch = searchParams.get('search') ?? '';
  const requestedChannel = searchParams.get('channel') ?? 'all';
  const historyChannelFilter = ['all', 'email', 'sms', 'whatsapp', 'push'].includes(requestedChannel.toLowerCase()) ? requestedChannel.toLowerCase() : 'all';
  const debouncedSearch = useManagerInfrastructureDebounce(historySearch, 300);
  const updateURL = useCallback((changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => value === null ? params.delete(key) : params.set(key, value));
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);
  const setCurrentPage = useCallback((page: number) => updateURL({ page: page > 1 ? String(page) : null }), [updateURL]);
  const setHistorySearch = useCallback((search: string) => updateURL({ search: search || null, page: null }), [updateURL]);
  const setHistoryChannelFilter = useCallback((channel: string) => updateURL({ channel: channel === 'all' ? null : channel, page: null }), [updateURL]);
  const { campaigns, campaignsTotal, campaignsLoading, campaignsError, campaignsErrorValue, kpis } = useManagerCommunicationsCampaignsQueries(debouncedSearch, historyChannelFilter, currentPage);
  const reload = useCallback(() => queryClient.invalidateQueries({ queryKey: ManagerCommunicationsCampaignsQueryKeys.all }), [queryClient]);
  return {
    reload, kpis, paginatedCampaigns: campaigns, filteredCampaigns: campaigns,
    isPending: campaignsLoading, isError: campaignsError,
    errorMessage: campaignsErrorValue instanceof Error ? campaignsErrorValue.message : '',
    historySearch, setHistorySearch, historyChannelFilter, setHistoryChannelFilter,
    currentPage, setCurrentPage, totalPages: Math.max(1, Math.ceil(campaignsTotal / COMM_ITEMS_PER_PAGE)),
  };
}
