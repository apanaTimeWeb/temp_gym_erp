// RESPONSIBILITY: Renders ManagerMembersDirectoryToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Search, RefreshCw, Plus, Download, Calendar, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLocalDebouncedValueCommit';

import { MEMBER_EXPORT_FORMATS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_shared.constants';
import { MEMBER_STATUS_OPTIONS, MEMBER_GENDER_OPTIONS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useFetchPlans } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';


/** @description Renders the ManagerMembersDirectoryToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerMembersDirectoryToolbar() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const queryClient = useQueryClient();

  const {
    search, debouncedSearch, setSearch,
    statusFilter, setStatusFilter,
    genderFilter, setGenderFilter,
    planFilter, setPlanFilter,
    expiryFrom, expiryTo, setExpiryRange,
    sortColumn, sortDirection,
    openAdd, currentPage, exportMembers
  } = useManagerMembersDirectoryLogic();
  const { data: plansData } = useFetchPlans();
  const plans = plansData || [];

  const handleRefresh = () => {
    void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
  };

  // Build plan options dynamically from live plan list (Rule 3B — no hardcoded plans)
  const planOptions = [
    { label: t("COPY_ALL_PLANS"), value: 'All' },
    ...plans.map(p => ({ label: p.name, value: p.id })),
  ];

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-col gap-3">
      {/* Row 1: Search + Primary Actions */}
      <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-9 pr-3 py-2.5 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page w-full bg-input text-text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-value"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t("COPY_SEARCH_NAME_PHONE")}
            
           aria-label={t("COPY_SEARCH_NAME_PHONE")}/>
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button data-testid="manager_members-members-toolbar-refresh"
            onClick={handleRefresh}
            className="flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:opacity-80 text-text-primary w-full sm:w-auto motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
           type="button">
            <RefreshCw size={18} strokeWidth={2}/>{t("COPY_REFRESH")}</button>
          {/* Export buttons — CRITICAL FIX */}
          {MEMBER_EXPORT_FORMATS.map((fmt, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex justify-center items-center gap-2 px-3 py-2.5 text-sm border border-border rounded-xl hover:bg-primary-subtle text-text-secondary hover:text-primary motion-safe:transition-all w-full sm:w-auto motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstoolbar-button-exportmembers-${mapIndex}`}
              key={fmt.value}
              onClick={() => void exportMembers(fmt.value)}
              
              aria-label={fmt.label}
             type="button">
              <Download size={18} strokeWidth={2}/> {fmt.label}
            </button>
          ))}
          <button data-testid="manager_members-members-toolbar-add"
            onClick={openAdd}
            className="flex justify-center items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-primary bg-primary rounded-xl motion-safe:transition-all hover:bg-primary-hover w-full sm:w-auto motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
           type="button">
            <Plus size={18} strokeWidth={2}/>{t("COPY_ADD_MEMBER")}</button>
        </div>
      </div>

      {/* Row 2: Filters — CRITICAL FIX */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status filter */}
        <ManagerSearchableDropdown dataTestId="manager_members-managermemberstoolbar-managersearchabledropdown-1"
          value={statusFilter}
          onChange={(val) => setStatusFilter(String(val))}
          className="w-full sm:w-44"
          options={MEMBER_STATUS_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
          placeholder={t("COPY_FILTER_STATUS")}
         data-testid="manager_members-managermemberstoolbar-searchable-dropdown-1"/>
        {/* Blacklist / Suspended Quick Filter Button */}
        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'SUSPENDED' ? 'All' : 'SUSPENDED')}
          data-testid="manager_members-toolbar-blacklist-toggle"
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
            statusFilter === 'SUSPENDED' || statusFilter === 'BANNED'
              ? 'bg-danger text-on-danger border-danger shadow-sm'
              : 'bg-danger-bg text-danger-text border-danger/30 hover:border-danger'
          }`}
          aria-label="Filter blacklisted or suspended members"
        >
          <ShieldAlert size={15} strokeWidth={2.2} />
          <span>Blacklisted (3)</span>
        </button>
        {/* Gender filter — CRITICAL FIX */}
        <ManagerSearchableDropdown dataTestId="manager_members-managermemberstoolbar-managersearchabledropdown-2"
          value={genderFilter}
          onChange={(val) => setGenderFilter(String(val))}
          className="w-full sm:w-40"
          options={MEMBER_GENDER_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
          placeholder={t("COPY_FILTER_GENDER")}
         data-testid="manager_members-managermemberstoolbar-searchable-dropdown-2"/>
        {/* Plan filter — CRITICAL FIX */}
        <ManagerSearchableDropdown dataTestId="manager_members-managermemberstoolbar-managersearchabledropdown-3"
          value={planFilter}
          onChange={(val) => setPlanFilter(String(val))}
          className="w-full sm:w-44"
          options={planOptions}
          placeholder={t("COPY_FILTER_PLAN")}
         data-testid="manager_members-managermemberstoolbar-searchable-dropdown-3"/>
        {/* Expiry Date Range — CRITICAL FIX */}
        <div className="flex items-center gap-1.5 border border-border rounded-xl px-3 py-1.5 bg-input text-sm w-full sm:w-auto">
          <Calendar size={18} strokeWidth={2} className="text-text-secondary shrink-0" data-testid="manager_members-managermemberstoolbar-interactive"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "bg-transparent text-text-secondary focus-visible:outline-none text-xs"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-date-1"
            type="date"
            value={expiryFrom}
            onChange={e => setExpiryRange(e.target.value, expiryTo)}
            
            title={t("COPY_EXPIRY_3")}
            aria-label={t("COPY_EXPIRY_DATE_3")}
          />
          <span className="text-text-secondary text-xs">–</span>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "bg-transparent text-text-secondary focus-visible:outline-none text-xs"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-date-2"
            type="date"
            value={expiryTo}
            onChange={e => setExpiryRange(expiryFrom, e.target.value)}
            
            title={t("COPY_EXPIRY_2")}
            aria-label={t("COPY_EXPIRY_DATE_1")}
          />
        </div>
      </div>
    </div>
  );
}
