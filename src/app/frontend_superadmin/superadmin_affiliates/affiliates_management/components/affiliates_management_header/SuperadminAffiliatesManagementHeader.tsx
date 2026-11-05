// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the page title, search, status filter, date-range filter, and Add CTA for the Affiliates page.
import { Users, Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_AFFILIATE_ALL_FILTER, SUPERADMIN_AFFILIATE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/constants/superadmin_affiliates_management.constants';

import type { SuperadminAffiliatesHeaderProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_header.types';
import type { AffiliateStatusFilter } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';



/**
 * @description Renders the page title, search, status filter, date-range filter, and Add CTA for the Affiliates page.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesManagementHeader({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange, onAddClick, startDate, onStartDateChange, endDate, onEndDateChange, }: SuperadminAffiliatesHeaderProps) {
  const t = useTranslations('superadmin_affiliates');
    return (<div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary flex items-center gap-2">
            <Users size={18} className="text-primary"/>
            
            {t('ui.affiliate_partners_65a0501')}
          </h1>
          <p className="text-sm text-secondary mt-1">{t('ui.manage_partners_and_resellers_referring_tenants__0b6be03')}</p>
        </div>
        <button type="button" onClick={onAddClick} className="min-h-11 flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 text-sm self-start md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-add-1">
          <Plus size={18}/>
          
          {t('ui.add_affiliate_bc5a606')}
        </button>
      </div>

      {/* Filters row — Rule 64: flex-col sm:flex-row so they stack on mobile */}
      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
        <div className="relative">
          <label htmlFor="superadmin_affiliates-search" className="sr-only">{t('ui.search_affiliates_6fda39b')}</label>
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input  id="superadmin_affiliates-search" type="text" placeholder={t('ui.search_affiliates_6fda39b')} value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} className="min-h-11 ps-9 pe-4 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors w-full sm:w-56" data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-filter-1"/>
        </div>

        <label htmlFor="superadmin_affiliates-status-filter" className="sr-only">{t('ui.status_1b84b5c')}</label>
        <select  id="superadmin_affiliates-status-filter" value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value as AffiliateStatusFilter)} className="min-h-11 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-status-1">
          <option value={SUPERADMIN_AFFILIATE_ALL_FILTER} data-testid="superadmin_affiliates-superadmin-affiliates-header-superadmin_affiliates-header-action-1">{t('ui.all_status_f0e0a01')}</option>
          <option value={SUPERADMIN_AFFILIATE_STATUS_CODES.ACTIVE} data-testid="superadmin_affiliates-superadmin-affiliates-header-superadmin_affiliates-header-action-2">{t('ui.active_618bcfe')}</option>
          <option value={SUPERADMIN_AFFILIATE_STATUS_CODES.INACTIVE} data-testid="superadmin_affiliates-superadmin-affiliates-header-superadmin_affiliates-header-action-3">{t('ui.inactive_74795a1')}</option>
        </select>

        {/* Date-range filter for commission period (audit item #28) */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-secondary font-medium whitespace-nowrap" htmlFor="aff-start-date">{t('ui.from_4251891')}</label>
          <input  id="aff-start-date" type="date" value={startDate} onChange={(e) => onStartDateChange(e.target.value)} className="min-h-11 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out" aria-label={t('ui.commission_period_start_date_bec883a')} data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-start-1"/>
          <label className="text-xs text-secondary font-medium whitespace-nowrap" htmlFor="aff-end-date">{t('ui.to_d9875bc')}</label>
          <input  id="aff-end-date" type="date" value={endDate} onChange={(e) => onEndDateChange(e.target.value)} className="min-h-11 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-all motion-safe:duration-base ease-in-out" aria-label={t('ui.commission_period_end_date_66fcfa4')} data-testid="superadmin_affiliates-superadmin-affiliates-header-affiliates-header-control-1"/>
        </div>
      </div>
    </div>);
}
