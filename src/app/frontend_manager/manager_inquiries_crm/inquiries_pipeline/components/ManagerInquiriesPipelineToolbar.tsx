// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { useState } from 'react';

import { RefreshCw, Plus, MessageCircle, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebouncedValueCommit';

import { MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES, MANAGER_INQUIRY_CONVERTED_STATUS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import { INQUIRIES_STATUS_LABEL_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_shared.constants';
import { useManagerInquiriesPipelineLogic } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineLogic';


/** @description Renders the ManagerInquiriesPipelineToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerInquiriesPipelineToolbar() {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');

  const { search, setSearch, statusFilter, setStatusFilter, dateFilter, setDateFilter, startDate, endDate, setStartDate, setEndDate, openAdd, selectedIds, clearSelection, openBulkMsg, setCurrentPage, refresh } = useManagerInquiriesPipelineLogic();

  if (selectedIds.length > 0) {
    return (
      <div className="bg-primary-subtle border border-border-focus rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between motion-safe:transition-all motion-safe:duration-200 ease-in-out">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-text-primary">
            {selectedIds.length} {selectedIds.length === 1 ? t('TEXT_INQUIRY_SINGULAR') : t('TEXT_INQUIRY_PLURAL')}{t("COPY_SELECTED")}</span>
          <button data-testid="manager_inquiries-manager-inquiries-toolbar-selection" onClick={clearSelection} className="text-sm font-medium text-text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110" type="button">{t("COPY_CLEAR_SELECTION")}</button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 min-h-11 min-h-11 min-h-11 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl bg-success motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-button-action-1"
            onClick={() => openBulkMsg('whatsapp')}
            
           type="button">
            <MessageCircle size={18} strokeWidth={2}/>{t("COPY_BULK_WHATSAPP")}</button>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 min-h-11 min-h-11 min-h-11 px-4 py-2.5 text-sm font-semibold text-on-info rounded-xl bg-info motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-button-action-2"
            onClick={() => openBulkMsg('email')}
            
           type="button">
            <Mail size={18} strokeWidth={2}/>{t("COPY_BULK_EMAIL")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-30 bg-card dark:bg-gradient-to-r dark:from-[#0E1C30] dark:via-[#131C30] dark:to-[#101726] rounded-2xl shadow-card border border-border dark:border-sky-500/30 p-4 flex flex-col xl:flex-row gap-3 items-stretch xl:items-center justify-between">
      <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 border border-border dark:border-white/15 rounded-xl px-4 py-2.5 text-sm w-full xl:max-w-xs bg-input dark:bg-[#0B1220] text-text-primary placeholder:text-secondary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-input-value"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={t("COPY_SEARCH_NAME_PHONE")}
        
       aria-label={t("COPY_SEARCH_NAME_PHONE")}/>
      <div className="flex flex-wrap gap-2.5 w-full xl:w-auto items-center justify-start xl:justify-end">
        <div className="w-full sm:w-48">
          <ManagerSearchableDropdown dataTestId="manager_inquiries-managerinquiriestoolbar-managersearchabledropdown-1"
            value={statusFilter}
            onChange={(val) => setStatusFilter(String(val))}
            options={[
              { label: t("COPY_ALL_STATUS"), value: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.ALL_FILTER },
              ...Object.entries(INQUIRIES_STATUS_LABEL_KEYS)
                .map(([val, labelKey]) => ({ label: t(labelKey), value: val })),
            ]}
           data-testid="manager_inquiries-managerinquiriestoolbar-searchable-dropdown-1"/>
        </div>
        <div className="w-full sm:w-44">
          <ManagerSearchableDropdown
            dataTestId="manager_inquiries-managerinquiriestoolbar-date-filter"
            value={dateFilter}
            onChange={(val) => setDateFilter(String(val))}
            options={[
              { label: 'All Time', value: 'all' },
              { label: 'This Month', value: 'this_month' },
              { label: 'Last Month', value: 'last_month' },
              { label: 'Last 3 Months', value: 'last_3_months' },
              { label: 'This Year', value: 'this_year' },
              { label: 'Custom Range', value: 'custom' },
            ]}
            placeholder="Period"
            ariaLabel="Inquiries date filter"
          />
        </div>
        {dateFilter === 'custom' && (
          <div className="flex flex-wrap items-center gap-1.5 border border-border rounded-xl px-3 py-1.5 bg-input text-sm w-full sm:w-auto">
            <input
              type="date"
              value={startDate || ''}
              onChange={(e) => setStartDate?.(e.target.value)}
              className="bg-transparent text-text-primary text-xs focus-visible:outline-none"
              aria-label="Start date"
              data-testid="manager_inquiries-toolbar-start-date"
            />
            <span className="text-text-secondary text-xs">–</span>
            <input
              type="date"
              value={endDate || ''}
              onChange={(e) => setEndDate?.(e.target.value)}
              className="bg-transparent text-text-primary text-xs focus-visible:outline-none"
              aria-label="End date"
              data-testid="manager_inquiries-toolbar-end-date"
            />
          </div>
        )}
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 inline-flex items-center justify-center gap-2 px-3.5 py-2 text-sm border border-sky-500/35 bg-sky-500/15 hover:bg-sky-500/25 rounded-xl motion-safe:transition-all text-sky-600 dark:text-sky-300 font-semibold motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 cursor-pointer"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_inquiries-manager-inquiries-toolbar-button-refresh"
          onClick={() => void refresh()}
          
          aria-label={t("COPY_REFRESH_INQUIRIES")}
         type="button">
          <RefreshCw size={17} strokeWidth={2.2} />
        </button>
        <button data-testid="manager_inquiries-manager-inquiries-toolbar-add"
          onClick={openAdd}
          className="min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF5A1F] to-[#F97316] rounded-xl hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none cursor-pointer"
         type="button">
          <Plus size={17} strokeWidth={2}/>{t("COPY_ADD_INQUIRY")}</button>
      </div>
    </div>
  );
}
