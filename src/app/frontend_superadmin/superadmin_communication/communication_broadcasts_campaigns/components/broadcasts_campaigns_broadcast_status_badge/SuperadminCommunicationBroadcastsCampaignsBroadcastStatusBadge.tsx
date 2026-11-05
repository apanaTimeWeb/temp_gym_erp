// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationBroadcastsBroadcastStatusBadge within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminCommunicationBroadcastsBroadcastStatusBadge owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useTranslations.
 * MODULE DEPENDENCIES: next-intl, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the status badge pill for a single broadcast. Purely presentational — maps BroadcastStatus to design system colors.
import { useTranslations } from 'next-intl';

import { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';

import type { SuperadminBroadcastStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';


/**
 * @description Renders BroadcastsBroadcastStatusBadge within the owning Superadmin feature module.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsBroadcastStatusBadge({ status }: SuperadminBroadcastStatusBadgeProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
    switch (status) {
        case SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SENT:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success" data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-broadcast-status-badge-broadcast-status-badge-status">{t('ui.sent_145d6301')}</span>;
        case SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SCHEDULED:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning" data-testid="superadmin_communication_broadcasts-broadcastsbroadcaststatusbadge-state">{t('ui.scheduled_1ebf150f')}</span>;
        case SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.DRAFT:
        default:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">{t('ui.draft_52101904')}</span>;
    }
}
