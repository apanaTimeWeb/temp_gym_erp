// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationBroadcastsTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Send, Edit2, Trash2 } from 'lucide-react';
import { useLocale as useFormatterLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import SuperadminCommunicationBroadcastsBroadcastStatusBadge from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_broadcast_status_badge/SuperadminCommunicationBroadcastsCampaignsBroadcastStatusBadge';
import SuperadminCommunicationBroadcastsEmptyState from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_empty_state/SuperadminCommunicationBroadcastsCampaignsEmptyState';
import { SUPERADMIN_BROADCAST_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';
import { formatDateTime } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/utils/SuperadminCommunicationBroadcastsCampaignsPresentationFormatters';

import type { SuperadminCommunicationBroadcastsTableProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';

/**
 * RESPONSIBILITY: React component SuperadminCommunicationBroadcastsTable owned by the superadmin_communication_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useConfirm, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/components/ui/Feedback/ConfirmProvider, @/lib/formatters, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_broadcast_status_badge/SuperadminCommunicationBroadcastsCampaignsBroadcastStatusBadge, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/components/broadcasts_campaigns_empty_state/SuperadminCommunicationBroadcastsCampaignsEmptyState, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants, @/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls.


/**
 * @description Renders the Broadcasts data table shell (header + rows). Delegates row rendering to BroadcastsTableRow. No API calls.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCommunicationBroadcastsCampaignsTable({ broadcasts, onSend, onEdit, onDelete, onCreateClick }: SuperadminCommunicationBroadcastsTableProps) {
 const formatterLocale = useFormatterLocale();

  const t = useTranslations('superadmin_communication_broadcasts');
    const { confirm } = useConfirm();
    return (<div className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-start border-collapse">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.title_b78a3223')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.audience_ef1e6887')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_ec53a8c4')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.delivery_rate_11895316')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.scheduled_sent_date_d715318e')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-end">{t('ui.actions_06df3300')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {broadcasts.length === 0 ? (<tr>
                <td colSpan={6}><SuperadminCommunicationBroadcastsEmptyState onCreateClick={onCreateClick}/></td>
              </tr>) : (broadcasts.map((bc) => (<tr key={bc.id} className="hover:bg-primary-subtle motion-safe:transition-colors group" data-testid={`superadmin-broadcast-row-${bc.id}`}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <button type="button" className="text-start text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11" onClick={() => onEdit(bc)} aria-label={t('ui.open_broadcast_aria', { title: bc.title })}>{bc.title}</button>
                      <span className="text-xs text-secondary truncate max-w-xs">{bc.content}</span>
                    </div>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary border border-border">
                    {bc.targetGymIds && bc.targetGymIds.length > 0 ? t('ui.gym_count_repair', { count: bc.targetGymIds.length }) : t('ui.all_gyms_repair')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <SuperadminCommunicationBroadcastsBroadcastStatusBadge status={bc.status}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {bc.status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT && bc.totalRecipients ? (<div>
                      <span className="text-success font-semibold">
                        {bc.deliveredCount ?? 0}{t('ui.text_6666cd76')}{bc.totalRecipients}
                      </span>
                      <span className="ms-1 text-secondary text-xs">
                        {t('ui.text_84c40473')}{Math.round(((bc.deliveredCount ?? 0) / bc.totalRecipients) * 100)}{t('ui.text_16379325')}</span>
                    </div>) : (<span className="text-disabled">{t('ui.text_d5fd8e6f')}</span>)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                  {(() => { if (bc.status === SUPERADMIN_BROADCAST_STATUS_CODES.SCHEDULED) { if (bc.scheduledDate) { return (formatDateTime(bc.scheduledDate, formatterLocale)); } return ('–'); } return (null); })()}
                  {(() => { if (bc.status === SUPERADMIN_BROADCAST_STATUS_CODES.SENT) { if (bc.sentDate) { return (formatDateTime(bc.sentDate, formatterLocale)); } return ('–'); } return (null); })()}
                  {bc.status === SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT ? '–' : null}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-end">
                  <div className="flex items-center justify-end gap-2">
                    {bc.status === SUPERADMIN_BROADCAST_STATUS_CODES.DRAFT && (<button type="button" onClick={(e) => { e.stopPropagation(); onSend(bc.id); }} className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" title={t('ui.send_now_db3c809c')} aria-label={t('ui.send_broadcast_aria', { title: bc.title })} data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-table-broadcasts-table-send-now">
                        <Send size={18} strokeWidth={2}/>
                      </button>)}
                    <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(bc); }} className="p-1.5 text-secondary hover:text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" title={t('ui.edit_broadcast_4a9ebd8b')} aria-label={t('ui.edit_broadcast_aria', { title: bc.title })} data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-table-broadcasts-table-edit-broadcast">
                      <Edit2 size={18} strokeWidth={2}/>
                    </button>
                    <button type="button" onClick={async (e) => {
                e.stopPropagation();
                const ok = await confirm({
                    title: t('ui.confirm_delete_broadcast_title_repair'),
                    message: t('ui.confirm_delete_broadcast_message_repair', { title: bc.title }),
                    type: 'danger',
                    confirmText: t('ui.delete_action_repair')
                });
                if (ok) {
                    onDelete(bc.id);
                }
            }} className="p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" title={t('ui.delete_broadcast_089acec5')} aria-label={t('ui.delete_broadcast_aria', { title: bc.title })} data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-table-broadcasts-table-delete-broadcast">
                      <Trash2 size={18} strokeWidth={2}/>
                    </button>
                  </div>
                </td>
              </tr>)))}
          </tbody>
        </table>
      </div>
    </div>);
}
