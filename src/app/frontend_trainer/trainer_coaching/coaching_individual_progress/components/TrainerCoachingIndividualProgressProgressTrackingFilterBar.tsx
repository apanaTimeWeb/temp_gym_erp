"use client";

import { Search, X } from 'lucide-react';

export interface TrainerCoachingIndividualProgressProgressTrackingFilterBarProps {
  dateRangeFilter: 'all' | '30d' | '3m' | '6m' | 'this_year';
  setDateRangeFilter: (val: 'all' | '30d' | '3m' | '6m' | 'this_year') => void;
  bmiCategoryFilter: 'all' | 'normal' | 'overweight' | 'underweight' | 'body_fat';
  setBmiCategoryFilter: (val: 'all' | 'normal' | 'overweight' | 'underweight' | 'body_fat') => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filteredCount: number;
  totalEntries: number;
}

export function TrainerCoachingIndividualProgressProgressTrackingFilterBar({
  dateRangeFilter,
  setDateRangeFilter,
  bmiCategoryFilter,
  setBmiCategoryFilter,
  searchQuery,
  setSearchQuery,
  filteredCount,
  totalEntries,
}: TrainerCoachingIndividualProgressProgressTrackingFilterBarProps) {
  const hasActiveFilters = dateRangeFilter !== 'all' || bmiCategoryFilter !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="p-4 border-b border-border bg-surface-highlight flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
        {/* Quick Search */}
        <div className="relative min-w-[160px] max-w-xs flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes or date..."
            aria-label="Search progress notes"
            className="w-full pl-8 pr-7 py-1.5 bg-input border border-border rounded-xl text-xs text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
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

        {/* Date Range Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="progress-date-range-filter" className="sr-only">Date Range</label>
          <select
            id="progress-date-range-filter"
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value as typeof dateRangeFilter)}
            aria-label="Filter by date range"
            className="min-h-9 rounded-xl border border-border bg-input px-3 py-1 text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <option value="all">All Dates</option>
            <option value="30d">Last 30 Days</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="this_year">This Year</option>
          </select>
        </div>

        {/* Metric / Category Dropdown */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="progress-metric-filter" className="sr-only">Filter by Metric</label>
          <select
            id="progress-metric-filter"
            value={bmiCategoryFilter}
            onChange={(e) => setBmiCategoryFilter(e.target.value as typeof bmiCategoryFilter)}
            aria-label="Filter by BMI or metric"
            className="min-h-9 rounded-xl border border-border bg-input px-3 py-1 text-xs font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <option value="all">All BMI & Metrics</option>
            <option value="normal">Normal BMI (18.5 - 24.9)</option>
            <option value="overweight">Overweight (&gt; 25.0)</option>
            <option value="underweight">Underweight (&lt; 18.5)</option>
            <option value="body_fat">Has Body Fat % Logged</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setDateRangeFilter('all');
              setBmiCategoryFilter('all');
              setSearchQuery('');
            }}
            className="min-h-9 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-secondary hover:text-danger rounded-lg border border-border hover:bg-input motion-safe:transition-colors"
          >
            <X size={12} />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="text-xs text-secondary font-medium">
        Showing <span className="font-bold text-primary">{filteredCount}</span> of {totalEntries} entries
      </div>
    </div>
  );
}

export const TrainerProgressTrackingFilterBar = TrainerCoachingIndividualProgressProgressTrackingFilterBar;
export type FilterBarProps = TrainerCoachingIndividualProgressProgressTrackingFilterBarProps;
