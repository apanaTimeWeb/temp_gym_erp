// DATA FLOW: Selected segment → recipient query → Compose-owned recipient UI.
'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_compose/api/manager_communications_communications_compose.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_compose/api/manager_communications_communications_compose.query_keys';
import type { CommSegment } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';

/**
 * @description Loads recipients for the selected saved segment and exposes a stable empty-array fallback to the compose UI.
 * @dependencies Uses the compose feature API and its segment query-key registry through TanStack Query.
 * @edge-case The query is disabled for the `custom` segment because custom recipients are supplied by the compose flow; fetching state remains distinct from initial pending state.
 * @param selectedSegment Segment whose saved recipient list should be loaded.
 * @returns The resolved segment recipients and the query's fetching indicator.
 * @cacheKey ManagerCommunicationsCampaignsQueryKeys.segment(selectedSegment).
 */
export function useManagerCommunicationsCampaignsQueries(selectedSegment: CommSegment) {
  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ManagerCommunicationsCampaignsQueryKeys.segment(selectedSegment),
    queryFn: () => ManagerCommunicationsCampaignsApi.fetchSegmentRecipients(selectedSegment),
    enabled: selectedSegment !== 'custom',
    staleTime: 60_000,
  });
  return { segmentRecipients: data?.data ?? [], loadingRecipients: isFetching, recipientsError: isError, recipientsErrorValue: error, retryRecipients: refetch };
}
