// DATA FLOW: Automation query + update mutation → automation editor UI.
'use client';
import { useManagerCommunicationsCampaignsMutations } from '@/app/frontend_manager/manager_communications/communications_automations/hooks/useManagerCommunicationsAutomationsMutations';
import { useManagerCommunicationsCampaignsQueries } from '@/app/frontend_manager/manager_communications/communications_automations/hooks/useManagerCommunicationsAutomationsQueries';

/**
 * @description Composes the automation list query and update mutation into the view model consumed by automation editor components.
 * @dependencies Delegates reads to useManagerCommunicationsCampaignsQueries and writes to useManagerCommunicationsCampaignsMutations.
 * @edge-case Keeps query loading and mutation pending state separate so refreshing the list does not masquerade as an update submission.
 * @returns Automation records, list loading state, the update command, and update-pending state.
 */
export function useManagerCommunicationsCampaignsLogic() {
  const { automations, automationsLoading } = useManagerCommunicationsCampaignsQueries();
  const { automationMutation, updateAutomation } = useManagerCommunicationsCampaignsMutations();
  return { automations, automationsLoading, updateAutomation, isUpdatingAutomation: automationMutation.isPending };
}
