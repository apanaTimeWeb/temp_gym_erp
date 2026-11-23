// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesPayoutHistory within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders server-backed affiliate payout history passed from the feature page query.
import { useState, useId } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import Pagination from '@/components/ui/Pagination';
import { SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/constants/superadmin_affiliates_payout_history.constants';
import { SuperadminAffiliatesFormatCurrency } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/utils/SuperadminAffiliatesPayoutHistoryFormatCurrency';
import { formatDate } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/utils/SuperadminAffiliatesPayoutHistoryFormatters';

import type { SuperadminAffiliatesPayoutHistoryProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history_payout_history.types';
import type { AffiliatePayoutRecord } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_payout_history/types/superadmin_affiliates_payout_history.types';

const TABLE_COLUMN_COUNT = 6;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

/**
 * @description Renders server-backed affiliate payout history passed from the feature page query.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminAffiliatesPayoutHistoryTable({ payouts, isPending, isError, onRetry }: SuperadminAffiliatesPayoutHistoryProps) {
  const t = useTranslations('superadmin_affiliates');
  const locale = useLocale();
  const pageSizeSelectId = useId();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const totalRecords = payouts.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPayouts = payouts.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );

  const startRow = totalRecords === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endRow = Math.min(safeCurrentPage * pageSize, totalRecords);
  const formatCount = (value: number) => new Intl.NumberFormat(locale).format(value);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className={`w-full min-w-max border-collapse text-start ${MOBILE_CARD_TABLE_CLASSES}`}>
          <thead className="sticky top-0 z-20 bg-primary-subtle border-b border-border shadow-xs">
            <tr className="border-b border-border bg-primary-subtle text-secondary" data-testid="superadmin_affiliates-superadmin-affiliates-payout-history-payout-history-action-1">
              <th className="sticky start-0 z-20 bg-primary-subtle border-b border-e border-border p-4 text-xs font-semibold uppercase tracking-wider text-start">
                {t('ui.date_ba31778')}
              </th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-start">{t('ui.affiliate_774d70b')}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-start">{t('ui.amount_f1d432d')}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-start">{t('ui.method_dfe267c')}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-start">{t('ui.ref_id_c0feb73')}</th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-start">{t('ui.status_1b84b5c')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isPending && (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center">
                  <div className="flex min-h-32 items-center justify-center gap-2 text-secondary" aria-busy="true" data-testid="superadmin_affiliates-payout-history-loading-state">
                    <Loader2 size={18} className="motion-safe:animate-spin" /> {t('ui.loading_payout_history_8f6ea03')}
                  </div>
                </td>
              </tr>
            )}

            {!isPending && isError && (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT} className="p-6">
                  <div role="alert" className="rounded-xl border border-border bg-danger-bg p-5 text-sm text-danger text-center" data-testid="superadmin_affiliates-superadmin-affiliates-payout-history-affiliates-payout-history-history">
                    {t('ui.unable_to_load_payout_history_113f9d3')}{' '}
                    <button
                      type="button"
                      onClick={onRetry}
                      className="min-h-10 ms-1 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all cursor-pointer font-semibold"
                      data-testid="superadmin_affiliates-superadmin-affiliates-payout-history-affiliates-payout-history-retry"
                    >
                      {t('ui.retry_0f25598')}
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {!isPending && !isError && totalRecords === 0 && (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-secondary">
                  {t('ui.no_payout_history_available_b5c8805')}
                </td>
              </tr>
            )}

            {!isPending && !isError && paginatedPayouts.map((payout: AffiliatePayoutRecord) => (
              <tr
                key={payout.id}
                tabIndex={0}
                className="group motion-safe:transition-colors hover:bg-surface-hover focus-visible:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                data-testid={`superadmin_affiliates-affiliates-payout-history-item-payout-id-2-${String(payout.id)}`}
              >
                <td className="sticky start-0 z-10 bg-card group-hover:bg-surface-hover group-focus-within:bg-surface-hover border-b border-e border-border p-4 text-sm text-secondary transition-colors" data-mobile-label={t('ui.mobile_date')}>
                  {formatDate(payout.paidAt, locale)}
                </td>
                <td className="border-b border-border p-4" data-mobile-label={t('ui.mobile_affiliate')}>
                  <span className="font-medium text-primary block">{payout.affiliateName}</span>
                  <div className="flex items-center gap-1.5 mt-0.5" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs text-disabled">{payout.affiliateId}</span>
                    <CopyButton value={payout.affiliateId} label={`Copy affiliate ID ${payout.affiliateId}`} />
                  </div>
                </td>
                <td className="border-b border-border p-4 font-medium text-primary" data-mobile-label={t('ui.mobile_amount')}>
                  {SuperadminAffiliatesFormatCurrency(payout.amount, payout.currency || 'INR', locale)}
                </td>
                <td className="border-b border-border p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_method')}>
                  {payout.method === 'BANK_TRANSFER' ? t('ui.bank_transfer_898f097') : t('ui.paypal')}
                </td>
                <td className="border-b border-border p-4 text-xs font-mono text-secondary" data-mobile-label={t('ui.mobile_ref_id')}>
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <span>{payout.referenceId}</span>
                    <CopyButton value={payout.referenceId} label={`Copy reference ID ${payout.referenceId}`} />
                  </div>
                </td>
                <td className="border-b border-border p-4" data-mobile-label={t('ui.mobile_status')}>
                  {payout.status === SUPERADMIN_AFFILIATE_PAYOUT_STATUS_CODES.COMPLETED ? (
                    <span data-testid={`superadmin_affiliates-payout-status-completed-${payout.id}`} className="rounded-full border border-border bg-success-bg px-2.5 py-1 text-xs font-semibold text-success">
                      {t('ui.completed_75e218a')}
                    </span>
                  ) : (
                    <span data-testid={`superadmin_affiliates-payout-status-pending-${payout.id}`} className="rounded-full border border-border bg-warning-bg px-2.5 py-1 text-xs font-semibold text-warning">
                      {t('ui.pending_6d3d6c6')}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* In-Card Bottom-Pinned Pagination Bar */}
      {!isPending && !isError && totalRecords > 0 && (
        <div className="border-t border-border px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-card">
          <p className="text-xs text-secondary" aria-live="polite">
            {t('ui.pagination_summary', {
              start: formatCount(startRow),
              end: formatCount(endRow),
              total: formatCount(totalRecords),
            })}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label htmlFor={pageSizeSelectId} className="text-xs font-medium text-secondary">
                {t('ui.rows_per_page') ?? 'Rows per page'}
              </label>
              <select
                id={pageSizeSelectId}
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="min-h-10 rounded-xl border border-border bg-input px-3 py-1.5 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
