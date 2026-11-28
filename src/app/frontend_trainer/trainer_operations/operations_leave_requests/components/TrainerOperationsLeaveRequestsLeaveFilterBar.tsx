"use client";

import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface TrainerOperationsLeaveRequestsLeaveFilterBarProps {
  statusFilter: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED';
  setStatusFilter: (val: 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED') => void;
  typeFilter: string;
  setTypeFilter: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  totalRequests: number;
  approvedCount: number;
  pendingCount: number;
  rejectedCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function TrainerOperationsLeaveRequestsLeaveFilterBar({
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  searchQuery,
  setSearchQuery,
  totalRequests,
  approvedCount,
  pendingCount,
  rejectedCount,
  hasActiveFilters,
  onClearFilters,
}: TrainerOperationsLeaveRequestsLeaveFilterBarProps) {
  const t = useTranslations('TRAINER_SCHEDULE');

  return (
    <div className="p-4 border-b border-border bg-surface-highlight flex flex-wrap items-center justify-between gap-3">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => setStatusFilter('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
            statusFilter === 'ALL'
              ? 'bg-primary text-on-primary border-primary shadow-sm'
              : 'bg-input text-secondary border-border hover:text-primary'
          }`}
        >
          {t('TEXT_ALL')} ({totalRequests})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('PENDING')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
            statusFilter === 'PENDING'
              ? 'bg-warning-bg text-warning border-warning shadow-sm font-bold'
              : 'bg-input text-secondary border-border hover:text-warning'
          }`}
        >
          {t('TEXT_STATUS_PENDING')} ({pendingCount})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('APPROVED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
            statusFilter === 'APPROVED'
              ? 'bg-success-bg text-success border-success shadow-sm font-bold'
              : 'bg-input text-secondary border-border hover:text-success'
          }`}
        >
          {t('TEXT_STATUS_APPROVED')} ({approvedCount})
        </button>
        <button
          type="button"
          onClick={() => setStatusFilter('REJECTED')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
            statusFilter === 'REJECTED'
              ? 'bg-danger-bg text-danger border-danger shadow-sm font-bold'
              : 'bg-input text-secondary border-border hover:text-danger'
          }`}
        >
          {t('TEXT_STATUS_REJECTED')} ({rejectedCount})
        </button>
      </div>

      {/* Leave Type Dropdown & Search */}
      <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="min-h-9 w-full sm:w-auto rounded-xl border border-border bg-input px-3 text-xs text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          aria-label="Filter by leave type"
        >
          <option value="ALL">All Leave Types</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Emergency">Emergency</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>

        <div className="relative w-full sm:w-auto sm:min-w-[180px]">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('TEXT_SEARCH_LEAVES')}
            className="w-full pl-8 pr-7 py-1.5 bg-input border border-border rounded-xl text-xs text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5"
              aria-label="Clear search"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-xs text-rose-500 font-semibold px-2.5 py-1 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 motion-safe:transition-colors"
          >
            {t('TEXT_CLEAR_FILTERS')}
          </button>
        )}
      </div>
    </div>
  );
}

export const TrainerLeaveFilterBar = TrainerOperationsLeaveRequestsLeaveFilterBar;
export type TrainerLeaveFilterBarProps = TrainerOperationsLeaveRequestsLeaveFilterBarProps;
