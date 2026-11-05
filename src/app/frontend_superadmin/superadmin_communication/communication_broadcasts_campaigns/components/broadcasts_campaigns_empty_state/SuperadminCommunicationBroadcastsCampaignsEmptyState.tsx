// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationBroadcastsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminCommunicationBroadcastsEmptyState owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the empty state UI for the Broadcasts table when no broadcasts exist. Shows icon, message, and CTA to create first broadcast.
import { Megaphone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminCommunicationBroadcastsEmptyStateProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';


/**
 * @description Renders BroadcastsEmptyState within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsEmptyState({ onCreateClick }: SuperadminCommunicationBroadcastsEmptyStateProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
    return (<div className="flex flex-col items-center justify-center py-16 text-center" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-empty-state-broadcasts-empty-state-empty">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4" data-testid="superadmin_communication_broadcasts-broadcastsemptystate-state">
        <Megaphone size={18} className="text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">{t('ui.no_broadcasts_yet_2b360f65')}</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">{t('ui.create_your_first_announcement_to_push_notif_d2b9dd7c')}</p>
      <button type="button" onClick={onCreateClick} className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-empty-state-state-create-first-broadcast">
        {t('ui.create_first_broadcast_7952bbb6')}</button>
    </div>);
}
