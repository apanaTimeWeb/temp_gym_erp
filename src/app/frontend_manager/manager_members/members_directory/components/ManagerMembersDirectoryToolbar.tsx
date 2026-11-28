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

  const handleExpiryPreset = (preset: string) => {
    const now = new Date();
    const formatYMD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (preset === 'all') {
      setExpiryRange('', '');
    } else if (preset === 'this_week') {
      const dayOfWeek = now.getDay();
      const diffToMonday = (dayOfWeek + 6) % 7;
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - diffToMonday);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      setExpiryRange(formatYMD(startOfWeek), formatYMD(endOfWeek));
    } else if (preset === 'this_month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      setExpiryRange(formatYMD(startOfMonth), formatYMD(endOfMonth));
    } else if (preset === 'next_month') {
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
      setExpiryRange(formatYMD(startOfNextMonth), formatYMD(endOfNextMonth));
    } else if (preset === 'expired') {
      setExpiryRange('2020-01-01', formatYMD(now));
    }
  };

  const currentExpiryPreset = (() => {
    if (!expiryFrom && !expiryTo) return 'all';
    const now = new Date();
    const formatYMD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (expiryTo === formatYMD(now) && expiryFrom === '2020-01-01') return 'expired';
    const startOfMonth = formatYMD(new Date(now.getFullYear(), now.getMonth(), 1));
    const endOfMonth = formatYMD(new Date(now.getFullYear(), now.getMonth() + 1, 0));
    if (expiryFrom === startOfMonth && expiryTo === endOfMonth) return 'this_month';
    const startOfNextMonth = formatYMD(new Date(now.getFullYear(), now.getMonth() + 1, 1));
    const endOfNextMonth = formatYMD(new Date(now.getFullYear(), now.getMonth() + 2, 0));
    if (expiryFrom === startOfNextMonth && expiryTo === endOfNextMonth) return 'next_month';
    return 'custom';
  })();

  // Build plan options dynamically from live plan list (Rule 3B — no hardcoded plans)
  const planOptions = [
    { label: t("COPY_ALL_PLANS"), value: 'All' },
    ...plans.map(p => ({ label: p.name, value: p.id })),
  ];

  return (
    <div className="relative z-30 bg-card dark:bg-gradient-to-r dark:from-[#101C2F] dark:via-[#131C30] dark:to-[#101726] rounded-2xl shadow-card border border-border dark:border-emerald-500/30 p-4 flex flex-col gap-3">
      {/* Row 1: Search + Primary Actions */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="relative w-full lg:w-72">
          <Search size={17} strokeWidth={2.2} className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none" />
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 pl-9 pr-3 py-2 border border-border dark:border-white/15 hover:border-emerald-500/45 rounded-xl text-sm w-full bg-input dark:bg-[#0B1220] text-text-primary placeholder:text-secondary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_members-members-toolbar-input-value"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t("COPY_SEARCH_NAME_PHONE")}
            
           aria-label={t("COPY_SEARCH_NAME_PHONE")}/>
        </div>
        <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center justify-start lg:justify-end">
          <button data-testid="manager_members-members-toolbar-refresh"
            onClick={handleRefresh}
            className="min-h-11 flex justify-center items-center gap-2 px-3.5 py-2 text-sm border border-sky-500/35 bg-sky-500/15 hover:bg-sky-500/25 rounded-xl text-sky-600 dark:text-sky-300 font-semibold w-full sm:w-auto motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none cursor-pointer"
           type="button">
            <RefreshCw size={16} strokeWidth={2.2}/>{t("COPY_REFRESH")}</button>
          {/* Export buttons — CRITICAL FIX */}
          {MEMBER_EXPORT_FORMATS.map((fmt, mapIndex) => (
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 flex justify-center items-center gap-2 px-3.5 py-2 text-sm border border-teal-500/35 bg-teal-500/15 hover:bg-teal-500/25 rounded-xl text-teal-600 dark:text-teal-300 font-semibold motion-safe:transition-all w-full sm:w-auto motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none cursor-pointer"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermemberstoolbar-button-exportmembers-${mapIndex}`}
              key={fmt.value}
              onClick={() => void exportMembers(fmt.value)}
              
              aria-label={fmt.label}
             type="button">
              <Download size={16} strokeWidth={2}/> {fmt.label}
            </button>
          ))}
          <button data-testid="manager_members-members-toolbar-add"
            onClick={openAdd}
            className="min-h-11 flex justify-center items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#FF5A1F] to-[#F97316] rounded-xl motion-safe:transition-all hover:brightness-110 shadow-[0_4px_14px_rgba(255,90,31,0.3)] w-full sm:w-auto motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none cursor-pointer"
           type="button">
            <Plus size={17} strokeWidth={2}/>{t("COPY_ADD_MEMBER")}</button>
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
        {/* Expiry Preset dropdown */}
        <div className="w-full sm:w-44">
          <ManagerSearchableDropdown
            dataTestId="manager_members-managermemberstoolbar-expiry-preset"
            value={currentExpiryPreset}
            onChange={(val) => handleExpiryPreset(String(val))}
            options={[
              { label: 'All Expiries', value: 'all' },
              { label: 'This Week', value: 'this_week' },
              { label: 'This Month', value: 'this_month' },
              { label: 'Next Month', value: 'next_month' },
              { label: 'Expired / Past Due', value: 'expired' },
              { label: 'Custom Range', value: 'custom' },
            ]}
            placeholder="Expiry Filter"
            ariaLabel="Expiry Preset Filter"
          />
        </div>
        {/* Expiry Date Range — CRITICAL FIX */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 border border-border rounded-xl px-3 py-1.5 bg-input text-sm w-full sm:w-auto">
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
