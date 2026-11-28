// RESPONSIBILITY: Renders/orchestrates SuperadminSupportTicketsHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Search, Filter, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER, SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES, SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';

import type { SuperadminSupportTicketsHeaderProps } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_header.types';
import type { TicketStatus, TicketPriority } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';

export default function SuperadminSupportTicketsManagementHeader({ search, setSearch, showFilter, setShowFilter, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, onFilterChange }: SuperadminSupportTicketsHeaderProps) {
  const t = useTranslations('superadmin_support_tickets');
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl border border-rose-500/35 bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FB7185] via-[#F43F5E] to-[#FF5A1F]" />
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary">{t('ui.support_tickets_1dc2590')}</h1>
          <p className="text-secondary text-sm mt-1">{t('ui.manage_incoming_issues_from_superadmin_gyms_03b8d95')}</p>
        </div>
      </section>

      <div className="rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-4 shadow-card flex gap-3 flex-wrap items-center justify-between">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <label htmlFor="superadmin_support_tickets-search" className="sr-only">{t('ui.search_tickets_or_superadmin_gyms_bf66cf1')}</label>
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            id="superadmin_support_tickets-search"
            type="text"
            placeholder={t('ui.search_tickets_or_superadmin_gyms_bf66cf1')}
            className="min-h-10 w-full ps-9 pe-8 py-2 bg-input border border-border rounded-xl text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onFilterChange();
            }}
            data-testid="superadmin_support_tickets-superadmin-tickets-header-tickets-header-filter-1"
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                onFilterChange();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md cursor-pointer"
              aria-label="Clear search query"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="min-h-10 flex items-center gap-2 px-4 py-2 bg-input border border-border dark:border-white/15 rounded-xl text-sm font-semibold text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95 cursor-pointer"
              data-testid="superadmin_support_tickets-superadmin-tickets-header-header-filter-2-1"
            >
              <Filter size={16} />
              <span>{t('ui.filter_b681cb3')}</span>
            </button>
            {showFilter && (
              <div className="absolute end-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] bg-popover dark:bg-[#0E1526]/98 border border-border dark:border-white/15 rounded-2xl shadow-popover p-4 z-30 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="superadmin_support_tickets-status-filter" className="text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_b9a439d')}</label>
                  <select
                    id="superadmin_support_tickets-status-filter"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value as TicketStatus | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
                      onFilterChange();
                    }}
                    className="min-h-10 w-full px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-focus motion-safe:transition-all"
                    data-testid="superadmin_support_tickets-superadmin-tickets-header-tickets-header-close-1"
                  >
                    <option value={SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-1">{t('ui.all_statuses_04b3d7a')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.OPEN} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-2">{t('ui.open_2e4a3b6')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.IN_PROGRESS} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-3">{t('ui.in_progress_8f703f2')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.WAITING} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-4">{t('ui.waiting_b75b124')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.RESOLVED} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-5">{t('ui.resolved_56ce723')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES.CLOSED} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-6">{t('ui.closed_472ae86')}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="superadmin_support_tickets-priority-filter" className="text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.priority_292b027')}</label>
                  <select
                    id="superadmin_support_tickets-priority-filter"
                    value={priorityFilter}
                    onChange={(e) => {
                      setPriorityFilter(e.target.value as TicketPriority | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
                      onFilterChange();
                    }}
                    className="min-h-10 w-full px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-focus motion-safe:transition-all"
                    data-testid="superadmin_support_tickets-superadmin-tickets-header-tickets-header-control-1"
                  >
                    <option value={SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-7">{t('ui.all_priorities_32b0a03')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.LOW} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-8">{t('ui.low_1f1188a')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.NORMAL} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-9">{t('ui.normal_608b1b2')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.MEDIUM} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-10">{t('ui.medium_199ef54')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.URGENT} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-11">{t('ui.urgent_6c931ba')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.HIGH} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-12">{t('ui.high_8fb0902')}</option>
                    <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.CRITICAL} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-13">{t('ui.critical_7f13cb6')}</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {(statusFilter !== SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER || priorityFilter !== SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER || search) && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter(SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
                setPriorityFilter(SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
                onFilterChange();
              }}
              className="text-xs text-rose-500 dark:text-rose-300 font-semibold px-3 py-2 rounded-xl border border-rose-500/35 bg-rose-500/10 hover:bg-rose-500/20 transition-colors min-h-10 cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
