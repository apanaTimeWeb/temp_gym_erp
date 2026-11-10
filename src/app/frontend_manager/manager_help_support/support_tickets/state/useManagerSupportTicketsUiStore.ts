// RESPONSIBILITY: Module UI state for Manager Support Tickets (selected ticket, filter, modals).
import { create } from 'zustand';
import type { SupportTicket } from '@/app/frontend_manager/manager_help_support/support_tickets/types/manager_support_tickets.types';

interface ManagerSupportTicketsUiState {
  statusFilter: string;
  categoryFilter: string;
  search: string;
  isCreateModalOpen: boolean;
  selectedTicket: SupportTicket | null;

  setStatusFilter: (st: string) => void;
  setCategoryFilter: (cat: string) => void;
  setSearch: (s: string) => void;
  setIsCreateModalOpen: (open: boolean) => void;
  setSelectedTicket: (ticket: SupportTicket | null) => void;
}

export const useManagerSupportTicketsUiStore = create<ManagerSupportTicketsUiState>((set) => ({
  statusFilter: 'ALL',
  categoryFilter: 'ALL',
  search: '',
  isCreateModalOpen: false,
  selectedTicket: null,

  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setSearch: (search) => set({ search }),
  setIsCreateModalOpen: (isCreateModalOpen) => set({ isCreateModalOpen }),
  setSelectedTicket: (selectedTicket) => set({ selectedTicket }),
}));

