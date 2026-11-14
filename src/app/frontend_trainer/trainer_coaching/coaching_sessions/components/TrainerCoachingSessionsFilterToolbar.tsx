"use client";

import { Calendar as CalendarIcon, Download, Filter, Plus, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  TRAINER_SESSIONS_SESSION_FILTER_OPTIONS,
  TRAINER_SESSIONS_SESSION_STATUS,
  TRAINER_SESSIONS_SESSION_TYPE,
} from '../config/TrainerCoachingSessionsConstants';
import type { TrainerSessionsSessionFilter } from '../types/TrainerCoachingSessionsTypes';

interface FilterToolbarProps {
  filter: TrainerSessionsSessionFilter;
  setFilter: (val: TrainerSessionsSessionFilter) => void;
  date: string;
  setDate: (val: string) => void;
  statusDropdown: string;
  setStatusDropdown: (val: string) => void;
  sessionType: string;
  setSessionType: (val: string) => void;
  memberFilter: string;
  setMemberFilter: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  memberOptions: Array<{ value: string; label: string }>;
  onScheduleClick: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function TrainerCoachingSessionsFilterToolbar({
  filter,
  setFilter,
  date,
  setDate,
  statusDropdown,
  setStatusDropdown,
  sessionType,
  setSessionType,
  memberFilter,
  setMemberFilter,
  searchQuery,
  setSearchQuery,
  memberOptions,
  onScheduleClick,
  onClearFilters,
  hasActiveFilters,
}: FilterToolbarProps) {
  const t = useTranslations('TRAINER_SESSIONS');

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border p-4 space-y-3.5">
      {/* Top row: Dropdown filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search box */}
          <div className="relative min-w-[180px] max-w-xs flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions or clients..."
              aria-label="Search sessions or clients"
              className="w-full pl-8 pr-7 py-2 bg-input border border-border rounded-xl text-xs text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="session-status-filter" className="sr-only">Filter by Status</label>
            <select
              id="session-status-filter"
              value={statusDropdown}
              onChange={(e) => setStatusDropdown(e.target.value)}
              aria-label="Filter by session status"
              className="min-h-10 rounded-xl border border-border bg-input px-3 py-1.5 text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <option value="ALL">All Statuses</option>
              <option value={TRAINER_SESSIONS_SESSION_STATUS.UPCOMING}>Upcoming</option>
              <option value={TRAINER_SESSIONS_SESSION_STATUS.COMPLETED}>Completed</option>
              <option value={TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW}>No Show</option>
            </select>
          </div>

          {/* Session Type Dropdown Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="session-type-filter" className="sr-only">Filter by Session Type</label>
            <select
              id="session-type-filter"
              value={sessionType}
              onChange={(e) => {
                const val = e.target.value;
                setSessionType(val);
                if (val === TRAINER_SESSIONS_SESSION_TYPE.PT) setFilter('PT');
                else if (val === TRAINER_SESSIONS_SESSION_TYPE.GROUP) setFilter('Group');
                else setFilter('All');
              }}
              aria-label="Filter by session type"
              className="min-h-10 rounded-xl border border-border bg-input px-3 py-1.5 text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <option value="ALL">All Session Types</option>
              <option value={TRAINER_SESSIONS_SESSION_TYPE.PT}>1-on-1 PT Sessions</option>
              <option value={TRAINER_SESSIONS_SESSION_TYPE.GROUP}>Group Classes</option>
            </select>
          </div>

          {/* Client / Member Dropdown Filter */}
          <div className="flex items-center gap-1.5">
            <label htmlFor="session-client-filter" className="sr-only">Filter by Client</label>
            <select
              id="session-client-filter"
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
              aria-label="Filter by client name"
              className="min-h-10 rounded-xl border border-border bg-input px-3 py-1.5 text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring max-w-[160px] truncate"
            >
              <option value="ALL">All Clients</option>
              {memberOptions.map((opt) => (
                <option key={opt.value} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-1.5 bg-input border border-border rounded-xl px-2.5 py-1">
            <CalendarIcon size={14} className="text-secondary pointer-events-none" aria-hidden="true" />
            <label htmlFor="trainer-sessions-date-input" className="sr-only">{t('TEXT_SESSION_DATE')}</label>
            <input
              id="trainer-sessions-date-input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-primary text-xs focus-visible:outline-none"
              aria-label="Filter sessions by date"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="min-h-10 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-secondary hover:text-danger rounded-lg border border-border hover:bg-input motion-safe:transition-colors"
            >
              <X size={12} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Action Buttons: Export & Schedule */}
        <div className="flex items-center gap-2">
          <a
            href="/__mocks__/trainer/sessions_export.csv"
            download="trainer_sessions_schedule.csv"
            className="min-h-10 inline-flex items-center gap-1.5 px-3 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-input text-primary motion-safe:transition-colors"
            data-testid="trainer_sessions-export-csv"
          >
            <Download size={14} />
            <span>Export</span>
          </a>
          <button
            type="button"
            onClick={onScheduleClick}
            className="min-h-10 flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-hover shadow-sm motion-safe:transition-all motion-safe:active:scale-95"
            data-testid="trainer_sessions-main-schedule"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>{t('TEXT_SCHEDULE_PT')}</span>
          </button>
        </div>
      </div>

      {/* Quick Status Filter Tabs row */}
      <div className="flex items-center gap-1 border-t border-border/60 pt-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-secondary mr-2 flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        <div className="flex bg-input rounded-xl p-1 gap-1">
          {TRAINER_SESSIONS_SESSION_FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setFilter(option.value);
                if (option.value === 'PT') setSessionType(TRAINER_SESSIONS_SESSION_TYPE.PT);
                else if (option.value === 'Group') setSessionType(TRAINER_SESSIONS_SESSION_TYPE.GROUP);
                else setSessionType('ALL');
              }}
              aria-pressed={filter === option.value}
              className={`px-3 py-1 text-xs font-semibold rounded-lg motion-safe:transition-all ${
                filter === option.value
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
              data-testid={`trainer_sessions-sessions-filter-${option.value.toLowerCase()}`}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
