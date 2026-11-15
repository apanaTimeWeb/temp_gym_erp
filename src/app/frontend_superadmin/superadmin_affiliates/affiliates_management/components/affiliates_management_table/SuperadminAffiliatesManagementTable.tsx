// RESPONSIBILITY: Renders/orchestrates SuperadminAffiliatesTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Affiliates data table shell (header row + rows). Delegates each row to SuperadminAffiliatesTableRow. No API calls.
import { useState, useCallback } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminAffiliatesEmptyState from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_empty_state/SuperadminAffiliatesManagementEmptyState';
import SuperadminAffiliatesTableRow from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/components/affiliates_management_table/SuperadminAffiliatesManagementTableRow';

import type { SuperadminAffiliatesTableProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_table.types';

const TABLE_COLUMN_COUNT = 8;

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

export default function SuperadminAffiliatesManagementTable({
  affiliates,
  onToggleStatus,
  onEdit,
  onDelete,
  onAddClick,
  onPayCommission,
  currentPage,
  totalPages,
  setPage,
  total,
  pageSize = 10,
  onPageSizeChange,
  selectedAffiliateIds,
  onToggleSelectAffiliate,
  onToggleSelectAllAffiliates,
}: SuperadminAffiliatesTableProps) {
  const t = useTranslations('superadmin_affiliates');
  const locale = useLocale();

  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(new Set());
  const selectedIds = selectedAffiliateIds ?? internalSelectedIds;

  const handleToggleSelectAffiliate = useCallback((id: string) => {
    if (onToggleSelectAffiliate) {
      onToggleSelectAffiliate(id);
      return;
    }
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [onToggleSelectAffiliate]);

  const isAllSelected = affiliates.length > 0 && affiliates.every((aff) => selectedIds.has(aff.id));
  const isIndeterminate = affiliates.some((aff) => selectedIds.has(aff.id)) && !isAllSelected;

  const handleToggleSelectAll = useCallback(() => {
    if (onToggleSelectAllAffiliates) {
      onToggleSelectAllAffiliates();
      return;
    }
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllSelected) {
        affiliates.forEach((aff) => next.delete(aff.id));
      } else {
        affiliates.forEach((aff) => next.add(aff.id));
      }
      return next;
    });
  }, [onToggleSelectAllAffiliates, isAllSelected, affiliates]);

  const handleClearSelection = useCallback(() => {
    setInternalSelectedIds(new Set());
  }, []);

  const totalCount = total ?? affiliates.length;
  const resultStart = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const resultEnd = Math.min(currentPage * pageSize, totalCount);
  const formatCount = (value: number) => new Intl.NumberFormat(locale).format(value);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col min-h-96">
      {selectedIds.size > 0 && (
        <div className="p-3 bg-primary/10 border-b border-primary/20 flex flex-wrap items-center justify-between gap-3 motion-safe:animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-on-primary">
              {selectedIds.size} {t('ui.selected') ?? 'Selected'}
            </span>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-secondary hover:text-primary font-medium underline"
            >
              {t('ui.clear_selection') ?? 'Clear selection'}
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto flex-1">
        <table className={`w-full text-start border-collapse ${MOBILE_CARD_TABLE_CLASSES}`}>
          <thead>
            <tr className="bg-primary-subtle border-b border-border" data-testid="superadmin_affiliates-superadmin-affiliates-table-affiliates-table-action-1">
              <th className="sticky start-0 z-20 bg-primary-subtle border-b border-border w-12 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label={t('ui.select_all_affiliates') ?? 'Select all affiliates'}
                  checked={isAllSelected}
                  ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                  onChange={handleToggleSelectAll}
                  className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-2 focus:ring-primary"
                  data-testid="superadmin_affiliates-table-select-all"
                />
              </th>
              <th className="sticky start-12 z-20 bg-primary-subtle border-b border-e border-border px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-start">
                {t('ui.partner_name_d78e689')}
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-start">{t('ui.referral_code_aaebd49')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-start">{t('ui.referral_count_63d1eb0')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-start">{t('ui.join_rate_026e96a')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-start">{t('ui.commission_earned_d380da6')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-start">{t('ui.status_1b84b5c')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-end">{t('ui.actions_56ec880')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {affiliates.length === 0 ? (
              <tr data-testid="superadmin_affiliates-superadmin-affiliates-table-affiliates-table-action-2">
                <td colSpan={TABLE_COLUMN_COUNT} data-mobile-label={t('ui.mobile_partner_name')}>
                  <SuperadminAffiliatesEmptyState onAddClick={onAddClick} />
                </td>
              </tr>
            ) : (
              affiliates.map((aff) => (
                <SuperadminAffiliatesTableRow
                  key={aff.id}
                  affiliate={aff}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onPayCommission={onPayCommission}
                  isSelected={selectedIds.has(aff.id)}
                  onToggleSelect={handleToggleSelectAffiliate}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-border bg-surface-highlight/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-secondary" aria-live="polite">
          {t('ui.pagination_summary', {
            start: formatCount(resultStart),
            end: formatCount(resultEnd),
            total: formatCount(totalCount),
          })}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {onPageSizeChange && (
            <div className="flex items-center gap-2">
              <label htmlFor="superadmin-affiliates-page-size" className="text-xs font-medium text-secondary">
                {t('ui.rows_per_page') ?? 'Rows per page'}
              </label>
              <select
                id="superadmin-affiliates-page-size"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="min-h-10 rounded-xl border border-border bg-input px-3 py-1.5 text-xs text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            data-testid="superadmin_affiliates-superadmin-affiliates-table-superadmin-affiliates-table-pagination"
          />
        </div>
      </div>
    </div>
  );
}
