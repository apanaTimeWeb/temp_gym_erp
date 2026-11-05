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


import { useCallback, useEffect, useRef } from 'react';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Pagination from '@/components/ui/Pagination';

import SuperadminBillingCouponsEmptyState from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_empty_state/SuperadminBillingCouponsManagementEmptyState';
import SuperadminBillingCouponsTableRow from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/components/coupons_management_table/SuperadminBillingCouponsManagementTableRow';
import { SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE, SUPERADMIN_BILLING_COUPONS_TABLE_PAGE_SIZE_OPTIONS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/constants/superadmin_billing_coupons_management.constants';
import { normalizeSuperadminBillingCouponsPage, normalizeSuperadminBillingCouponsPageSize } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementNormalizePagination';

import type { SuperadminBillingCouponsTableProps } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_table.types';

/**
 * @description Owns the SuperadminBillingCouponsTable responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingCouponsManagementTable({ coupons, onToggleStatus, onEdit, onDelete, onRestore, onCreateClick }: SuperadminBillingCouponsTableProps) {
  const t = useTranslations('superadmin_coupons');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    return (<div className="bg-card border border-border rounded-xl overflow-hidden shadow-card flex flex-col min-h-96">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-start border-collapse">
          <thead>
            <tr className="bg-primary-subtle border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.code_ca0dbad9')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.discount_104d9898')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.usage_c6451870')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.status_ec53a8c4')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">{t('ui.expiry_date_5abc7a3a')}</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-end">{t('ui.actions_06df3300')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedCoupons.length === 0 ? (<tr>
                <td colSpan={6}><SuperadminBillingCouponsEmptyState onCreateClick={onCreateClick}/></td>
              </tr>) : (paginatedCoupons.map((cpn) => (<SuperadminBillingCouponsTableRow key={cpn.id} coupon={cpn} onToggleStatus={onToggleStatus} onEdit={onEdit} onDelete={onDelete} onRestore={onRestore}/>)))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
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
    </div>);
}
