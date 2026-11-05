// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Status Field using its declared props and feature-local hooks.
'use client';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_BROADCAST_STATUS_OPTIONS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';

import type { SuperadminCommunicationBroadcastsStatusFieldProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_modal_field.types';


/**
 * @description Renders the Superadmin broadcasts status field interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsStatusField({ control, errors }: SuperadminCommunicationBroadcastsStatusFieldProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  return <div className="flex flex-col gap-1.5 col-span-2">
    <label id="superadmin-broadcast-status-label" className="text-sm font-bold text-secondary">{t('ui.status_ec53a8c4')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
    <div role="group" aria-labelledby="superadmin-broadcast-status-label"><Controller name="status" control={control} render={({ field }) => <SearchableDropdown value={field.value || ''} onChange={field.onChange} options={SUPERADMIN_BROADCAST_STATUS_OPTIONS.map((option) => ({ label: t(option.labelKey), value: option.value }))} data-testid="superadmin_communication_broadcasts-broadcast-modal-status-dropdown"/>}/></div>
    {errors.status && <span className="text-xs text-danger">{t('ui.status_validation_error')}</span>}
  </div>;
}
