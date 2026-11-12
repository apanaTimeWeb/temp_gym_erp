// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationBroadcastsBroadcastQueueModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminCommunicationBroadcastsBroadcastQueueModal owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: feature-owned broadcast queue state hook
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsDialogA11y, @/lib/formatters, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastDelivery, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_queue_modal.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Keep delivery lifecycle in the adjacent feature-owned queue hook; this component is presentation-only.
 */
// RESPONSIBILITY: Renders the Superadmin broadcast delivery queue. Delivery state comes from the feature API/MSW contract; this component contains no delivery simulation or notification persistence.


import { X, CheckCircle, Phone, Bell, Loader2, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { maskSensitiveData } from '@/lib/formatters';

import { SUPERADMIN_BROADCAST_QUEUE_STATE_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue';
import { useSuperadminCommunicationBroadcastsCampaignsDialogA11y } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/hooks/useSuperadminCommunicationBroadcastsCampaignsDialogA11y';

import type { SuperadminBroadcastRecipient, SuperadminCommunicationBroadcastsBroadcastQueueModalProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_queue_modal.types';

/**
 * @description Owns the SuperadminCommunicationBroadcastsBroadcastQueueModal responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsBroadcastQueueModal({ isOpen, onClose, recipients, broadcastId, broadcastTitle, onComplete }: SuperadminCommunicationBroadcastsBroadcastQueueModalProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  const dialogRef = useSuperadminCommunicationBroadcastsCampaignsDialogA11y(isOpen, onClose);
  const { states, lastError, isReady, retryRecipient } = useSuperadminCommunicationBroadcastsCampaignsBroadcastQueue({ isOpen, recipients, broadcastId, onComplete });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto p-4 bg-overlay backdrop-blur-sm" role="dialog" aria-modal="true" ref={dialogRef} aria-labelledby="superadmin-broadcast-queue-title" data-testid="superadmin_communication_broadcasts-broadcast-queue-modal-dialog">
      <div className="bg-overlay rounded-xl shadow-dialog w-full max-w-lg my-auto max-h-dialog-desktop border border-border flex flex-col overflow-hidden">
        <div className="shrink-0 px-6 py-4 bg-primary-subtle flex items-center justify-between">
          <div className="min-w-0">
            <h2 id="superadmin-broadcast-queue-title" className="truncate text-on-primary font-bold text-lg">{t('ui.automated_broadcast_ff617205')}</h2>
            <p className="text-on-primary text-xs">{t('ui.processing_delivery_for_e271e10b')}{recipients.length} {t('ui.selected_tenants_49a95cf7')}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('ui.close_broadcast_delivery_queue_c9578fd1')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-on-primary hover:text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-queue-modal-close-broadcast-delivery-queue">
            <X size={18} strokeWidth={2}/>
          </button>
        </div>

        <div className="min-h-0 flex-1 p-6 overflow-y-auto space-y-3 custom-scrollbar" aria-live="polite" data-testid="superadmin_communication_broadcasts-broadcast-queue-list">
          <p className="text-sm text-secondary mb-4">{broadcastTitle}</p>
          {recipients.length === 0 ? <div role="alert" className="rounded-lg border border-danger bg-danger-bg p-4 text-sm text-danger" data-testid="superadmin_communication_broadcasts-queue-empty-error">{t('ui.no_recipients_to_deliver')}</div> : null}
          {recipients.map((recipient) => {
            const state = states[recipient.id] ?? SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING;
            const isProcessing = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PROCESSING;
            const isDone = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.DELIVERED;
            const isFailed = state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.FAILED;
            return (
              <div key={recipient.id} className={`p-4 rounded-lg border flex items-center justify-between motion-safe:transition-all motion-safe:duration-base ${(() => { if (isProcessing) { return ('border-focus bg-primary-subtle'); } if (isDone) { return ('border-border bg-success-bg'); } if (isFailed) { return ('border-border bg-danger-bg'); } return ('border-border bg-input'); })()}`}>
                <div className="min-w-0">
                  <p className="truncate font-bold text-primary text-sm">{recipient.name}</p>
                  <p className="truncate text-xs text-secondary mt-0.5 font-mono">{maskSensitiveData(recipient.phone, 'phone')}</p>
                  {isFailed ? <p className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_communication_broadcasts-broadcast-queue-error">{lastError || t('ui.action_failed_retry')}</p> : null}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className={`flex flex-col items-center gap-1 ${(() => { if (isDone || isProcessing) { return ('text-success'); } if (isFailed) { return ('text-danger'); } return ('text-disabled'); })()}`} aria-label={t('ui.whatsapp_delivery_channel_8fa3581b')}>
                    <Phone size={18} strokeWidth={2}/>
                    <span className="text-xs font-bold">{t('ui.wa_4306a046')}</span>
                  </div>
                  <div className={`flex flex-col items-center gap-1 ${isDone || isProcessing ? 'text-primary' : 'text-disabled'}`} aria-label={t('ui.in_app_notification_channel_d29e6979')}>
                    <Bell size={18} strokeWidth={2}/>
                    <span className="text-xs font-bold">{t('ui.app_0bdbb2c3')}</span>
                  </div>
                  <div className="ms-3 w-20 min-h-11 flex items-center justify-end gap-2">
                    {isProcessing ? <Loader2 size={18} strokeWidth={2} className="text-primary motion-safe:animate-spin" aria-label={t('ui.delivering_eb32871c')}/> : null}
                    {isDone ? <CheckCircle size={18} strokeWidth={2} className="text-success" aria-label={t('ui.delivered_67edd3b9')}/> : null}
                    {isFailed ? (
                      <button type="button" onClick={() => retryRecipient(recipient.id)} className="inline-flex items-center justify-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-danger hover:bg-danger-bg motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11" aria-label={t('ui.retry_delivery_aria', { name: recipient.name })} data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-queue-modal-broadcast-queue-modal-retry">
                        <RotateCcw size={18} strokeWidth={2}/>{t('ui.retry_6327b4e5')}</button>
                    ) : null}
                    {state === SUPERADMIN_BROADCAST_QUEUE_STATE_CODES.PENDING && !isReady ? <span className="w-2 h-2 rounded-full bg-surface-highlight" aria-hidden="true" /> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


