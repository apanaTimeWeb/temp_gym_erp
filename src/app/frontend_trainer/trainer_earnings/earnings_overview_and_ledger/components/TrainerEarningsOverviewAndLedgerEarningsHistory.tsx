"use client";
// RESPONSIBILITY: Renders the browseable Trainer earnings ledger with URL-backed search, date filters, sorting, pagination, and expandable record details.
/**
 * @description Renders the Trainer earnings history table with localized monetary/date presentation and accessible row data.
 * @dependencies Consumes earnings query results and module-local formatter/configuration contracts.
 * @edge-cases Handles nullable descriptions/dates, localized currency formatting, empty history, long text truncation, and stable loading layout.
 */
import { Fragment, useEffect, useState } from 'react';

import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, Search, Receipt, Download, FileText } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { displayValue } from '@/lib/display_value';
import TrainerEarningsEmptyState from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsEmptyState';

import { TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE, TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS, TRAINER_EARNINGS_PAYOUT_STATUS_STYLES } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';

import { useTrainerEarningsQuery } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/useTrainerEarningsOverviewAndLedgerEarningsQuery';

import { TrainerEarningsFormatDate, TrainerEarningsFormatNumber } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters';

import { TrainerEarningsFormatCurrency } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency';

import { useTrainerInfrastructureDebounce } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/hooks/TrainerEarningsOverviewAndLedgeruseTrainerInfrastructureDebounce';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureTooltip';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerTrainerInfrastructureSkeletonBlock';
import TrainerEarningsOverviewAndLedgerPayslipModal from './TrainerEarningsOverviewAndLedgerPayslipModal';
import type { TrainerEarningsHistoryRow } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsTypes';

