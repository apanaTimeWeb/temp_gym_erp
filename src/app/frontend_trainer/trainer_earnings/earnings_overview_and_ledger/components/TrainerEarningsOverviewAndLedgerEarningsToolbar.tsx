"use client";

import { Download, Printer, RefreshCw, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { TrainerEarningsDateField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsDateRangeTypes';

interface TrainerEarningsToolbarProps {
  draftSearch: string;
  setDraftSearch: (value: string) => void;
  statusFilter: string;
  typeFilter: string;
  startDate: string;
  endDate: string;
  updateUrlParam: (key: string, value: string | null) => void;
  handleDateChange: (key: TrainerEarningsDateField, value: string) => void;
  onExportCsv?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function TrainerEarningsOverviewAndLedgerEarningsToolbar({
  draftSearch,
  setDraftSearch,
  statusFilter,
  typeFilter,
  startDate,
  endDate,
  updateUrlParam,
  handleDateChange,
  onExportCsv,
  onRefresh,
  isRefreshing = false,
}: TrainerEarningsToolbarProps) {
  const t = useTranslations('TRAINER_EARNINGS');
  const hasActiveFilters = Boolean(draftSearch.trim()) || statusFilter !== 'ALL' || typeFilter !== 'ALL' || Boolean(startDate) || Boolean(endDate);

  const handleClearAll = () => {
    setDraftSearch('');
    updateUrlParam('search', null);
    updateUrlParam('status', null);
    updateUrlParam('type', null);
    updateUrlParam('startDate', null);
    updateUrlParam('endDate', null);
  };

  return (
    <div className="p-4 border-b border-border bg-surface-highlight flex flex-col xl:flex-row gap-3 items-start xl:items-center justify-between">
      <h2 className="text-section-title font-semibold text-text-primary">{t("TEXT_EARNINGS_LEDGER")}</h2>
      <div className="flex flex-col sm:flex-row gap-2.5 w-full xl:w-auto xl:items-center flex-wrap">
        <div className="relative w-full sm:w-64 sm:min-w-[200px]">
          <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none w-4 h-4" aria-hidden="true" strokeWidth={2} />
          <label htmlFor="trainer-earnings-search" className="sr-only">{t("TEXT_SEARCH_EARNINGS_DESCRIPTIONS")}</label>
          <input
            id="trainer-earnings-search"
            type="search"
            placeholder={t("TEXT_SEARCH_DESCRIPTIONS")}
            value={draftSearch}
            onChange={(event) => setDraftSearch(event.target.value)}
            className="w-full min-h-10 pl-9 pr-8 py-2 bg-input border border-border rounded-xl text-xs sm:text-sm text-text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all"
            data-testid="trainer_earnings-earnings-history_search"
          />
          {draftSearch && (
            <button
              type="button"
              onClick={() => { setDraftSearch(''); updateUrlParam('search', null); }}
              aria-label="Clear search"
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1 rounded-md"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            id="trainer-earnings-status-filter"
            value={statusFilter}
            onChange={(e) => updateUrlParam('status', e.target.value === 'ALL' ? null : e.target.value)}
            className="min-h-10 px-3 bg-white dark:bg-[#0F172A] dark:[color-scheme:dark] border border-border rounded-xl text-xs font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Filter by Status"
            data-testid="trainer_earnings-filter-status"
          >
            <option value="ALL">All Statuses</option>
            <option value="settled">Settled / Paid</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
          </select>

          <select
            id="trainer-earnings-type-filter"
            value={typeFilter}
            onChange={(e) => updateUrlParam('type', e.target.value === 'ALL' ? null : e.target.value)}
            className="min-h-10 px-3 bg-white dark:bg-[#0F172A] dark:[color-scheme:dark] border border-border rounded-xl text-xs font-medium text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            aria-label="Filter by Type"
            data-testid="trainer_earnings-filter-type"
          >
            <option value="ALL">All Types</option>
            <option value="Commission">PT Commission</option>
            <option value="Bonus">Target Bonus</option>
            <option value="Session">PT Session</option>
          </select>

          <label htmlFor="trainer-earnings-history-start-date" className="sr-only">{t("TEXT_START_DATE_FF99F5")}</label>
          <input
            id="trainer-earnings-history-start-date"
            type="date"
            value={startDate}
            onChange={(event) => handleDateChange('startDate', event.target.value)}
            className="min-h-10 px-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-text-primary dark:[color-scheme:dark] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            data-testid="trainer_earnings-earnings-history_start_date"
          />
          <span className="text-secondary text-xs sm:text-sm" aria-hidden="true">{t("TEXT_TO")}</span>
          <label htmlFor="trainer-earnings-history-end-date" className="sr-only">{t("TEXT_END_DATE_89D10C")}</label>
          <input
            id="trainer-earnings-history-end-date"
            type="date"
            value={endDate}
            onChange={(event) => handleDateChange('endDate', event.target.value)}
            className="min-h-10 px-2.5 bg-input border border-border rounded-xl text-xs sm:text-sm text-text-primary dark:[color-scheme:dark] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            data-testid="trainer_earnings-earnings-history_end_date"
          />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-rose-500 font-semibold px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
            >
              Clear All
            </button>
          )}

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Refresh earnings ledger"
              title="Refresh earnings ledger"
              data-testid="trainer_earnings-refresh-button"
              className="min-h-10 min-w-10 inline-flex items-center justify-center px-3 py-1.5 border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 rounded-xl text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={14} className={isRefreshing ? 'motion-safe:animate-spin' : ''} aria-hidden="true" />
            </button>
          )}

          <button
            type="button"
            onClick={onExportCsv}
            className="min-h-10 inline-flex items-center gap-1.5 px-3 py-1.5 border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-300 rounded-xl text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all cursor-pointer"
            data-testid="trainer_earnings-export-csv-button"
          >
            <Download size={14} />
            CSV
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-10 inline-flex items-center gap-1.5 px-3 py-1.5 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 rounded-xl text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all cursor-pointer"
            data-testid="trainer_earnings-export-pdf-button"
          >
            <Printer size={14} />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
