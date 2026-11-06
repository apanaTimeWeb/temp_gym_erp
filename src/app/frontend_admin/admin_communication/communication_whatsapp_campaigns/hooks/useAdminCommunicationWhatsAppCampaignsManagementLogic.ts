"use client";
// RESPONSIBILITY: Owns Campaigns UI state, query orchestration, queue construction, and external WhatsApp-open lifecycle.
// DATA FLOW: selected audience/template → TanStack Query → feature-owned queue state → WhatsApp action → visible queue status.

import { CAMPAIGN_QUEUE_STATUS_VALUES } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/constants/AdminCommunicationWhatsAppCampaignsManagementConstants';
import { ADMIN_CAMPAIGNS_QUERY_KEYS } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/constants/AdminCommunicationWhatsAppCampaignsManagementQueryKeys';
import { useCallback, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminCampaignsApi } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/api/admin_communication_whatsapp_campaigns_api';
import { buildAdminCampaignQueue, updateAdminCampaignQueueStatus } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementQueueUtils';
import { buildAdminWhatsAppLink } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/utils/AdminCommunicationWhatsAppCampaignsManagementWhatsAppUtils';
import type { AdminCampaignsQueueItem } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';
/** @description useAdminCampaignsLogic: Owns Campaigns UI state, query orchestration, queue construction, and external WhatsApp-open lifecycle. @dependencies Consumes AdminCampaignsQueryKeys, AdminCampaignsApi, AdminCampaignsQueueUtils, AdminCampaignsWhatsAppUtils, AdminCampaignsTypes. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminCampaignsLogic() {
  const [audienceId, setAudienceId] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [body, setBody] = useState('');
  const latestBodyRef = useRef('');
  const [queue, setQueue] = useState<AdminCampaignsQueueItem[]>([]);
  const [queueActionErrorKey, setQueueActionErrorKey] = useState<string | null>(null);

  const audiencesQuery = useQuery({
    queryKey: ADMIN_CAMPAIGNS_QUERY_KEYS.key('audiences'),
    queryFn: () => AdminCampaignsApi.fetchAudiences(),
  });
  const templatesQuery = useQuery({
    queryKey: ADMIN_CAMPAIGNS_QUERY_KEYS.key('templates'),
    queryFn: () => AdminCampaignsApi.fetchTemplates(),
  });
  const recipientsQuery = useQuery({
    queryKey: ADMIN_CAMPAIGNS_QUERY_KEYS.key('recipients', { audienceId }),
    queryFn: () => AdminCampaignsApi.fetchRecipients(audienceId),
    enabled: Boolean(audienceId),
  });

  const templatesRef = useRef(templatesQuery?.data?.data);
  if (templatesQuery?.data?.data) templatesRef.current = templatesQuery.data.data;
  const recipientsRef = useRef(recipientsQuery?.data?.data?.recipients);
  if (recipientsQuery?.data?.data?.recipients) recipientsRef.current = recipientsQuery.data.data.recipients;

  const selectAudience = useCallback((id: string) => {
    setAudienceId(id);
    setQueue([]);
    setQueueActionErrorKey(null);
  }, []);

  const selectTemplate = useCallback((id: string) => {
    setTemplateId(id);
    // A queue is a snapshot of the selected template/body; discard it when that source changes.
    setQueue([]);
    setQueueActionErrorKey(null);
    const templateList = templatesQuery?.data?.data ?? templatesRef.current;
    const template = templateList?.find((item) => item.id === id);
    const newBody = template?.body ?? '';
    latestBodyRef.current = newBody;
    setBody(newBody);
  }, [templatesQuery?.data?.data]);

  const changeBody = useCallback((value: string) => {
    latestBodyRef.current = value;
    setBody(value);
    setQueue([]);
    setQueueActionErrorKey(null);
  }, []);

  const createQueue = useCallback(() => {
    const recipients = recipientsQuery?.data?.data?.recipients ?? recipientsRef.current ?? [];
    const activeBody = latestBodyRef.current || body;
    if (!audienceId || !activeBody.trim() || recipients.length === 0) return false;
    setQueue(buildAdminCampaignQueue(activeBody, recipients));
    return true;
  }, [audienceId, body, recipientsQuery?.data?.data?.recipients]);

  const openQueueItem = useCallback((index: number): boolean => {
    const item = queue[index];
    if (!item || item.status !== CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED) { setQueueActionErrorKey('campaigns.AdminRepair.itemUnavailable'); return false; }
    const link = buildAdminWhatsAppLink(item.recipient.phone, item.message);
    if (!link) { setQueueActionErrorKey('campaigns.AdminRepair.invalidRecipientPhone'); return false; }
    let destination: URL;
    try { destination = new URL(link); }
    catch { setQueueActionErrorKey('campaigns.AdminRepair.openFailed'); return false; }
    if (destination.protocol !== 'https:' || destination.hostname !== 'wa.me') {
      setQueueActionErrorKey('campaigns.AdminRepair.openFailed'); return false;
    }

    // Keep window.open inside the user gesture. Browsers may throw instead of returning null.
    let openedWindow: Window | null = null;
    try { openedWindow = window.open('about:blank', '_blank'); }
    catch { setQueueActionErrorKey('campaigns.AdminRepair.popupBlocked'); return false; }
    if (!openedWindow) { setQueueActionErrorKey('campaigns.AdminRepair.popupBlocked'); return false; }
    try {
      openedWindow.opener = null;
      openedWindow.location.replace(destination.toString());
    } catch {
      try { openedWindow.close(); } catch { /* Browser denies cleanup; do not mark recipient opened. */ }
      setQueueActionErrorKey('campaigns.AdminRepair.openFailed');
      return false;
    }
    setQueue((current) => updateAdminCampaignQueueStatus(current, index, 'OPENED'));
    setQueueActionErrorKey(null);
    return true;
  }, [queue]);

  const setQueueStatus = useCallback((index: number, status: AdminCampaignsQueueItem['status']) => {
    setQueue((current) => updateAdminCampaignQueueStatus(current, index, status));
  }, []);

  return {
    audienceId, selectAudience, templateId, selectTemplate, body, setBody: changeBody, queue, queueActionErrorKey,
    audiences: audiencesQuery?.data?.data ?? [], audiencesStatus: audiencesQuery?.status, audiencesError: audiencesQuery?.error, refetchAudiences: audiencesQuery?.refetch,
    templates: templatesQuery?.data?.data ?? [], templatesStatus: templatesQuery?.status, templatesError: templatesQuery?.error, refetchTemplates: templatesQuery?.refetch,
    recipientsStatus: recipientsQuery?.status, recipientsError: recipientsQuery?.error, refetchRecipients: recipientsQuery?.refetch, recipientCount: recipientsQuery?.data?.data?.recipients?.length ?? 0,
    createQueue, openQueueItem, setQueueStatus,
  };
}
