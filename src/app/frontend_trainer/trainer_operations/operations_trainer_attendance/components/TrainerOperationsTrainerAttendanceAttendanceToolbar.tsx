"use client";
// RESPONSIBILITY: Toolbar for Attendance — tabs, search, date filter, view-mode toggle, and action buttons.
// DATA FLOW: props (from TrainerAttendanceMain) → URL state via useTrainerAttendanceFilters setters
import { useEffect, useState } from 'react';

import { RefreshCw, Search, Calendar as CalendarIcon, List, Plus, LogIn, LogOut, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TRAINER_ATTENDANCE_TABS, TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceConstants';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceTrainerInfrastructureSearchableDropdown';

import type { TrainerAttendanceToolbarProps } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceToolbarTypes';








/**
 * @description Toolbar for Attendance — tabs, search, date filter, view-mode toggle, and action buttons.
 * @dependencies props (from TrainerAttendanceMain) → URL state via useTrainerAttendanceFilters setters
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the attendance feature's filtering and control surface, preserving URL/query state and accessible interaction semantics.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceToolbar({
  tab, setTab, viewMode, search, setSearch,
  filterDate, setFilterDate,
  onAddRecord, onRefresh, onSelfCheckIn, onSelfCheckOut,
  selfCheckInPending, selfCheckOutPending, isRefreshing,
  setViewMode,
}: TrainerAttendanceToolbarProps) {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => { setLocalSearch(search); }, [search]);


  return (
    <div className="border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center ">
      {/* Tabs */}
      <div className="flex ">
        {TRAINER_ATTENDANCE_TABS.map((tabOption) => (
          <button type="button"
            key={tabOption}
            onClick={() => setTab(tabOption)}
            aria-pressed={tab === tabOption}
            className={`px-5 py-3.5 text-sm font-medium motion-safe:transition-colors border-b-2 ${
              tab === tabOption
                ? 'text-primary bg-primary-subtle border-focus'
                : 'border-transparent text-secondary hover:text-primary'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid={`trainer_attendance-attendance-toolbar-tab-${tabOption.toLowerCase()}`}>
            {t(tabOption === 'MEMBERS' ? 'TEXT_MEMBERS_TAB' : 'TEXT_MY_ATTENDANCE_TAB')}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="px-4 py-2.5 flex flex-wrap gap-2 items-center ">
        {/* My Attendance view toggle */}
        {tab === 'MY_ATTENDANCE' && setViewMode && (
          <div className="flex bg-input border border-border rounded-lg p-0.5 ">
            <button type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'calendar' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_attendance-trainerattendancetoolbar-button_2">
              <CalendarIcon size={18} strokeWidth={2} /> {t("TEXT_CALENDAR")}</button>
            <button type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md motion-safe:transition-all ${
                viewMode === 'table' ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_attendance-trainerattendancetoolbar-button_3">
              <List size={18}  strokeWidth={2}/> {t("TEXT_LIST")}</button>
          </div>
        )}

        {/* Search */}
        <div className="relative ">
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary "  strokeWidth={2}/>
          <label htmlFor="trainer-attendance-search" className="sr-only ">{t('TEXT_SEARCH_PLACEHOLDER')}</label>
          <input
            id="trainer-attendance-search"
            value={localSearch}
            onChange={e => { const value = e.target.value; setLocalSearch(value); setSearch(value); }}
            placeholder={t('TEXT_SEARCH_PLACEHOLDER')}
            className="ps-9 pe-3 py-2 border border-border bg-input text-primary rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring w-40 sm:w-56  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancetoolbar-input_4"/>
        </div>

        {/* Date filter */}
        <TrainerInfrastructureSearchableDropdown
          options={TRAINER_ATTENDANCE_DATE_FILTER_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
          value={filterDate}
          onChange={(val: string | number) => setFilterDate(String(val))}
          placeholder={t("TEXT_FILTER_BY_DATE")}
          ariaLabel={t("TEXT_FILTER_BY_DATE")}
          className="w-36 "
         testId="trainer-attendance-attendance-toolbar-filter"/>

        {/* Refresh */}
        <button type="button"
          onClick={onRefresh}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
          aria-label={t("TEXT_REFRESH_ATTENDANCE_RECORDS")} data-testid="trainer_attendance-attendance-toolbar_refresh">
          {isRefreshing ? <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> : <RefreshCw size={18} strokeWidth={2} />}
        </button>

        {/* Self Check-in / Check-out (My Attendance tab only) */}
        {tab === 'MY_ATTENDANCE' && (
          <>
            <button type="button"
              onClick={onSelfCheckIn}
              disabled={selfCheckInPending}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-28 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-success text-on-success rounded-lg hover:bg-success disabled:opacity-70 motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancetoolbar-button_7">
              {selfCheckInPending ? <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> : <LogIn size={18} strokeWidth={2}/>}
              {t("TEXT_CHECK_IN")}</button>
            <button type="button"
              onClick={onSelfCheckOut}
              disabled={selfCheckOutPending}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-28 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-warning-bg text-warning rounded-lg hover:bg-warning-bg disabled:opacity-70 motion-safe:transition-colors motion-safe:duration-base motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancetoolbar-button_8">
              {selfCheckOutPending ? <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/> : <LogOut size={18} strokeWidth={2}/>}
              {t("TEXT_CHECK_OUT")}</button>
          </>
        )}

        {/* Add Record */}
        {tab === 'MEMBERS' && (
          <button type="button"
            onClick={onAddRecord}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-28 min-h-11 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-primary-subtle text-primary rounded-lg hover:bg-primary-subtle motion-safe:transition-colors motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-attendance-toolbar_add">
            <Plus size={18} strokeWidth={2}/> {t("TEXT_ADD_RECORD")}</button>
        )}
      </div>
    </div>
  );
}

