// DATA FLOW: Automations API → automation-list query → automation editor cards.
'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_automations/api/manager_communications_communications_automations.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_automations/api/manager_communications_communications_automations.query_keys';

/**
 * @description Loads the automation records used by the communications automation cards and editor.
 * @dependencies Uses the automation feature API and canonical automation query-key registry through TanStack Query.
 * @edge-case Returns an empty array before data is available while preserving the query's initial-pending indicator.
 * @returns Automation records and their initial loading state.
 * @cacheKey ManagerCommunicationsCampaignsQueryKeys.automations().
 */
export function useManagerCommunicationsCampaignsQueries() {
  const query = useQuery({
    queryKey: ManagerCommunicationsCampaignsQueryKeys.automations(),
    queryFn: ManagerCommunicationsCampaignsApi.fetchAutomations,
    staleTime: 300_000,
  });
  return { automations: query.data?.data ?? [], automationsLoading: query.isPending, automationsError: query.isError, automationsErrorValue: query.error, retryAutomations: query.refetch };
}
