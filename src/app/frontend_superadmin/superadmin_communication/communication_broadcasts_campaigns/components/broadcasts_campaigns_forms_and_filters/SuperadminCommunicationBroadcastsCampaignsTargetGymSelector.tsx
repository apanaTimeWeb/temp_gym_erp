// RESPONSIBILITY: Renders Superadmin Communication Broadcasts Campaigns Target Gym Selector using its declared props and feature-local hooks.
'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminCommunicationBroadcastsTargetGymSelectorProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns_broadcast_modal_field.types';


/**
 * @description Renders the Superadmin broadcasts target gym selector interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsTargetGymSelector({
  gyms, isPending, selectedGymIds, isAllGymsTarget, errorMessage, loadError, onRetry, onToggleAll, onToggleGym,
}: SuperadminCommunicationBroadcastsTargetGymSelectorProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  return <div className="flex flex-col gap-1.5 col-span-2" role="group" aria-labelledby="superadmin-broadcast-target-gyms-label">
    <div className="flex items-center justify-between gap-3">
      <label id="superadmin-broadcast-target-gyms-label" className="text-sm font-bold text-secondary">{t('ui.select_target_gyms_711a5b59')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
      <button type="button" disabled={isPending || loadError || gyms.length === 0} onClick={onToggleAll} className="min-h-11 px-2 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_communication_broadcasts-broadcast-modal-select-all">{isAllGymsTarget ? t('ui.choose_specific_gyms') : t('ui.use_all_gyms')}</button>
    </div>
    <div className="bg-input border border-border rounded-xl max-h-40 overflow-y-auto custom-scrollbar p-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
      {isPending ? <div className="col-span-2 flex justify-center py-4 text-primary"><Loader2 size={18} className="motion-safe:animate-spin" aria-label={t('ui.loading_tenants')}/></div> : gyms.map((gym) => <label key={gym.id} className="min-h-11 flex items-center gap-2 cursor-pointer p-2 hover:bg-overlay rounded-lg motion-safe:transition-colors border border-transparent hover:border-border">
        <input type="checkbox" checked={isAllGymsTarget || selectedGymIds.includes(gym.id)} disabled={isAllGymsTarget || isPending || loadError} onChange={() => onToggleGym(gym.id)} className="w-4 h-4 rounded text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page accent-primary" data-testid="superadmin_communication_broadcasts-target-gym-checkbox"/>
        <span className="flex min-w-0 flex-col overflow-hidden"><span className="text-sm font-medium text-primary truncate">{gym.name}</span><span className="text-xs text-secondary truncate">{gym.ownerName}</span></span>
      </label>)}
    </div>
    <p className="text-xs text-secondary">{isAllGymsTarget ? t('ui.all_gyms_mode_help') : t('ui.specific_gyms_must_include_one')}</p>
    {(() => { if (loadError) { return (<div role="alert" className="text-xs text-danger">{t('ui.tenants_load_failed')} <button type="button" onClick={onRetry} className="min-h-11 px-2 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('ui.retry_6327b4e5')}</button></div>); } if (errorMessage) { return (<span className="text-xs text-danger">{errorMessage}</span>); } return (null); })()}
  </div>;
}
