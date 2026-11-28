"use client";
// RESPONSIBILITY: Renders the browseable Trainer earnings ledger with URL-backed search, date filters, sorting, pagination, and expandable record details.
/**
 * @description Renders the Trainer earnings history table with localized monetary/date presentation and accessible row data.
 * @dependencies Consumes earnings query results and module-local formatter/configuration contracts.
 * @edge-cases Handles nullable descriptions/dates, localized currency formatting, empty history, long text truncation, and stable loading layout.
 */
import { useEffect, useState, useMemo } from 'react';

import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Loader2, Receipt } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import CopyButton from '@/components/ui/CopyButton';
import { displayValue } from '@/lib/display_value';
import TrainerEarningsEmptyState from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsEmptyState';
import TrainerEarningsOverviewAndLedgerEarningsToolbar from './TrainerEarningsOverviewAndLedgerEarningsToolbar';

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

/**
 * @description Renders the Trainer earnings history table with localized monetary/date presentation and accessible row data.
 * @dependencies Consumes earnings query results and module-local formatter/configuration contracts.
 */
export default function TrainerEarningsHistory() {
  const t = useTranslations('TRAINER_EARNINGS');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [draftSearch, setDraftSearch] = useState(searchParams.get('search') ?? '');
  const [selectedPayslipRow, setSelectedPayslipRow] = useState<TrainerEarningsHistoryRow | null>(null);
  const debouncedSearch = useTrainerInfrastructureDebounce(draftSearch, 300);

  const search = searchParams.get('search') ?? '';
  const [prevSearch, setPrevSearch] = useState(search);
  if (prevSearch !== search) {
    setPrevSearch(search);
    setDraftSearch(search);
  }
  const statusFilter = searchParams.get('status') ?? 'ALL';
  const typeFilter = searchParams.get('type') ?? 'ALL';
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

  const filteredHistory = useMemo(() => {
    const history = data?.history ?? [];
    return history.filter((row) => {
      if (statusFilter !== 'ALL' && row.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      if (typeFilter !== 'ALL' && !row.type.toLowerCase().includes(typeFilter.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [data?.history, statusFilter, typeFilter]);
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
    return <div className="m-4 p-5 bg-danger-bg border border-border rounded-xl " role="alert" data-testid={data && !isError && !hasPaginationMetadata ? "trainer_earnings-earnings-history_pagination_metadata_error" : "trainer_earnings-earnings-history_unable_to_load_earnings_history"}><p className="text-sm text-danger " data-testid="trainer_earnings-history-error_state">{t("TEXT_UNABLE_TO_LOAD_EARNINGS_HISTORY")}</p><button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_earnings-trainerearningshistory-button_1">{isFetching ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2} />{t("TEXT_RETRYING")}</> : t("TEXT_RETRY")}</button></div>;
  }

  const handleExportCsv = () => {
    const header = ['ID', 'Date', 'Type', 'Description', 'Amount', 'TDS', 'Net Payout', 'Currency', 'Status', 'Invoice'];
    const csvRows = [
      header.join(','),
      ...filteredHistory.map((r) =>
        [
          r.id,
          r.date,
          r.type,
          `"${String(r.description ?? '').replace(/"/g, '""')}"`,
          r.amount,
          r.tdsDeducted ?? Math.round(r.amount * 0.1),
          r.netPayout ?? (r.amount - (r.tdsDeducted ?? Math.round(r.amount * 0.1))),
          r.currency,
          r.status,
          r.invoiceNumber ?? '',
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trainer_earnings_statement.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card flex flex-col h-full overflow-hidden">
      <TrainerEarningsOverviewAndLedgerEarningsToolbar
        draftSearch={draftSearch}
        setDraftSearch={setDraftSearch}
        statusFilter={statusFilter}
        typeFilter={typeFilter}
        startDate={startDate}
        endDate={endDate}
        updateUrlParam={updateUrlParam}
        handleDateChange={handleDateChange}
        onExportCsv={handleExportCsv}
        onRefresh={() => void refetch()}
        isRefreshing={isFetching}
      />

      <div className="flex-1 overflow-x-hidden">
        {filteredHistory.length === 0 ? <TrainerEarningsEmptyState /> : (
          <>
            <div className="md:hidden divide-y divide-border">{filteredHistory.map((row) => { const style = TRAINER_EARNINGS_PAYOUT_STATUS_STYLES[row.status]; return <article key={row.id} className="p-4 bg-card" data-testid={`trainer_earnings-history-card${row.id}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><TrainerInfrastructureTooltip content={row.description}><p className="font-medium text-text-primary truncate">{row.description}</p></TrainerInfrastructureTooltip><p className="text-xs text-secondary mt-1">{TrainerEarningsFormatDate(row.date, locale)} · {t(`TEXT_TYPE_${row.type.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`)}</p></div><span className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${style?.bg ?? 'bg-input'} ${style?.text ?? 'text-secondary'}`} data-testid={`trainer_earnings-earnings-history-mobile-status-${row.id}`}>{style ? t(`TEXT_STATUS_${row.status.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`) : t('TEXT_STATUS_UNKNOWN')}</span></div><div className="mt-3 flex items-center justify-between gap-3"><span className="text-xs text-secondary">{t('TEXT_NET_PAYOUT')}</span><span className="text-sm font-semibold text-text-primary">{row.netPayout == null ? displayValue(row.netPayout) : TrainerEarningsFormatCurrency(row.netPayout, row.currency, locale)}</span></div><div className="mt-2.5 pt-2 border-t border-border flex justify-end"><button type="button" onClick={() => setSelectedPayslipRow(row)} className="min-h-8 inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/15 hover:bg-sky-500/25 text-sky-600 dark:text-sky-300 border border-sky-500/30 rounded-lg text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid={`trainer_earnings-mobile-view-payslip-${row.id}`}><Receipt size={13} />View Payslip</button></div></article> })}</div>
            <div className="hidden md:block max-h-[640px] overflow-y-auto overflow-x-hidden">
              <table className="w-full text-start border-collapse">
                <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
                  <tr className="bg-surface-highlight border-b border-border" data-testid="trainer_earnings-TrainerEarningsHistory-row-1">
                    {TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS.map((column) => {
                      const active = sortBy === column.value;
                      const SortIcon = active ? (sortDirection === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;
                      return (
                        <th
                          key={column.value}
                          scope="col"
                          className={`py-3 px-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap ${column.value === 'amount' || column.value === 'status' ? 'text-end' : ''
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleSort(column.value)}
                            className="min-w-11 inline-flex items-center gap-1 min-h-11 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
                            aria-label={`${t(`TEXT_SORT_${column.value.toUpperCase()}`)}: ${active ? (sortDirection === 'asc' ? t("TEXT_DESCENDING") : t("TEXT_ASCENDING")) : t("TEXT_ASCENDING")}`}
                            data-testid={`trainer_earnings-earnings-history-sort-${column.value}`}
                          >
                            {t(`TEXT_SORT_${column.value.toUpperCase()}`)}
                            <SortIcon size={16} strokeWidth={2.2} aria-hidden="true" className={active ? 'text-orange-500' : 'text-secondary/60'} />
                          </button>
                        </th>
                      );
                    })}
                    <th scope="col" className="py-3 px-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredHistory.map((row) => {
                    const style = TRAINER_EARNINGS_PAYOUT_STATUS_STYLES[row.status];
                    return (
                      <tr
                        key={row.id}
                        data-testid={`trainer_earnings-earnings-history-row-${row.id}`}
                        className="hover:bg-surface-hover transition-colors group"
                      >
                        <td className="py-3 px-3 text-sm text-secondary whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-text-primary text-sm">{TrainerEarningsFormatDate(row.date, locale)}</span>
                            <CopyButton value={TrainerEarningsFormatDate(row.date, locale)} />
                          </div>
                          <p className="text-xs text-secondary font-mono flex items-center gap-1.5 mt-0.5">#{row.id.slice(-6)}</p>
                        </td>
                        <td className="py-3 px-3 min-w-0">
                          <TrainerInfrastructureTooltip content={row.description}>
                            <p className="text-sm font-medium text-text-primary truncate max-w-[220px]">{row.description}</p>
                          </TrainerInfrastructureTooltip>
                          <p className="text-xs text-secondary mt-0.5">{t(`TEXT_TYPE_${row.type.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`)}</p>
                        </td>
                        <td className="py-3 px-3 text-sm font-semibold text-text-primary text-end whitespace-nowrap">{TrainerEarningsFormatCurrency(row.amount, row.currency, locale)}</td>
                        <td className="py-3 px-3 text-end whitespace-nowrap"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${style?.bg ?? 'bg-input'} ${style?.text ?? 'text-secondary'}`} data-testid={`trainer_earnings-earnings-history-status-${row.id}`}>{style ? t(`TEXT_STATUS_${row.status.toUpperCase().replace(/[^A-Z0-9]+/g, '_')}`) : t('TEXT_STATUS_UNKNOWN')}</span></td>
                        <td className="py-3 px-3 text-center whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedPayslipRow(row)}
                            className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                            aria-label={`View payslip details for ${row.description}`}
                            title="View full payout & payslip details"
                            data-testid={`trainer_earnings-view-payslip-${row.id}`}
                          >
                            <Eye size={16} strokeWidth={2.2} aria-hidden="true" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="p-3.5 border-t border-border bg-header flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" data-testid="trainer_earnings-pagination-bar">
        <div className="flex items-center gap-3 text-xs text-secondary">
          <span>
            {t("TEXT_PAGE")} {TrainerEarningsFormatNumber(currentPage, locale)} {t("TEXT_OF")} {TrainerEarningsFormatNumber(totalPages, locale)}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">
            Showing {filteredHistory.length} of {data?.historyTotal ?? filteredHistory.length} entries
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="min-h-10 min-w-24 px-3.5 rounded-xl border border-border bg-input text-text-primary disabled:opacity-40 hover:border-orange-500/40 hover:bg-surface-hover motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 text-xs font-semibold"
            data-testid="trainer_earnings-trainerearningshistory-button_7"
          >
            {t("TEXT_PREVIOUS")}
          </button>
          <button
            type="button"
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
            className="min-h-10 min-w-24 px-3.5 rounded-xl border border-orange-500/30 bg-primary text-on-primary disabled:opacity-40 hover:bg-primary-hover shadow-sm shadow-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 text-xs font-semibold"
            data-testid="trainer_earnings-trainerearningshistory-button_8"
          >
            {t("TEXT_NEXT")}
          </button>
        </div>
      </div>

      <TrainerEarningsOverviewAndLedgerPayslipModal
        isOpen={Boolean(selectedPayslipRow)}
        row={selectedPayslipRow}
        onClose={() => setSelectedPayslipRow(null)}
      />
    </div>
  );
}
