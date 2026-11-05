'use client';
import type { TrainerOperationsMemberAttendanceToolbarModel } from '../types/TrainerOperationsOperationsMemberAttendanceAuxiliaryTypes';
// RESPONSIBILITY: Members-only attendance controls; never exposes trainer self-attendance actions.
import { useEffect, useState } from 'react';
import { Loader2, Plus, RefreshCw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureSearchableDropdown';
import { TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS } from '../utils/TrainerOperationsMemberAttendanceAttendanceConstants';
import type { useTrainerAttendanceMain } from '../hooks/useTrainerOperationsMemberAttendanceAttendanceMain';


export default function TrainerOperationsMemberAttendanceMembersToolbar({ model }: { model: Model }) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const [search, setSearch] = useState(model.search);
  // Keep the URL filter stable during rapid keyboard input (minimum 300ms debounce).
  useEffect(() => { setSearch(model.search); }, [model.search]);
  useEffect(() => {
    if (search === model.search) return;
    const timer = setTimeout(() => model.filters.setSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search, model.search, model.filters.setSearch]);
  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
      <label htmlFor="trainer-member-attendance-search" className="sr-only">{t('TEXT_SEARCH_PLACEHOLDER')}</label>
      <div className="relative min-w-0 flex-1 sm:max-w-64">
        <Search size={18} strokeWidth={2} aria-hidden="true" className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" />
        <input id="trainer-member-attendance-search" type="search" value={search}
          onChange={(event) => setSearch(event.target.value)} placeholder={t('TEXT_SEARCH_PLACEHOLDER')}
          className="min-h-11 w-full rounded-lg border border-border bg-input ps-10 pe-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
      </div>
      <TrainerInfrastructureSearchableDropdown
        options={TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS.map(option => ({ ...option, label: t(option.labelKey) }))}
        value={model.filterDate} onChange={value => model.filters.setFilterDate(String(value))}
        placeholder={t('TEXT_FILTER_BY_DATE')} ariaLabel={t('TEXT_FILTER_BY_DATE')} className="w-40"
        testId="trainer-member-attendance-filter-date" />
      <button type="button" onClick={() => void model.handleRefresh()} disabled={model.isRefreshing}
        aria-label={t('TEXT_REFRESH_ATTENDANCE_RECORDS')}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60">
        {model.isRefreshing ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" /> : <RefreshCw size={18} aria-hidden="true" />}
        <span>{t('TEXT_REFRESH')}</span>
      </button>
      <button type="button" onClick={model.openModal} disabled={model.markAttendancePending}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60">
        <Plus size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_ADD_RECORD')}
      </button>
    </div>
  );
}


export type { TrainerOperationsMemberAttendanceToolbarModel } from '../types/TrainerOperationsOperationsMemberAttendanceAuxiliaryTypes';