import type { TrainerEarningsDateField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsDateRangeTypes';

import type { TrainerEarningsEarningsSortDirection, TrainerEarningsEarningsSortField } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsSortTypes';

// DATA FLOW: local search input -> 300ms debounce -> URL params -> TanStack Query -> earnings rows; row expansion is UI-only.













/**
 * @description Renders the browseable Trainer earnings ledger with URL-backed search, date filters, sorting, pagination, and expandable record details.
 * @dependencies local search input -> 300ms debounce -> URL params -> TanStack Query -> earnings rows; row expansion is UI-only.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the read-only Trainer earnings history with sorting, mobile card fallback, expansion, and locale-aware money/date formatting.
 * @dependencies Earnings query data, module constants, and feature-local formatters.
 * @edge-case Nullable payout fields render the canonical placeholder and financial values remain in minor units until display.
 */
/**
 * @description Owns the earnings feature UI responsibility represented by TrainerEarningsHistory, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsHistory() {
  const t = useTranslations('TRAINER_EARNINGS');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [draftSearch, setDraftSearch] = useState(searchParams.get('search') ?? '');
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [selectedPayslipRow, setSelectedPayslipRow] = useState<TrainerEarningsHistoryRow | null>(null);
  const debouncedSearch = useTrainerInfrastructureDebounce(draftSearch, 300);

  const search = searchParams.get('search') ?? '';
  const currentPageValue = Number(searchParams.get('page') ?? '1');
  const currentPage = Number.isInteger(currentPageValue) && currentPageValue > 0 ? currentPageValue : 1;
  const sortByValue = searchParams.get('sortBy') ?? TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS[0].value;
  const sortBy: TrainerEarningsEarningsSortField = TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS.some((option) => option.value === sortByValue) ? sortByValue as TrainerEarningsEarningsSortField : TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS[0].value;
  const sortDirection: TrainerEarningsEarningsSortDirection = searchParams.get('sortDirection') === 'asc' ? 'asc' : 'desc';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';

  /* Synchronizes the debounced search input into URL state; the 300ms debounce is the server-search boundary. */
// Effect contract: synchronize local earnings controls with the URL/query state and reset pagination when filters change.
  useEffect(() => {
    if (debouncedSearch === search) return;
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set('search', debouncedSearch);
    else params.delete('search');
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, pathname, router, search, searchParams]);

  /* Keeps draft input synchronized with browser back/forward navigation without overwriting active typing mid-debounce. */
// Effect contract: synchronize local earnings controls with the URL/query state and reset pagination when filters change.
  useEffect(() => {
    if (draftSearch !== search && debouncedSearch === draftSearch) setDraftSearch(search);
  }, [debouncedSearch, draftSearch, search]);

  const updateUrlParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => updateUrlParam('page', String(page));

  const handleSort = (field: TrainerEarningsEarningsSortField) => {
    const direction = field === sortBy && sortDirection === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', field);
    params.set('sortDirection', direction);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleDateChange = (key: TrainerEarningsDateField, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', 'custom');
    if (value) params.set(key, value);
    else params.delete(key);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  

  const { data, isPending, isError, isFetching, refetch } = useTrainerEarningsQuery();

  const history = data?.history ?? [];
  const hasPaginationMetadata = Boolean(
    data &&
    typeof data.historyTotal === 'number' &&
    typeof data.historyPage === 'number' &&
    typeof data.historyLimit === 'number' &&
    data.historyPage === currentPage &&
    data.historyLimit === TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE
  );
  const totalPages = hasPaginationMetadata && data
    ? Math.max(1, Math.ceil(data.historyTotal! / data.historyLimit!))
    : 1;

  if (isPending) {
    return <div className="p-4 space-y-3 " aria-busy="true" aria-label={t("TEXT_LOADING_EARNINGS_LEDGER")} data-testid="trainer_earnings-earnings-history_loading_earnings_ledger">{Array.from({ length: 6 }, (_, index) => <TrainerInfrastructureSkeletonBlock key={`earnings-row-${index + 1}`} className="h-14 rounded-lg border border-border " />)}</div>;
  }

  if (isError || !data || !hasPaginationMetadata) {
    return <div className="m-4 p-5 bg-danger-bg border border-border rounded-xl " role="alert" data-testid={data && !isError && !hasPaginationMetadata ? "trainer_earnings-earnings-history_pagination_metadata_error" : "trainer_earnings-earnings-history_unable_to_load_earnings_history"}><p className="text-sm text-danger " data-testid="trainer_earnings-history-error_state">{t("TEXT_UNABLE_TO_LOAD_EARNINGS_HISTORY")}</p><button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_earnings-trainerearningshistory-button_1">{isFetching ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2}/>{t("TEXT_RETRYING")}</> : t("TEXT_RETRY")}</button></div>;
  }

  return (
    <div className="bg-card border border-border rounded-xl flex flex-col h-full overflow-hidden ">
      <div className="p-4 border-b border-border bg-header flex flex-col xl:flex-row gap-3 items-start xl:items-center justify-between ">
        <h2 className="text-section-title font-semibold text-primary ">{t("TEXT_EARNINGS_LEDGER")}</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto xl:items-center flex-wrap">
          <div className="relative w-full sm:w-64 ">
            <Search size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary " aria-hidden="true"  strokeWidth={2}/>
            <label htmlFor="trainer-earnings-search" className="sr-only ">{t("TEXT_SEARCH_EARNINGS_DESCRIPTIONS")}</label>
            <input id="trainer-earnings-search" type="search" placeholder={t("TEXT_SEARCH_DESCRIPTIONS")} value={draftSearch} onChange={(event) => setDraftSearch(event.target.value)} className="w-full min-h-11 ps-9 pe-4 bg-input border border-border rounded-lg text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_earnings-earnings-history_search"/>
          </div>
          <div className="flex flex-wrap items-center gap-2 ">
            <label htmlFor="trainer-earnings-history-start-date" className="sr-only ">{t("TEXT_START_DATE_FF99F5")}</label>
            <input id="trainer-earnings-history-start-date" type="date" value={startDate} onChange={(event) => handleDateChange('startDate', event.target.value)} className="min-h-11 px-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_earnings-earnings-history_start_date"/>
            <span className="text-secondary text-sm " aria-hidden="true">{t("TEXT_TO")}</span>
            <label htmlFor="trainer-earnings-history-end-date" className="sr-only ">{t("TEXT_END_DATE_89D10C")}</label>
            <input id="trainer-earnings-history-end-date" type="date" value={endDate} onChange={(event) => handleDateChange('endDate', event.target.value)} className="min-h-11 px-2 bg-input border border-border rounded-lg text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_earnings-earnings-history_end_date"/>
            
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

      <div className="flex-1 overflow-x-auto custom-scrollbar ">
        {history.length === 0 ? <TrainerEarningsEmptyState /> : (
          <>
          <div className="md:hidden divide-y divide-border ">{history.map((row) => { const style = TRAINER_EARNINGS_PAYOUT_STATUS_STYLES[row.status]; return <article key={row.id} className="p-4 bg-card " data-testid={`trainer_earnings-history-card${row.id}`}><div className="flex items-start justify-between gap-3 "><div className="min-w-0 "><TrainerInfrastructureTooltip content={row.description}><p className="font-medium text-primary truncate ">{row.description}</p></TrainerInfrastructureTooltip><p className="text-xs text-secondary mt-1 ">{TrainerEarningsFormatDate(row.date, locale)} · {t(`TEXT_TYPE_${row.type.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`)}</p></div><span className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${style?.bg ?? 'bg-input'} ${style?.text ?? 'text-secondary'} `} data-testid={`trainer_earnings-earnings-history-mobile-status-${row.id}`}>{style ? t(`TEXT_STATUS_${row.status.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`) : t('TEXT_STATUS_UNKNOWN')}</span></div><div className="mt-3 flex items-center justify-between gap-3 "><span className="text-xs text-secondary ">{t('TEXT_NET_PAYOUT')}</span><span className="text-sm font-semibold text-primary ">{row.netPayout == null ? displayValue(row.netPayout) : TrainerEarningsFormatCurrency(row.netPayout, row.currency, locale)}</span></div><div className="mt-2.5 pt-2 border-t border-border/60 flex justify-end"><button type="button" onClick={() => setSelectedPayslipRow(row)} className="min-h-8 inline-flex items-center gap-1.5 px-3 py-1 bg-input hover:bg-input/80 text-primary border border-border rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid={`trainer_earnings-mobile-view-payslip-${row.id}`}><Receipt size={13} />View Payslip</button></div></article>})}</div>
          <div className="hidden md:block overflow-x-auto custom-scrollbar "><table className="w-full min-w-full text-start border-collapse ">
            <thead>
              <tr className="bg-surface-highlight border-b border-border " data-testid="trainer_earnings-TrainerEarningsHistory-row-1">
                {TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS.map((column) => {
                  const active = sortBy === column.value;
                  const SortIcon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                  return <th key={column.value} scope="col" className={`py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider ${column.value === 'amount' || column.value === 'status' ? 'text-end' : ''} `}><button type="button" onClick={() => handleSort(column.value)} className="min-w-11 inline-flex items-center gap-1 min-h-11 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={`${t(`TEXT_SORT_${column.value.toUpperCase()}`)}: ${active ? (sortDirection === 'asc' ? t("TEXT_DESCENDING") : t("TEXT_ASCENDING")) : t("TEXT_ASCENDING")}`} data-testid={`trainer_earnings-earnings-history-sort-${column.value}`}>{t(`TEXT_SORT_${column.value.toUpperCase()}`)}<SortIcon size={18} strokeWidth={2} aria-hidden="true" className={active ? 'text-primary' : 'text-secondary'} /></button></th>;
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border ">
              {history.map((row) => {
                const style = TRAINER_EARNINGS_PAYOUT_STATUS_STYLES[row.status];
                const expanded = expandedRowId === row.id;
                return (
                  <Fragment key={row.id}>
                    <tr data-testid={`trainer_earnings-earnings-history-row-${row.id}`} tabIndex={0} aria-expanded={expanded} aria-controls={`trainer-earnings-row-${row.id}-details`} onClick={() => setExpandedRowId(expanded ? null : row.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedRowId(expanded ? null : row.id); } }} className="cursor-pointer hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring">
                      <td className="cursor-pointer py-3 px-4 text-sm text-secondary whitespace-nowrap ">{TrainerEarningsFormatDate(row.date, locale)}</td>
                      <td className="py-3 px-4 "><TrainerInfrastructureTooltip content={row.description}><p className="text-sm font-medium text-primary truncate max-w-80 ">{row.description}</p></TrainerInfrastructureTooltip><p className="text-xs text-secondary mt-0.5 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95">{t(`TEXT_TYPE_${row.type.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`)}</p></td>
                      <td className="py-3 px-4 text-sm font-semibold text-primary text-end whitespace-nowrap ">{TrainerEarningsFormatCurrency(row.amount, row.currency, locale)}</td>
                      <td className="py-3 px-4 text-end "><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${style?.bg ?? 'bg-input'} ${style?.text ?? 'text-secondary'} `} data-testid={`trainer_earnings-earnings-history-status-${row.id}`}>{style ? t(`TEXT_STATUS_${row.status.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`) : t('TEXT_STATUS_UNKNOWN')}</span></td>
                    </tr>
                    {expanded && <tr id={`trainer-earnings-row-${row.id}-details`} key={`${row.id}-details`} data-testid="trainer_earnings-TrainerEarningsHistory-row-2"><td colSpan={4} className="px-4 py-3 bg-input "><div className="flex flex-wrap items-center justify-between gap-3 text-xs text-secondary "><div className="flex flex-wrap gap-4"><span><strong className="text-primary ">{t("TEXT_SESSION_ID")}</strong> {displayValue(row.sessionId)}</span><span><strong className="text-primary ">{t("TEXT_INVOICE")}</strong> {displayValue(row.invoiceNumber)}</span><span><strong className="text-primary ">{t("TEXT_NET_PAYOUT")}</strong> {row.netPayout == null ? displayValue(row.netPayout) : TrainerEarningsFormatCurrency(row.netPayout, row.currency, locale)}</span></div><button type="button" onClick={(e) => { e.stopPropagation(); setSelectedPayslipRow(row); }} className="min-h-8 inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid={`trainer_earnings-view-payslip-${row.id}`}><Receipt size={13} />View Payslip</button></div></td></tr>}
                  </Fragment>
                );
              })}
            </tbody>
          </table></div>
          </>
        )}
      </div>

      {totalPages > 1 && <div className="p-3 border-t border-border bg-header flex items-center justify-between gap-3 text-sm "><span className="text-secondary ">{t("TEXT_PAGE")}{TrainerEarningsFormatNumber(currentPage, locale)} {t("TEXT_OF")}{TrainerEarningsFormatNumber(totalPages, locale)}</span><div className="flex gap-2 "><button type="button" onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="min-h-11 min-w-24 px-3 rounded-lg border border-border bg-card text-primary disabled:opacity-50 hover:bg-primary-subtle hover:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_earnings-trainerearningshistory-button_7">{t("TEXT_PREVIOUS")}</button><button type="button" onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="min-h-11 min-w-24 px-3 rounded-lg border border-border bg-card text-primary disabled:opacity-50 hover:bg-primary-subtle hover:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring " data-testid="trainer_earnings-trainerearningshistory-button_8">{t("TEXT_NEXT")}</button></div></div>}

      <TrainerEarningsOverviewAndLedgerPayslipModal
        isOpen={Boolean(selectedPayslipRow)}
        row={selectedPayslipRow}
        onClose={() => setSelectedPayslipRow(null)}
      />
    </div>
  );
}
