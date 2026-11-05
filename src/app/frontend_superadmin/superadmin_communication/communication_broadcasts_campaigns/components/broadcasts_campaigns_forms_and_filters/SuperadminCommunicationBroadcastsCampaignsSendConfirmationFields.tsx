// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Send Confirmation Fields using its declared props and feature-local hooks.
'use client';

import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminCommunicationBroadcastsSendConfirmationFieldsProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_modal_field.types';


/**
 * @description Renders the Superadmin broadcasts send confirmation fields interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsSendConfirmationFields({ recipientCount, isRecipientCountLoading, recipientCountError, onRetryRecipientCount, targetGymCount, phrase, onPhraseChange }: SuperadminCommunicationBroadcastsSendConfirmationFieldsProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  return <section className="space-y-3" aria-labelledby="superadmin-broadcast-send-warning-title">
    <div className="bg-primary-subtle border border-border rounded-lg p-4 flex flex-wrap items-start gap-3">
      <Users size={18} className="text-primary shrink-0" aria-hidden="true"/>
      <div className="min-w-0 flex-1"><p className="text-sm text-primary">{t('ui.active_recipient_count_reference')} <strong>{t('ui.recipient_count_display', { count: recipientCount })}</strong>{t('ui.text_5058f1af')}</p>
        {(() => { if (isRecipientCountLoading) { return (<p className="text-xs text-secondary">{t('ui.loading_recipient_count')}</p>); } if (recipientCountError) { return (<p role="alert" className="text-xs text-danger">{t('ui.recipient_count_failed')} <button type="button" onClick={onRetryRecipientCount} className="min-h-11 px-2 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></p>); } return (null); })()}
      </div>
    </div>
    <div className="bg-warning-bg border border-border rounded-lg p-4">
      <h3 id="superadmin-broadcast-send-warning-title" className="text-sm text-warning font-medium">{t('ui.you_are_about_to_send_this_broadcast_immedia_6b535125')}<strong>{targetGymCount ? t('ui.target_gyms_count', { count: targetGymCount }) : t('ui.all_gyms_repair')}</strong>{t('ui.this_action_cannot_be_undone_09403ebb')}</h3>
      <label htmlFor="superadmin-broadcast-confirm-phrase" className="mt-3 block text-sm font-semibold text-primary">{t('ui.type_send_to_confirm')}</label>
      <input id="superadmin-broadcast-confirm-phrase" value={phrase} onChange={(event) => onPhraseChange(event.target.value)} autoComplete="off" aria-describedby="superadmin-broadcast-confirm-help" aria-invalid={phrase.length > 0 && phrase !== 'SEND'} className="mt-2 min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_communication_broadcasts-send-confirm-phrase"/>
      <p id="superadmin-broadcast-confirm-help" className="mt-1 text-xs text-secondary">{t('ui.send_confirmation_help')}</p>
    </div>
  </section>;
}
