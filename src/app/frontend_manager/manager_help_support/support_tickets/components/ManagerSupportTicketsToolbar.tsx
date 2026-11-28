// RESPONSIBILITY: Renders the search, category filter, status tabs, and 'Raise Ticket' CTA.
'use client';
import { Search, Plus, LifeBuoy, PhoneCall } from 'lucide-react';
import { TICKET_CATEGORIES } from '@/app/frontend_manager/manager_help_support/support_tickets/constants/manager_support_tickets.constants';

interface Props {
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  onOpenCreate: () => void;
}

export default function ManagerSupportTicketsToolbar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  onOpenCreate,
}: Props) {
  const STATUSES = ['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

  return (
    <div className="space-y-4" data-testid="manager_support-toolbar">
      {/* Top Banner with Direct Admin Hotline */}
      <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-sky-500/30 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 opacity-85" />
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 rounded-xl bg-primary text-on-primary shrink-0">
            <LifeBuoy size={20} strokeWidth={2} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-text-primary">Admin & Operations Support Desk</h2>
            <p className="text-xs text-text-secondary">Have an urgent facility emergency or policy inquiry? Contact Admin directly or raise a ticket below.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <a
            href="tel:+919876500000"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary bg-card text-xs font-semibold text-primary hover:bg-primary hover:text-on-primary transition-all"
          >
            <PhoneCall size={14} aria-hidden="true" />
            Admin Hotline
          </a>
          <button
            type="button"
            onClick={onOpenCreate}
            data-testid="manager_support-button-raise-ticket"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-xs font-bold text-on-primary shadow-xs hover:bg-primary-hover active:scale-95 transition-all"
          >
            <Plus size={16} strokeWidth={2} aria-hidden="true" />
            Raise Ticket
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-input p-1 rounded-lg text-xs font-semibold overflow-x-auto">
            {STATUSES.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                data-testid={`manager_support-filter-${st.toLowerCase()}`}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-card text-primary shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            data-testid="manager_support-select-category"
            className="rounded-lg border border-border bg-input px-3 py-1.5 text-xs font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <option value="ALL">All Categories</option>
            {TICKET_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tickets..."
            data-testid="manager_support-input-search"
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-border bg-input text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
        </div>
      </div>
    </div>
  );
}

