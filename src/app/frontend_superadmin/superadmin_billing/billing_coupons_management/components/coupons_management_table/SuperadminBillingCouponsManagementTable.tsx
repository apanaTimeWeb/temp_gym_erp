// RESPONSIBILITY: Renders/orchestrates SuperadminBillingCouponsTable within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingCouponsTable owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState
 * MODULE DEPENDENCIES: react, next/navigation, next-intl, @/components/ui/Pagination, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_empty_state/SuperadminBillingCouponsManagementEmptyState, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_table/SuperadminBillingCouponsManagementTableRow, @/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_table.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the Coupons data table shell (header row + rows). Delegates each row to CouponsTableRow. No API calls.


import { useCallback, useEffect, useRef, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/ui/Pagination';

import SuperadminBillingCouponsEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_empty_state/SuperadminBillingCouponsManagementEmptyState';
import SuperadminBillingCouponsTableRow from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_table/SuperadminBillingCouponsManagementTableRow';
import { SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { normalizeSuperadminBillingCouponsPage, normalizeSuperadminBillingCouponsPageSize } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementNormalizePagination';

import type { SuperadminBillingCouponsTableProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_table.types';

const TABLE_COLUMN_COUNT = 7;

/**
 * @description Owns the SuperadminBillingCouponsTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingCouponsManagementTable({
  coupons,
  onToggleStatus,
  onEdit,
  onDelete,
  onRestore,
  onCreateClick,
  selectedCouponIds,
  onToggleSelectCoupon,
  onToggleSelectAllCoupons,
}: SuperadminBillingCouponsTableProps) {
  const t = useTranslations('superadmin_coupons');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(new Set());
  const selectedIds = selectedCouponIds ?? internalSelectedIds;

  const currentPage = normalizeSuperadminBillingCouponsPage(searchParams.get('page'));
  const currentPageSize = normalizeSuperadminBillingCouponsPageSize(
    searchParams.get('pageSize'),
    SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS,
    SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE,
  );
  const filterIdentity = ['search', 'status', 'kpi', 'range', 'startDate', 'endDate'].map((key) => `${key}=${searchParams.get(key) ?? ''}`).join('&');
  const previousFilters = useRef(filterIdentity);
  const totalPages = Math.max(1, Math.ceil(coupons.length / currentPageSize));
  const paginatedCoupons = coupons.slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize);

  const handleToggleSelectCoupon = useCallback((id: string) => {
    if (onToggleSelectCoupon) {
      onToggleSelectCoupon(id);
      return;
    }
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [onToggleSelectCoupon]);

  const isAllSelected = paginatedCoupons.length > 0 && paginatedCoupons.every((c) => selectedIds.has(c.id));
  const isIndeterminate = paginatedCoupons.some((c) => selectedIds.has(c.id)) && !isAllSelected;

  const handleToggleSelectAll = useCallback(() => {
    if (onToggleSelectAllCoupons) {
      onToggleSelectAllCoupons();
      return;
    }
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllSelected) {
        paginatedCoupons.forEach((c) => next.delete(c.id));
      } else {
        paginatedCoupons.forEach((c) => next.add(c.id));
      }
      return next;
    });
  }, [onToggleSelectAllCoupons, isAllSelected, paginatedCoupons]);

  const handleClearSelection = useCallback(() => {
    setInternalSelectedIds(new Set());
  }, []);

  const changePage = useCallback((page: number) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set('page', String(Math.min(Math.max(1, page), totalPages)));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, totalPages]);

  const changePageSize = (pageSize: number) => {
    if (!SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS.includes(pageSize as (typeof SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS)[number])) return;
    const next = new URLSearchParams(searchParams.toString());
    next.set('pageSize', String(pageSize));
    next.set('page', '1');
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const resultStart = coupons.length === 0 ? 0 : (Math.min(currentPage, totalPages) - 1) * currentPageSize + 1;
  const resultEnd = Math.min(currentPage * currentPageSize, coupons.length);
  const formatCount = (value: number) => new Intl.NumberFormat(locale).format(value);

  useEffect(() => {
    if (previousFilters.current !== filterIdentity) {
      previousFilters.current = filterIdentity;
      if (currentPage !== 1) {
        const next = new URLSearchParams(searchParams.toString());
        next.set('page', '1');
        router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      }
    }
  }, [filterIdentity, currentPage, searchParams, pathname, router]);

  useEffect(() => {
    if (currentPage > totalPages) changePage(totalPages);
  }, [currentPage, totalPages, changePage]);

  return (
    <div className="relative bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] border border-border dark:border-amber-500/30 rounded-2xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-500/80 via-primary/60 to-transparent shrink-0" />
      {selectedIds.size > 0 && (
        <div className="p-3 bg-amber-500/10 border-b border-border dark:border-white/10 flex flex-wrap items-center justify-between gap-3 motion-safe:animate-fadeIn">
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
        <table className="w-full text-start border-collapse">
          <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
            <tr className="bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10">
              <th className="sticky start-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10 w-12 px-4 py-3 text-center">
                <input
                  type="checkbox"
                  aria-label={t('ui.select_all_coupons') ?? 'Select all coupons'}
                  checked={isAllSelected}
                  ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                  onChange={handleToggleSelectAll}
                  className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-2 focus:ring-primary"
                  data-testid="superadmin_coupons-table-select-all"
                />
              </th>
              <th className="sticky start-12 z-20 bg-slate-100 dark:bg-[#152038] border-b border-e border-border dark:border-white/10 px-6 py-4 text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider text-start">
                {t('ui.code_ca0dbad9')}
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider text-start">{t('ui.discount_104d9898')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider text-start">{t('ui.usage_c6451870')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider text-start">{t('ui.status_ec53a8c4')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider text-start">{t('ui.expiry_date_5abc7a3a')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-secondary dark:text-slate-300 uppercase tracking-wider text-end">{t('ui.actions_06df3300')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border dark:divide-white/5">
            {paginatedCoupons.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT}>
                  <SuperadminBillingCouponsEmptyState onCreateClick={onCreateClick} />
                </td>
              </tr>
            ) : (
              paginatedCoupons.map((cpn) => (
                <SuperadminBillingCouponsTableRow
                  key={cpn.id}
                  coupon={cpn}
                  onToggleStatus={onToggleStatus}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onRestore={onRestore}
                  isSelected={selectedIds.has(cpn.id)}
                  onToggleSelect={handleToggleSelectCoupon}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-secondary" aria-live="polite">
          {t('ui.pagination_summary', { start: formatCount(resultStart), end: formatCount(resultEnd), total: formatCount(coupons.length) })}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="superadmin-coupons-page-size" className="text-xs font-medium text-secondary">{t('ui.rows_per_page')}</label>
          <select id="superadmin-coupons-page-size" value={currentPageSize} onChange={(event) => changePageSize(Number(event.target.value))} className="min-h-11 rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-table-page-size-select">
            {SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={changePage} data-testid="superadmin_coupons-superadmin-coupons-table-superadmin-coupons-table-pagination"/>
        </div>
      </div>
    </div>
  );
}
