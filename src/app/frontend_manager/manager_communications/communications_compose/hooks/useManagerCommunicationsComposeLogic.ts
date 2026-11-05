// DATA FLOW: Compose form state → recipient query + send mutation → Compose-owned UI.
'use client';
import { useCallback } from 'react';
import { COMM_MESSAGE_TEMPLATES, COMM_SEGMENT_OPTIONS } from '@/app/frontend_manager/manager_communications/communications_compose/constants/manager_communications_campaigns_shared.constants';
import { useManagerCommunicationsCampaignsMutations } from '@/app/frontend_manager/manager_communications/communications_compose/hooks/useManagerCommunicationsComposeMutations';
import { useManagerCommunicationsCampaignsQueries } from '@/app/frontend_manager/manager_communications/communications_compose/hooks/useManagerCommunicationsComposeQueries';
import { useManagerCommunicationsCampaignsStore } from '@/app/frontend_manager/manager_communications/communications_compose/state/useManagerCommunicationsComposeStore';
import type { CommFormValues, CommSegment } from '@/app/frontend_manager/manager_communications/communications_compose/types/manager_communications_communications_compose.types';

/**
 * @description Coordinates the compose screen's selected segment/channel, recipient lookup, segment template defaults, and send action.
 * @dependencies Uses the compose Zustand store, useManagerCommunicationsCampaignsQueries, useManagerCommunicationsCampaignsMutations, and the feature's segment/template constants.
 * @edge-case A missing segment label falls back to the selected segment value; an absent form subject is normalized to an empty string; recipientCount is taken from the current recipient query result at send time.
 * @returns Selected segment/channel and channel setter, template defaults, segment-change handler, recipients/loading state, send handler, and mutation pending flag.
 */
export function useManagerCommunicationsCampaignsLogic() {
  const store = useManagerCommunicationsCampaignsStore();
  const { segmentRecipients, loadingRecipients } = useManagerCommunicationsCampaignsQueries(store.selectedSegment);
  const { sendMutation, sendCampaign } = useManagerCommunicationsCampaignsMutations();
  const handleSegmentChange = useCallback((segment: CommSegment) => store.setSelectedSegment(segment), [store]);
  const handleSend = useCallback((form: CommFormValues) => {
    const segmentLabel = COMM_SEGMENT_OPTIONS.find((option) => option.value === store.selectedSegment)?.label ?? store.selectedSegment;
    sendCampaign({ ...form, segment: store.selectedSegment, subject: form.subject ?? '', recipientCount: segmentRecipients.length, segmentLabel });
  }, [segmentRecipients.length, sendCampaign, store.selectedSegment]);
  return {
    selectedSegment: store.selectedSegment,
    selectedChannel: store.selectedChannel,
    setSelectedChannel: store.setSelectedChannel,
    templateDefaults: COMM_MESSAGE_TEMPLATES[store.selectedSegment],
    handleSegmentChange, segmentRecipients, loadingRecipients, handleSend,
    sending: sendMutation.isPending,
  };
}
