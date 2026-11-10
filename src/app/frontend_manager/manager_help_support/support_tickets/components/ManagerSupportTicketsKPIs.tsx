// RESPONSIBILITY: Renders KPI cards for Manager Support Tickets.
'use client';
import { Ticket, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import type { SupportTicketKPIs } from '@/app/frontend_manager/manager_help_support/support_tickets/types/manager_support_tickets.types';

export default function ManagerSupportTicketsKPIs({ kpis }: { kpis: SupportTicketKPIs }) {
  const cards = [
    { label: 'Total Tickets', value: kpis.totalTickets, icon: Ticket, color: 'text-primary', bg: 'bg-primary-subtle' },
    { label: 'Open Tickets', value: kpis.openTickets, icon: AlertCircle, color: 'text-info', bg: 'bg-info-bg' },
    { label: 'In Progress', value: kpis.inProgressTickets, icon: Clock, color: 'text-warning-text', bg: 'bg-warning-bg' },
    { label: 'Resolved', value: kpis.resolvedTickets, icon: CheckCircle2, color: 'text-success-text', bg: 'bg-success-bg' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="manager_support-kpis">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="p-4 rounded-xl bg-card border border-border shadow-xs flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.color} flex items-center justify-center shrink-0`}>
              <Icon size={20} strokeWidth={2} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs text-text-secondary font-medium">{c.label}</p>
              <p className="text-xl font-bold text-text-primary">{c.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

