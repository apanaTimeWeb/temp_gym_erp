// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationBroadcastsHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Plus, Search, Megaphone, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_BROADCAST_STATUS_FILTER_CODES } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/constants/superadmin_communication_broadcasts_campaigns_broadcast.constants';

import type { BroadcastStatusFilter, SuperadminCommunicationBroadcastsHeaderProps } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';

export default function SuperadminCommunicationBroadcastsCampaignsHeader({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, onCreateClick }: SuperadminCommunicationBroadcastsHeaderProps) {
  const t = useTranslations('superadmin_communication_broadcasts');
  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#06B6D4] via-[#38BDF8] to-[#FF5A1F]" />
      <div className="min-w-0">
        <h1 className="superadmin-page-title text-primary flex items-center gap-2.5">
          <span className="p-2 rounded-xl border border-cyan-500/35 bg-cyan-500/15 text-cyan-500 dark:text-cyan-300 shrink-0" aria-hidden="true">
            <Megaphone size={18} strokeWidth={2.2} />
          </span>
          <span className="truncate">{t('ui.announcements_broadcasts_f72fd168')}</span>
        </h1>
        <p className="text-sm text-secondary mt-1">{t('ui.push_notifications_and_announcements_to_all__f1453a1c')}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        <div className="relative flex-1 sm:flex-none min-w-[200px]">
          <Search size={16} className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input
            type="text"
            aria-label={t('ui.search_broadcasts_d23d02d2')}
            placeholder={t('ui.search_broadcasts_d23d02d2')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="ps-9 pe-8 py-2 bg-input border border-border rounded-xl text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-focus motion-safe:transition-colors w-full sm:w-56 min-h-10"
            data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-header-superadmin-broadcasts-header-text"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-primary rounded-md transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {onStatusFilterChange && (
          <select
            aria-label={t('ui.status_ec53a8c4')}
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as BroadcastStatusFilter)}
            className="px-3 py-2 bg-input border border-border rounded-xl text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-focus motion-safe:transition-colors min-h-10"
            data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-header-superadmin-broadcasts-header-select"
          >
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL} data-testid="superadminbroadcastsheader-option-3882">{t('ui.all_status_162647d9')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.DRAFT} data-testid="superadminbroadcastsheader-option-3953">{t('ui.draft_f03ab16c')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SCHEDULED} data-testid="superadminbroadcastsheader-option-4021">{t('ui.scheduled_2b7dabba')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.SENT} data-testid="superadminbroadcastsheader-option-4097">{t('ui.sent_7f8c0283')}</option>
            <option value={SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.FAILED} data-testid="superadminbroadcastsheader-option-4163">{t('ui.failed_d7c8c85b')}</option>
          </select>
        )}

        {(searchQuery || (statusFilter && statusFilter !== SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL)) && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              if (onStatusFilterChange) onStatusFilterChange(SUPERADMIN_BROADCAST_STATUS_FILTER_CODES.ALL);
            }}
            className="text-xs text-rose-500 dark:text-rose-300 font-semibold px-3 py-2 rounded-xl border border-rose-500/35 bg-rose-500/10 hover:bg-rose-500/20 transition-colors min-h-10 cursor-pointer"
          >
            Clear Filters
          </button>
        )}

        <button
          type="button"
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:active:scale-95 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-10 cursor-pointer"
          data-testid="superadmin_communication_broadcasts-superadmin-broadcasts-header-broadcasts-header-new-broadcast"
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>{t('ui.new_broadcast_10fa2e62')}</span>
        </button>
      </div>
    </section>
  );
}
