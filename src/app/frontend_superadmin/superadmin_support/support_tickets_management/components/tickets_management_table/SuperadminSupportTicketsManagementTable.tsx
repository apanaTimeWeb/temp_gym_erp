// RESPONSIBILITY: Renders/orchestrates SuperadminSupportTicketsTable within its owning Superadmin feature module; no direct backend implementation.
'use client';


import { ExternalLink, AlertOctagon, Eye, MessageSquare, UserCheck, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import CopyButton from '@/components/ui/CopyButton';

import SuperadminSupportTicketsEmptyState from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/components/tickets_management_empty_state/SuperadminSupportTicketsManagementEmptyState';
import { SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_ROUTES } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/config/superadmin_support_tickets_management.url_config';
import { SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES, PriorityColors, StatusColors } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';
import { formatDateTime } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/utils/SuperadminSupportTicketsManagementFormatters';
import { getSuperadminSupportTicketsSlaRemainingMs } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/utils/SuperadminSupportTicketsManagementSlaUtils';

import type { SuperadminSupportTicketsTableProps } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_table.types';
import type { SupportTicket } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';


// RESPONSIBILITY: Renders and composes SuperadminSupportTicketsTable for the owning feature module; business logic and API transport remain in module-owned hooks/services.


/**
 * @description Renders the data table for Support Tickets
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

export default function SuperadminSupportTicketsManagementTable({ tickets, onReply, onInspect, onClose, onAssign }: SuperadminSupportTicketsTableProps) {
  const t = useTranslations('superadmin_support_tickets');
    const router = useRouter();
    const getSlaStatus = (ticket: SupportTicket) => {
        if (!ticket.slaDeadline)
            return { label: t('ui.sla_no_sla'), color: 'text-secondary', icon: null };
        const diff = getSuperadminSupportTicketsSlaRemainingMs(ticket.slaDeadline);
        if (diff === null) return { label: t('ui.sla_unavailable'), color: 'text-secondary', icon: null };
        if (diff < 0)
            return { label: t('ui.sla_breached'), color: 'text-danger', icon: <AlertOctagon size={18} className="w-3"/> };
        if (diff < 12 * 60 * 60 * 1000)
            return { label: t('ui.sla_approaching'), color: 'text-warning', icon: <AlertOctagon size={18} className="w-3"/> };
        return { label: t('ui.sla_ok'), color: 'text-success', icon: <CheckCircle2 size={18}/> };
    };
    return (<div className="overflow-x-auto flex-1">
      <table className={`w-full text-start border-collapse min-w-max ${MOBILE_CARD_TABLE_CLASSES}`}>
        <thead>
            <tr className="bg-header border-b border-border text-sm" data-testid="superadmin_support_tickets-superadmin-tickets-table-tickets-table-action-1">
              <th className="p-4 font-semibold text-secondary">{t('ui.ticket_id_bfe2ba9')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.gym_4f5e8a8')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.subject_5f39e42')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.priority_292b027')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.status_b9a439d')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.response_time_22cd6ee')}</th>
              <th className="p-4 font-semibold text-secondary">{t('ui.last_updated_a6d2b1f')}</th>
              <th className="p-4 font-semibold text-secondary text-end">{t('ui.actions_67b65eb')}</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tickets.length === 0 ? (<tr data-testid="superadmin_support_tickets-superadmin-tickets-table-tickets-table-action-2">
              <td colSpan={8} data-mobile-label={t('ui.mobile_ticket_id')}><SuperadminSupportTicketsEmptyState /></td>
            </tr>) : (tickets.map((ticket, index) => {
            const sla = getSlaStatus(ticket);
            return (<tr key={ticket.id} tabIndex={0} aria-label={t('ui.a11y_open_ticket', { id: ticket.id })} data-testid={`superadmin_support_tickets-table-${ticket.id}-open`} className="hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary motion-safe:transition-colors cursor-pointer" onClick={() => onInspect(ticket.id)} onKeyDown={(event) => { if (event.target !== event.currentTarget) return; if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onInspect(ticket.id); } }}>
                <td className="p-4" data-mobile-label={t('ui.mobile_ticket_id')}>
                  <span className="flex items-center gap-1 text-sm font-mono font-medium text-primary">
                    <span>{ticket.id}</span>
                    <CopyButton value={ticket.id} label={`Copy ticket ID ${ticket.id}`} data-testid={`superadmin_support_tickets-tickets-table-copy-id-${ticket.id}`}/>
                  </span>
                </td>
                <td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_gym')}>
                  <button  type="button" onClick={(e) => {
                    e.stopPropagation();
                    router.push(`${SUPERADMIN_SUPPORT_TICKETS_MANAGEMENT_ROUTES.GYMS}?id=${ticket.tenantId}`);
                }} className="min-w-11 min-h-11 flex items-center gap-1 hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.view_gym_37e8508')} data-testid={`superadmin_support_tickets-table-view-${index}`}>
                    {ticket.tenantName} <ExternalLink size={18}/>
                  </button>
                </td>
                <td className="p-4 text-sm text-primary font-medium" data-mobile-label={t('ui.mobile_subject')}>{ticket.subject}</td>
                <td className="p-4 text-sm" data-mobile-label={t('ui.mobile_priority')}>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${PriorityColors[ticket.priority]}`}>
                    {t(`ui.priority_${ticket.priority.toLowerCase()}`)}
                  </span>
                </td>
                <td className="p-4 text-sm font-bold" data-mobile-label={t('ui.mobile_status')}>
                  <span data-testid={`superadmin_support_tickets-status-${ticket.id}`} className={StatusColors[ticket.status]}>{t(`ui.status_${ticket.status.toLowerCase()}`)}</span>
                </td>
                <td className="p-4 text-sm" data-mobile-label={t('ui.mobile_response_time')}>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${sla.color}`}>
                    {sla.icon} {sla.label}
                  </span>
                </td>
                <td className="p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_last_updated')}>{formatDateTime(ticket.lastUpdated)}</td>
                <td className="p-4 text-sm text-end" data-mobile-label={t('ui.mobile_actions')}>
                  <div className="flex items-center justify-end gap-1">
                      <button type="button" onClick={(e) => { e.stopPropagation(); onInspect(ticket.id); }} className="min-w-11 min-h-11 p-2 text-secondary hover:bg-surface-hover rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" aria-label={t('ui.inspect_ticket', { id: ticket.id })}><Eye size={16} aria-hidden="true" /></button>
                      <button type="button" onClick={(e) => { e.stopPropagation(); onReply(ticket.id); }} className="min-w-11 min-h-11 p-2 text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" title={t('ui.reply_to_ticket_d555f35')} aria-label={t('ui.a11y_reply_ticket', { id: ticket.id })} data-testid={`superadmin_support_tickets-table-reply-${index}`}>
                      <MessageSquare size={18}/>
                    </button>
                    {onAssign && (<button  type="button" onClick={(e) => { e.stopPropagation(); onAssign(ticket.id); }} className="min-w-11 min-h-11 p-2 text-secondary hover:bg-surface-hover hover:text-primary rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.assign_to_4306f8c')} data-testid={`superadmin_support_tickets-table-assign-${index}`}>
                        <UserCheck size={18} className="w-4"/>
                      </button>)}
                    {onClose && ticket.status !== SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.RESOLVED && ticket.status !== SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED && (<button  type="button" onClick={(e) => { e.stopPropagation(); onClose(ticket.id); }} className="min-w-11 min-h-11 p-2 text-success hover:bg-success-bg rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" title={t('ui.close_ticket_94a4dc0')} data-testid={`superadmin_support_tickets-table-close-${index}`}>
                        <CheckCircle2 size={18}/>
                      </button>)}
                  </div>
                </td>
              </tr>);
        }))}
        </tbody>
      </table>
    </div>);
}

