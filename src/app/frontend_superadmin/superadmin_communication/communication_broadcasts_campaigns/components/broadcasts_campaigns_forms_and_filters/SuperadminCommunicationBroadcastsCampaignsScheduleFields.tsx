// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Schedule Fields using its declared props and feature-local hooks.
'use client';

import { useTranslations } from 'next-intl';
import type { SuperadminCommunicationBroadcastsScheduleFieldsProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_modal_field.types';

/**
 * @description Renders the Superadmin broadcasts schedule fields interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsScheduleFields({ date, time, hasError, errorMessage, timezoneHint, onDateChange, onTimeChange }: SuperadminCommunicationBroadcastsScheduleFieldsProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  return <fieldset className="flex flex-col gap-1.5">
    <legend className="text-sm font-bold text-secondary">{t('ui.scheduled_date_time_f8b67970')}<span className="text-danger">{t('ui.text_3389dae3')}</span></legend>
    {timezoneHint ? <p className="text-xs text-secondary">{timezoneHint}</p> : null}
    <div className="flex flex-col sm:flex-row gap-3">
      <label className="flex-1 text-xs text-secondary" htmlFor="bcast-date">{t('ui.scheduled_date')}<input id="bcast-date" type="date" aria-invalid={hasError} aria-describedby={hasError ? 'superadmin-broadcast-schedule-error' : undefined} value={date} onChange={(event) => onDateChange(event.target.value)} className="mt-1 w-full min-h-11 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_communication_broadcasts-scheduled-date"/></label>
      <label className="flex-1 text-xs text-secondary" htmlFor="bcast-time">{t('ui.scheduled_time')}<input id="bcast-time" type="time" aria-invalid={hasError} aria-describedby={hasError ? 'superadmin-broadcast-schedule-error' : undefined} value={time} onChange={(event) => onTimeChange(event.target.value)} className="mt-1 w-full min-h-11 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_communication_broadcasts-scheduled-time"/></label>
    </div>
    {hasError ? <p id="superadmin-broadcast-schedule-error" role="alert" className="text-xs text-danger">{errorMessage || t('ui.scheduled_date_validation_error')}</p> : null}
  </fieldset>;
}
