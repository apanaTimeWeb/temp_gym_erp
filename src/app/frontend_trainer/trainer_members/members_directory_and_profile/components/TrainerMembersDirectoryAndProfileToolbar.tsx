"use client";
// RESPONSIBILITY: Renders the toolbar for searching and filtering members.
import { Search, RefreshCw, Megaphone, Download, X } from 'lucide-react';
import { useState } from 'react';

import { useTranslations } from 'next-intl';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTrainerInfrastructureSearchableDropdown';

import { TRAINER_MEMBERS_MEMBER_STATUS_OPTIONS, TRAINER_MEMBERS_MEMBER_PROGRESS_OPTIONS } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/TrainerMembersDirectoryAndProfileConstants';

import { useTrainerMembersToolbar } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileToolbar';
import TrainerMembersDirectoryAndProfileBroadcastModal from './TrainerMembersDirectoryAndProfileBroadcastModal';

/**
 * @description Renders the toolbar for searching and filtering members.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the members feature's filtering and control surface, preserving URL/query state and accessible interaction semantics.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersToolbar() {
  const t = useTranslations('TRAINER_MEMBERS');
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const {
    localSearch,
    setLocalSearch,
    statusFilter,
    setStatusFilter,
    progressStatusFilter,
    setProgressStatusFilter,
    handleRefresh
  } = useTrainerMembersToolbar();

  const hasActiveFilters = Boolean(localSearch.trim()) || statusFilter !== 'All' || progressStatusFilter !== 'All';

  return (
    <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-wrap gap-3 items-stretch sm:items-center justify-between ">
      <div className="relative w-full sm:min-w-[240px] sm:w-72">
        <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" strokeWidth={2}/>
        <label htmlFor="trainer-members-search" className="sr-only ">{t("TEXT_SEARCH_BY_NAME_OR_PHONE")}</label>
        <input id="trainer-members-search" 
          value={localSearch} 
          onChange={e => setLocalSearch(e.target.value)} 
          placeholder={t("TEXT_SEARCH_BY_NAME_OR_PHONE")} 
          className="ps-9 pe-8 py-2.5 border border-border rounded-xl text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-full bg-input text-text-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermemberstoolbar-input_1"/>
        {localSearch && (
          <button
            type="button"
            onClick={() => setLocalSearch('')}
            className="absolute end-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto items-stretch sm:items-center flex-wrap">
        <TrainerInfrastructureSearchableDropdown
          value={statusFilter}
          onChange={(val: string | number) => setStatusFilter(String(val))}
          className="w-full sm:w-48 "
          options={TRAINER_MEMBERS_MEMBER_STATUS_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
          ariaLabel={t("TEXT_STATUS")}
         testId="trainer-members-members-toolbar-status-filter"/>
        <TrainerInfrastructureSearchableDropdown
          value={progressStatusFilter}
          onChange={(val: string | number) => setProgressStatusFilter(String(val))}
          className="w-full sm:w-48 "
          options={TRAINER_MEMBERS_MEMBER_PROGRESS_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
          ariaLabel={t("TEXT_PROGRESS_STATUS")}
         testId="trainer-members-members-toolbar-progress-status-filter"/>
        
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setLocalSearch('');
              setStatusFilter('All');
              setProgressStatusFilter('All');
            }}
            className="min-h-11 inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-rose-500 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            data-testid="trainer-members-clear-all"
          >
            <X size={14} /> Clear All
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowBroadcastModal(true)}
          className="min-h-11 inline-flex items-center gap-2 px-3.5 py-2.5 text-sm bg-primary text-on-primary rounded-xl font-semibold hover:bg-primary-hover shadow-sm shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all"
          data-testid="trainer_members-broadcast-button"
        >
          <Megaphone size={16} />
          Message Trainees
        </button>

        <a
          href="/__mocks__/trainer/member_progress_export.csv"
          download="trainees_roster.csv"
          className="min-h-11 inline-flex items-center gap-1.5 px-3 py-2.5 text-sm border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 rounded-xl motion-safe:transition-colors text-teal-600 dark:text-teal-300 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          data-testid="trainer_members-export-csv-button"
        >
          <Download size={15} />
          Export
        </a>

        <button type="button" 
          onClick={handleRefresh} 
          className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-3 py-2.5 text-sm border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 rounded-xl text-sky-600 dark:text-sky-300 font-semibold motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermemberstoolbar-button_4">
          <RefreshCw size={18}  strokeWidth={2}/> {t("TEXT_REFRESH")}</button>
      </div>

      <TrainerMembersDirectoryAndProfileBroadcastModal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
      />
    </div>
  );
}
