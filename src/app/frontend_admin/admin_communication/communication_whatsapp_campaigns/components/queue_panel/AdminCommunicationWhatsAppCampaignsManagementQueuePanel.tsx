"use client";
// RESPONSIBILITY: Renders AdminCampaignsQueuePanel for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
// DATA FLOW: feature data/state and user input → AdminCommunicationWhatsAppCampaignsManagementQueuePanel → accessible UI/events routed to owning hooks (admin_communication/communication_whatsapp_campaigns/components/queue_panel/AdminCommunicationWhatsAppCampaignsManagementQueuePanel.tsx)

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink, Play, SkipForward } from 'lucide-react';
import type { AdminCampaignsQueuePanelProps, AdminCampaignsQueueStatus } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/types/AdminCommunicationWhatsAppCampaignsManagementTypes';
import { CAMPAIGN_QUEUE_STATUS_VALUES } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/constants/AdminCommunicationWhatsAppCampaignsManagementConstants';

/**
 * getAdminCampaignsStatusIcon is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getAdminCampaignsStatusIcon(status: AdminCampaignsQueueStatus) {
  if (status === CAMPAIGN_QUEUE_STATUS_VALUES.SENT) return <CheckCircle2 size={18} className="text-success" aria-hidden="true"  strokeWidth={2}/>;
  if (status === CAMPAIGN_QUEUE_STATUS_VALUES.OPENED) return <Clock size={18} className="text-warning" aria-hidden="true"  strokeWidth={2}/>;
  if (status === CAMPAIGN_QUEUE_STATUS_VALUES.SKIPPED) return <SkipForward size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>;
  return <Circle size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>;
}

/**
 * AdminCommunicationWhatsAppCampaignsManagementQueuePanel renders the admin campaigns queue panel UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminCommunicationWhatsAppCampaignsManagementQueuePanel: Renders AdminCampaignsQueuePanel for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
 * @dependencies Consumes AdminCampaignsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminCommunicationWhatsAppCampaignsManagementQueuePanel({ queue, onOpen, onMarkSent, onSkip }: AdminCampaignsQueuePanelProps) {
  const t = useTranslations();

  const [openErrorIds, setOpenErrorIds] = useState<string[]>([]);
  const queueIdentity = queue.map((item) => item.recipient.id).join('|');

  useEffect(() => {
    const validIds = new Set(queue.map((item) => item.recipient.id));
    setOpenErrorIds((current) => current.filter((id) => validIds.has(id)));
  }, [queueIdentity]);

  const handleOpen = (index: number): boolean => {
    const item = queue[index];
    if (!item) return false;
    const opened = onOpen(index);
    setOpenErrorIds((current) => opened ? current.filter((failedId) => failedId !== item.recipient.id) : current.includes(item.recipient.id) ? current : [...current, item.recipient.id]);
    return opened;
  };

  const handleOpenAll = () => {
    // window.open must remain within the user gesture; nothing is sent automatically.
    queue.forEach((item, index) => {
      if (item.status === CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED) handleOpen(index);
    });
  };

  return (
    <section className="rounded-xl border border-border bg-card p-5" aria-labelledby="campaign-queue-heading">
      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 id="campaign-queue-heading" className="text-sm font-semibold text-primary">{t('campaigns.admin_campaigns_queue_panel.text_f076d0104b')}</h2>
          <p className="mt-1 text-xs text-secondary">{queue.filter((item) => item.status === CAMPAIGN_QUEUE_STATUS_VALUES.SENT).length} / {queue.length} {t('campaigns.admin_campaigns_queue_panel.text_27e7700fda')}</p>
        </div>
        {queue.length > 0 && (
          <button
            type="button"
            onClick={handleOpenAll}
            disabled={queue.every((item) => item.status !== CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED)}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary motion-safe:transition-colors motion-safe:duration-base hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
           data-testid="admin_campaigns-admin_campaigns-queue-panel-click">
            <Play size={18} aria-hidden="true"  strokeWidth={2}/>
            {t('campaigns.admin_campaigns_queue_panel.auto_openAllChats')}
          </button>
        )}
      </div>
      <p className="mb-3 text-xs text-secondary">{t('campaigns.admin_campaigns_queue_panel.sendBehaviorNotice')}</p>
      <div className="max-h-96 space-y-2 overflow-y-auto pr-2">
        {queue.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-input p-10 text-center">
            <p className="text-sm font-medium text-primary">{t('campaigns.admin_campaigns_queue_panel.text_13f89e125e')}</p>
            <p className="mt-1 text-xs text-secondary">{t('campaigns.admin_campaigns_queue_panel.text_5edb1f138a')}</p>
          </div>
        ) : (
          queue.map((item, index) => (
            <div key={item.recipient.id} className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-input p-3 motion-safe:transition-colors motion-safe:duration-base hover:bg-card">
              <div className="flex min-w-0 items-center gap-3">
                {getAdminCampaignsStatusIcon(item.status)}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-primary">{item.recipient.name}</p>
                  <p className="truncate text-xs text-secondary">{item.recipient.branchName}</p>
                  <p className="text-xs text-secondary" data-testid={`admin_campaigns-queue-status-${item.recipient.id}`}>{t(`campaigns.admin_campaigns_queue_panel.status_${item.status.toLowerCase()}`)}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {item.status === CAMPAIGN_QUEUE_STATUS_VALUES.OPENED && (
                  <>
                    <button type="button" onClick={() => onMarkSent(index)} className="rounded bg-success-bg px-3 py-1.5 text-xs font-medium text-success motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_campaigns-admin_campaigns-queue-panel-click-2-map70-${index}-1`}>{t('campaigns.admin_campaigns_queue_panel.text_0af2f3edcb')}</button>
                    <button type="button" onClick={() => onSkip(index)} className="rounded bg-input px-3 py-1.5 text-xs font-medium text-secondary motion-safe:transition-colors hover:bg-surface-highlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_campaigns-admin_campaigns-queue-panel-click-3-map70-${index}-2`}>{t('campaigns.admin_campaigns_queue_panel.text_3da474537a')}</button>
                  </>
                )}
                {item.status === CAMPAIGN_QUEUE_STATUS_VALUES.QUEUED && (
                  <button type="button" onClick={() => handleOpen(index)} className="flex items-center gap-1.5 rounded border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary motion-safe:transition-colors hover:border-focus focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95" data-testid={`admin_campaigns-admin_campaigns-queue-panel-click-4-map70-${index}-3`}>
                    <ExternalLink size={18} aria-hidden="true"  strokeWidth={2}/>{t('campaigns.admin_campaigns_queue_panel.text_cf9b77061f')}</button>
                )}
                
              </div>
              {openErrorIds.includes(item.recipient.id) && <p id={`campaign-open-error-${item.recipient.id}`} role="status" className="mt-2 basis-full text-xs text-danger-text" data-testid="campaigns-management-campaigns-management-queue-panel-status-region">{t('campaigns.admin_campaigns_queue_panel.text_openFailed')}</p>}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
