// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Message Fields using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import type { SuperadminCommunicationBroadcastsMessageFieldsProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_modal_field.types';

/**
 * @description Renders the Superadmin broadcasts message fields interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsMessageFields({ register, errors }: SuperadminCommunicationBroadcastsMessageFieldsProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  return <>
    <div className="flex flex-col gap-1.5">
      <label htmlFor="superadmin-broadcast-title" className="text-sm font-bold text-secondary">{t('ui.broadcast_title_4c0bf8cd')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
      <input id="superadmin-broadcast-title" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? 'superadmin-broadcast-title-error' : undefined} {...register('title')} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" placeholder={t('ui.e_g_scheduled_maintenance_3d4859c4')} data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-input"/>
      {errors.title && <span id="superadmin-broadcast-title-error" className="text-xs text-danger">{t('ui.title_validation_error')}</span>}
    </div>
    <div className="flex flex-col gap-1.5">
      <label htmlFor="superadmin-broadcast-content" className="text-sm font-bold text-secondary">{t('ui.message_content_ceb7e7c3')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
      <textarea id="superadmin-broadcast-content" aria-invalid={Boolean(errors.content)} aria-describedby={errors.content ? 'superadmin-broadcast-content-error' : undefined} {...register('content')} rows={4} className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus:border-focus motion-safe:transition-colors resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" placeholder={t('ui.write_your_announcement_here_90bb9df2')} data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-modal-superadmin-broadcast-modal-textarea"/>
      {errors.content && <span id="superadmin-broadcast-content-error" className="text-xs text-danger">{t('ui.content_validation_error')}</span>}
    </div>
  </>;
}
