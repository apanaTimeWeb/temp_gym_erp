// RESPONSIBILITY: Orchestrates the Support Tickets flow and connects queries, state and mutations.
'use client';
import { useManagerSupportTicketsUiStore } from '@/app/frontend_manager/manager_help_support/support_tickets/state/useManagerSupportTicketsUiStore';
import { useManagerSupportTicketsQueries } from '@/app/frontend_manager/manager_help_support/support_tickets/hooks/useManagerSupportTicketsQueries';
import { useManagerSupportTicketsMutations } from '@/app/frontend_manager/manager_help_support/support_tickets/hooks/useManagerSupportTicketsMutations';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import type { CreateSupportTicketFormValues, ReplySupportTicketFormValues } from '@/app/frontend_manager/manager_help_support/support_tickets/schemas/manager_support_tickets.schemas';

export function useManagerSupportTicketsLogic() {
  const ui = useManagerSupportTicketsUiStore();
  const { ticketsQuery, kpisQuery } = useManagerSupportTicketsQueries(ui.statusFilter, ui.categoryFilter);
  const mutations = useManagerSupportTicketsMutations();

  const tickets = (ticketsQuery.data ?? []).filter((t) => {
    if (!ui.search) return true;
    const q = ui.search.toLowerCase();
    return (
      t.ticketNumber.toLowerCase().includes(q) ||
      t.subject.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const handleCreateTicket = async (values: CreateSupportTicketFormValues) => {
    const key = ManagerInfrastructureIdempotency();
    await mutations.createTicket({ values, idempotencyKey: key });
    ui.setIsCreateModalOpen(false);
  };

  const handleSendReply = async (ticketId: string, values: ReplySupportTicketFormValues) => {
    await mutations.sendReply({ ticketId, values });
  };

  return {
    tickets,
    kpis: kpisQuery.data ?? { totalTickets: 0, openTickets: 0, inProgressTickets: 0, resolvedTickets: 0 },
    isPending: ticketsQuery.isPending || kpisQuery.isPending,
    isError: ticketsQuery.isError || kpisQuery.isError,
    statusFilter: ui.statusFilter,
    setStatusFilter: ui.setStatusFilter,
    categoryFilter: ui.categoryFilter,
    setCategoryFilter: ui.setCategoryFilter,
    search: ui.search,
    setSearch: ui.setSearch,
    isCreateModalOpen: ui.isCreateModalOpen,
    setIsCreateModalOpen: ui.setIsCreateModalOpen,
    selectedTicket: ui.selectedTicket,
    setSelectedTicket: ui.setSelectedTicket,
    handleCreateTicket,
    handleSendReply,
    isCreating: mutations.isCreating,
    isReplying: mutations.isReplying,
  };
}

