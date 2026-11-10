// RESPONSIBILITY: Main page coordinator for Manager Support Tickets.
'use client';
import ManagerSupportTicketsKPIs from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsKPIs';
import ManagerSupportTicketsToolbar from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsToolbar';
import ManagerSupportTicketsTable from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsTable';
import ManagerSupportTicketsCreateModal from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsCreateModal';
import ManagerSupportTicketsThreadDrawer from '@/app/frontend_manager/manager_help_support/support_tickets/components/ManagerSupportTicketsThreadDrawer';
import { useManagerSupportTicketsLogic } from '@/app/frontend_manager/manager_help_support/support_tickets/hooks/useManagerSupportTicketsLogic';

export default function ManagerSupportTicketsMain() {
  const {
    tickets,
    kpis,
    isPending,
    isError,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    search,
    setSearch,
    isCreateModalOpen,
    setIsCreateModalOpen,
    selectedTicket,
    setSelectedTicket,
    handleCreateTicket,
    handleSendReply,
    isCreating,
    isReplying,
  } = useManagerSupportTicketsLogic();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto" data-testid="manager_support-main-container">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Help & Operations Support</h1>
        <p className="text-sm text-text-secondary mt-1">Direct communication with Head Admin, management escalations, and technical issue tracking.</p>
      </div>

      <ManagerSupportTicketsKPIs kpis={kpis} />

      <ManagerSupportTicketsToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        onOpenCreate={() => setIsCreateModalOpen(true)}
      />

      <ManagerSupportTicketsTable
        tickets={tickets}
        onSelectTicket={(t) => setSelectedTicket(t)}
      />

      <ManagerSupportTicketsCreateModal
        open={isCreateModalOpen}
        saving={isCreating}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />

      <ManagerSupportTicketsThreadDrawer
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
        onSendReply={handleSendReply}
        isReplying={isReplying}
      />
    </div>
  );
}

