// RESPONSIBILITY: Renders/orchestrates SuperadminSupportTicketsHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the header and filter/search controls for Support Tickets
import { Search, Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER, SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES, SUPERADMIN_SUPPORT_TICKETS_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/constants/superadmin_support_tickets_management.constants';

import type { SuperadminSupportTicketsHeaderProps } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management_header.types';
import type { TicketStatus, TicketPriority } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/types/superadmin_support_tickets_management.types';



/**
 * @description Renders the header and filter/search controls for Support Tickets
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSupportTicketsManagementHeader({ search, setSearch, showFilter, setShowFilter, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, onFilterChange, }: SuperadminSupportTicketsHeaderProps) {
  const t = useTranslations('superadmin_support_tickets');
    return (<div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="superadmin-page-title text-primary">{t('ui.support_tickets_1dc2590')}</h1>
          <p className="text-secondary mt-1">{t('ui.manage_incoming_issues_from_superadmin_gyms_03b8d95')}</p>
        </div>
      </div>

      <div className="p-4 border-b border-border flex gap-4">
        <div className="relative flex-1 max-w-md">
          <label htmlFor="superadmin_support_tickets-search" className="sr-only">{t('ui.search_tickets_or_superadmin_gyms_bf66cf1')}</label>
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input  id="superadmin_support_tickets-search" type="text" placeholder={t('ui.search_tickets_or_superadmin_gyms_bf66cf1') } className="min-h-11 w-full ps-9 pe-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out" value={search} onChange={(e) => {
            setSearch(e.target.value);
            onFilterChange();
        }} data-testid="superadmin_support_tickets-superadmin-tickets-header-tickets-header-filter-1"/>
        </div>
        <div className="relative">
          <button  type="button" onClick={() => setShowFilter(!showFilter)} className="min-h-11 flex items-center gap-2 px-4 py-2 bg-transparent border border-border rounded-lg text-sm font-medium text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_support_tickets-superadmin-tickets-header-header-filter-2-1">
            <Filter size={18}/>  {t('ui.filter_b681cb3')}
          </button>
          {showFilter && (<div className="absolute end-0 top-full mt-2  w-full sm:w-64  bg-card border border-border rounded-xl shadow-popover p-4 z-30 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="superadmin_support_tickets-status-filter" className="text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_b9a439d')}</label>
                <select  id="superadmin_support_tickets-status-filter" value={statusFilter} onChange={(e) => {
                setStatusFilter(e.target.value as TicketStatus | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
                onFilterChange();
            }} className="min-h-11 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_support_tickets-superadmin-tickets-header-tickets-header-close-1">
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
                <select  id="superadmin_support_tickets-priority-filter" value={priorityFilter} onChange={(e) => {
                setPriorityFilter(e.target.value as TicketPriority | typeof SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER);
                onFilterChange();
            }} className="min-h-11 w-full px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_support_tickets-superadmin-tickets-header-tickets-header-control-1">
                  <option value={SUPERADMIN_SUPPORT_TICKETS_ALL_FILTER} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-7">{t('ui.all_priorities_32b0a03')}</option>
                  <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.LOW} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-8">{t('ui.low_1f1188a')}</option>
                  <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.NORMAL} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-9">{t('ui.normal_608b1b2')}</option>
                  <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.MEDIUM} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-10">{t('ui.medium_199ef54')}</option>
                  <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.URGENT} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-11">{t('ui.urgent_6c931ba')}</option>
                  <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.HIGH} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-12">{t('ui.high_8fb0902')}</option>
                  <option value={SUPERADMIN_SUPPORT_TICKETS_PRIORITY_CODES.CRITICAL} data-testid="superadmin_support_tickets-superadmin-tickets-header-superadmin_support_tickets-header-action-13">{t('ui.critical_7f13cb6')}</option>
                </select>
              </div>
            </div>)}
        </div>
      </div>
    </div>);
}
