// RESPONSIBILITY: Renders the Support Tickets list table with row click to open the conversation thread drawer.
'use client';
import { MessageSquare, ArrowRight, Tag } from 'lucide-react';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import type { SupportTicket } from '@/app/frontend_manager/manager_help_support/support_tickets/types/manager_support_tickets.types';
import { TICKET_PRIORITY_STYLES, TICKET_STATUS_STYLES } from '@/app/frontend_manager/manager_help_support/support_tickets/constants/manager_support_tickets.constants';

interface Props {
  tickets: SupportTicket[];
  onSelectTicket: (t: SupportTicket) => void;
}

const TABLE_HEADERS = ['Ticket # & Subject', 'Category', 'Priority', 'Status', 'Messages', 'Last Updated', 'Action'];

export default function ManagerSupportTicketsTable({ tickets, onSelectTicket }: Props) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden" data-testid="manager_support-table-container">
      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={TABLE_HEADERS}>
          <table className="w-full text-left border-collapse">
            <thead className="bg-primary-subtle border-b border-border">
              <tr>
                {TABLE_HEADERS.map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEADERS.length} className="py-12 text-center text-sm text-text-secondary">
                    No support tickets found matching the selected filters.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => {
                  const priStyle = TICKET_PRIORITY_STYLES[t.priority] || TICKET_PRIORITY_STYLES.LOW;
                  const statStyle = TICKET_STATUS_STYLES[t.status] || TICKET_STATUS_STYLES.OPEN;

                  return (
                    <tr
                      key={t.id}
                      tabIndex={0}
                      onClick={() => onSelectTicket(t)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectTicket(t);
                        }
                      }}
                      data-testid={`manager_support-ticket-row-${t.id}`}
                      className="hover:bg-primary-subtle/40 cursor-pointer motion-safe:transition-all"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-primary mr-2">{t.ticketNumber}</span>
                        <span className="text-sm font-semibold text-text-primary">{t.subject}</span>
                      </td>

                      <td className="px-5 py-3.5 text-xs text-text-secondary whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 bg-input px-2 py-0.5 rounded border border-border font-medium">
                          <Tag size={12} aria-hidden="true" />
                          {t.category}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${priStyle.bg} ${priStyle.text}`}>
                          {t.priority}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statStyle.bg} ${statStyle.text}`}>
                          {t.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-xs text-text-secondary whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-semibold text-text-primary">
                          <MessageSquare size={14} className="text-primary shrink-0" aria-hidden="true" />
                          {t.messages.length}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-xs text-text-secondary whitespace-nowrap">
                        {new Date(t.updatedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>

                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                          View Thread
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}

