'use client';
import type { TrainerOperationsMemberAttendanceToolbarModel } from '../types/TrainerOperationsOperationsMemberAttendanceAuxiliaryTypes';
// RESPONSIBILITY: Members-only attendance controls; never exposes trainer self-attendance actions.
import { useEffect, useState } from 'react';
import { Download, Loader2, Plus, RefreshCw, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSearchableDropdown';
import { TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS } from '../utils/TrainerOperationsMemberAttendanceAttendanceConstants';
import type { useTrainerAttendanceMain } from '../hooks/useTrainerOperationsMemberAttendanceAttendanceMain';


export default function TrainerOperationsMemberAttendanceMembersToolbar({
  model,
  onExportCsv,
  statusFilter = 'ALL',
  onStatusFilterChange,
}: {
  model: TrainerOperationsMemberAttendanceToolbarModel;
  onExportCsv?: () => void;
  statusFilter?: 'ALL' | 'IN_GYM' | 'CHECKED_OUT';
  onStatusFilterChange?: (val: 'ALL' | 'IN_GYM' | 'CHECKED_OUT') => void;
}) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const [search, setSearch] = useState(model.search);
  const [prevSearch, setPrevSearch] = useState(model.search);
  if (prevSearch !== model.search) {
    setPrevSearch(model.search);
    setSearch(model.search);
  }
  useEffect(() => {
    if (search === model.search) return;
    const timer = setTimeout(() => model.filters.setSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search, model.search, model.filters.setSearch]);
  const hasFilter = Boolean(search.trim()) || model.filterDate !== 'ALL_TIME' || statusFilter !== 'ALL';

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
      <label htmlFor="trainer-member-attendance-search" className="sr-only">{t('TEXT_SEARCH_PLACEHOLDER')}</label>
      <div className="relative min-w-0 flex-1 sm:max-w-64">
        <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute start-3 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" />
        <input id="trainer-member-attendance-search" type="search" value={search}
          onChange={(event) => setSearch(event.target.value)} placeholder={t('TEXT_SEARCH_PLACEHOLDER')}
          className="min-h-11 w-full rounded-lg border border-border bg-input ps-10 pe-8 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute end-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <TrainerInfrastructureSearchableDropdown
        options={TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS.map(option => ({ ...option, label: t(option.labelKey) }))}
        value={model.filterDate} onChange={value => model.filters.setFilterDate(String(value))}
        placeholder={t('TEXT_FILTER_BY_DATE')} ariaLabel={t('TEXT_FILTER_BY_DATE')} className="w-full sm:w-44"
        testId="trainer-member-attendance-filter-date" />
      {onStatusFilterChange && (
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as 'ALL' | 'IN_GYM' | 'CHECKED_OUT')}
          aria-label="Filter by check-in status"
          data-testid="trainer-member-attendance-filter-status"
          className="min-h-11 w-full sm:w-auto rounded-lg border border-border bg-white dark:bg-[#0F172A] dark:[color-scheme:dark] px-3 text-sm font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="IN_GYM">In Gym (Active)</option>
          <option value="CHECKED_OUT">Checked Out</option>
        </select>
      )}
      {hasFilter && (
        <button
          type="button"
          onClick={() => {
            setSearch('');
            model.filters.setFilterDate('ALL_TIME');
            onStatusFilterChange?.('ALL');
          }}
          className="min-h-11 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-rose-500 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
        >
          <X size={12} /> Clear All
        </button>
      )}
      <button type="button" onClick={() => void model.handleRefresh()} disabled={model.isRefreshing}
        aria-label={t('TEXT_REFRESH_ATTENDANCE_RECORDS')}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 px-4 text-sky-600 dark:text-sky-300 font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60 cursor-pointer">
        {model.isRefreshing ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <RefreshCw size={18} aria-hidden="true" />}
        <span>{t('TEXT_REFRESH')}</span>
      </button>
      {onExportCsv && (
        <button
          type="button"
          onClick={onExportCsv}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 px-3.5 text-sm text-teal-600 dark:text-teal-300 font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          data-testid="trainer-member-attendance-export-csv"
        >
          <Download size={16} aria-hidden="true" />
          <span>Export</span>
        </button>
      )}
      <button type="button" onClick={model.openModal} disabled={model.markAttendancePending}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary hover:bg-primary-hover px-4 font-semibold text-on-primary shadow-sm shadow-orange-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60">
        <Plus size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_ADD_RECORD')}
      </button>
    </div>
  );
}


export type { TrainerOperationsMemberAttendanceToolbarModel } from '../types/TrainerOperationsOperationsMemberAttendanceAuxiliaryTypes';
