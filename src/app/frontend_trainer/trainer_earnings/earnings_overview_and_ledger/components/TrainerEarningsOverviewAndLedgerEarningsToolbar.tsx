"use client";

import { Download, FileText, Search } from 'lucide-react';
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
}: TrainerEarningsToolbarProps) {
  const t = useTranslations('TRAINER_EARNINGS');

  return (
    <div className="p-4 border-b border-border bg-header flex flex-col xl:flex-row gap-3 items-start xl:items-center justify-between">
      <h2 className="text-section-title font-semibold text-primary">{t("TEXT_EARNINGS_LEDGER")}</h2>
      <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto xl:items-center flex-wrap">
        <div className="relative w-full sm:w-64">
          <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true" strokeWidth={2} />
          <label htmlFor="trainer-earnings-search" className="sr-only">{t("TEXT_SEARCH_EARNINGS_DESCRIPTIONS")}</label>
          <input
            id="trainer-earnings-search"
            type="search"
            placeholder={t("TEXT_SEARCH_DESCRIPTIONS")}
            value={draftSearch}
            onChange={(event) => setDraftSearch(event.target.value)}
            className="w-full min-h-11 ps-9 pe-4 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_earnings-earnings-history_search"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            id="trainer-earnings-status-filter"
            value={statusFilter}
            onChange={(e) => updateUrlParam('status', e.target.value === 'ALL' ? null : e.target.value)}
            className="min-h-11 px-3 bg-input border border-border rounded-lg text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
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
            className="min-h-11 px-3 bg-input border border-border rounded-lg text-xs font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            aria-label="Filter by Type"
            data-testid="trainer_earnings-filter-type"
          >
            <option value="ALL">All Types</option>
            <option value="session">PT Sessions</option>
            <option value="class">Group Classes</option>
            <option value="bonus">Bonus / Commission</option>
            <option value="salary">Base Salary</option>
          </select>

          <label htmlFor="trainer-earnings-history-start-date" className="sr-only">{t("TEXT_START_DATE_FF99F5")}</label>
          <input
            id="trainer-earnings-history-start-date"
            type="date"
            value={startDate}
            onChange={(event) => handleDateChange('startDate', event.target.value)}
            className="min-h-11 px-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_earnings-earnings-history_start_date"
          />
          <span className="text-secondary text-sm" aria-hidden="true">{t("TEXT_TO")}</span>
          <label htmlFor="trainer-earnings-history-end-date" className="sr-only">{t("TEXT_END_DATE_89D10C")}</label>
          <input
            id="trainer-earnings-history-end-date"
            type="date"
            value={endDate}
            onChange={(event) => handleDateChange('endDate', event.target.value)}
            className="min-h-11 px-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_earnings-earnings-history_end_date"
          />

          <a
            href="/__mocks__/trainer/earnings_export.csv"
            download="trainer_earnings_statement.csv"
            className="min-h-11 inline-flex items-center gap-1.5 px-3 py-2 bg-input hover:bg-input/80 text-primary border border-border rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all"
            data-testid="trainer_earnings-export-csv-button"
          >
            <Download size={14} />
            CSV
          </a>
          <a
            href="/__mocks__/trainer/earnings_statement.pdf"
            download="trainer_earnings_statement.pdf"
            className="min-h-11 inline-flex items-center gap-1.5 px-3 py-2 bg-input hover:bg-input/80 text-primary border border-border rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all"
            data-testid="trainer_earnings-export-pdf-button"
          >
            <FileText size={14} />
            PDF
          </a>
        </div>
      </div>
    </div>
  );
}
