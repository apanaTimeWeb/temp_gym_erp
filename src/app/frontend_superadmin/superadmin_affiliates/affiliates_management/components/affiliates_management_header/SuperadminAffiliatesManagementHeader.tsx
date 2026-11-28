// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { Users, Plus, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_AFFILIATE_ALL_FILTER, SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';

import type { SuperadminAffiliatesHeaderProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_header.types';
import type { AffiliateStatusFilter } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';

export default function SuperadminAffiliatesManagementHeader({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddClick,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: SuperadminAffiliatesHeaderProps) {
  const t = useTranslations('superadmin_affiliates');
  const isFiltered = Boolean(searchQuery || (statusFilter && statusFilter !== SUPERADMIN_AFFILIATE_ALL_FILTER) || startDate || endDate);

  return (
    <div className="flex flex-col gap-4">
      <section className="relative overflow-hidden rounded-2xl border border-teal-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2DD4BF] via-[#10B981] to-[#38BDF8]" />
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary flex items-center gap-2.5">
            <span className="p-2 rounded-xl border border-teal-500/35 bg-teal-500/15 text-teal-500 dark:text-teal-300 shrink-0" aria-hidden="true">
              <Users size={18} strokeWidth={2.2} />
            </span>
            <span className="truncate">{t('ui.affiliate_partners_65a0501')}</span>
          </h1>
          <p className="text-sm text-secondary mt-1">{t('ui.manage_partners_and_resellers_referring_tenants__0b6be03')}</p>
        </div>
        <button
          type="button"
          onClick={onAddClick}
          className="min-h-10 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF5A1F] to-[#F97316] hover:brightness-110 text-white font-semibold rounded-xl shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:active:scale-95 text-sm self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 cursor-pointer"
          data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-add-1"
        >
          <Plus size={16} strokeWidth={2.2} />
          <span>{t('ui.add_affiliate_bc5a606')}</span>
        </button>
      </section>

      <div className="rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-4 shadow-card flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
          <label htmlFor="superadmin_affiliates-search" className="sr-only">{t('ui.search_affiliates_6fda39b')}</label>
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" aria-hidden="true" />
          <input
            id="superadmin_affiliates-search"
            type="text"
            placeholder={t('ui.search_affiliates_6fda39b')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="min-h-10 ps-9 pe-8 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full"
            data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-filter-1"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md cursor-pointer"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <label htmlFor="superadmin_affiliates-status-filter" className="sr-only">{t('ui.status_1b84b5c')}</label>
        <select
          id="superadmin_affiliates-status-filter"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as AffiliateStatusFilter)}
          className="min-h-10 px-3 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-status-1"
        >
          <option value={SUPERADMIN_AFFILIATE_ALL_FILTER} data-testid="superadmin_affiliates-superadmin-affiliates-header-superadmin_affiliates-header-action-1">{t('ui.all_status_f0e0a01')}</option>
          <option value={SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE} data-testid="superadmin_affiliates-superadmin-affiliates-header-superadmin_affiliates-header-action-2">{t('ui.active_618bcfe')}</option>
          <option value={SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE} data-testid="superadmin_affiliates-superadmin-affiliates-header-superadmin_affiliates-header-action-3">{t('ui.inactive_74795a1')}</option>
        </select>

        <div className="flex flex-wrap items-center gap-2">
          <label className="text-xs text-secondary font-medium whitespace-nowrap" htmlFor="aff-start-date">{t('ui.from_4251891')}</label>
          <input
            id="aff-start-date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="min-h-10 px-3 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('ui.commission_period_start_date_bec883a')}
            data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-start-1"
          />
          <label className="text-xs text-secondary font-medium whitespace-nowrap" htmlFor="aff-end-date">{t('ui.to_d9875bc')}</label>
          <input
            id="aff-end-date"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="min-h-10 px-3 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('ui.commission_period_end_date_66fcfa4')}
            data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-control-1"
          />
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              onStatusFilterChange(SUPERADMIN_AFFILIATE_ALL_FILTER);
              onStartDateChange('');
              onEndDateChange('');
            }}
            className="text-xs text-rose-500 dark:text-rose-300 font-semibold px-3 py-2 rounded-xl border border-rose-500/35 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer min-h-10"
          >
            {t('ui.clear_all') ?? 'Clear Filters'}
          </button>
        )}
      </div>
    </div>
  );
}
