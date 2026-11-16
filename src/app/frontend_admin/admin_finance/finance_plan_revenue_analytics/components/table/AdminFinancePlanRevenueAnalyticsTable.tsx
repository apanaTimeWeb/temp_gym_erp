"use client";
// RESPONSIBILITY: Renders the paginated, searchable, sortable Admin plan revenue table.
// DATA FLOW: feature data/state and user input → AdminFinancePlanRevenueAnalyticsTable → accessible UI/events routed to owning hooks (admin_finance/finance_plan_revenue_analytics/components/table/AdminFinancePlanRevenueAnalyticsTable.tsx)

import { useLocale, useTranslations } from 'next-intl';

import { PLANS_ITEMS_PER_PAGE, REVENUE_TABLE_HEADERS } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/constants/AdminFinancePlanRevenueAnalyticsConstants';
import type { RevenueSortKey } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTypes';
import { AdminPlansFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatCurrency';
import { formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/utils/AdminFinancePlanRevenueAnalyticsFormatters';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/components/AdminFinancePlanRevenueAnalyticsPagination';
import AdminPlansEmptyState from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/components/empty_state/AdminFinancePlanRevenueAnalyticsEmptyState';
import type { AdminPlansRevenueTableProps } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsTablePropsTypes';
import AdminPlansRevenueTableSortIcon from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/components/table/AdminFinancePlanRevenueAnalyticsTableSortIcon';
import { CopyButton } from '@/components/ui/CopyButton';

const TABLE_COLUMN_COUNT = 6;
/**
 * AdminFinancePlanRevenueAnalyticsTable renders the admin plans revenue table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinancePlanRevenueAnalyticsTable: Renders the paginated, searchable, sortable Admin plan revenue table.
 * @dependencies Consumes AdminPlansConstants, AdminPlansRevenueTypes, AdminPlansFormatCurrency, AdminPlansFormatters, AdminNavigationLayoutPagination.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinancePlanRevenueAnalyticsTable({ data, sortKey, sortDir, onSort, currentPage, totalPages, totalItems, onPageChange }: AdminPlansRevenueTableProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden flex flex-col">
      <div className="overflow-x-auto max-h-[640px] overflow-auto">
        <table data-admin-responsive-table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight">
            <tr className="border-b border-border">
              {REVENUE_TABLE_HEADERS.map((header, index) => {
                const isSorted = sortKey === header.key;
                const sort = isSorted ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none';
                return (
                  <th
                    key={header.key}
                    scope="col"
                    aria-sort={sort}
                    className={`px-4 py-3 text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap ${
                      index === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {header.sortable ? (
                      <button type="button" onClick={() => onSort(header.key as RevenueSortKey)} className="inline-flex items-center gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('plans.AdminPlansRevenueTable.auto_sortBy', { column: t(header.labelKey), direction: isSorted ? (sortDir === 'asc' ? t('plans.AdminPlansRevenueTable.auto_ascending') : t('plans.AdminPlansRevenueTable.auto_descending')) : t('plans.AdminPlansRevenueTable.auto_unsorted') })} data-testid={`admin_plans-admin_plans-revenue-table-sort-${index}`}>
                        {t(header.labelKey)}
                        <AdminPlansRevenueTableSortIcon column={header.key as RevenueSortKey} sortKey={sortKey} sortDir={sortDir} />
                      </button>
                    ) : t(header.labelKey)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr><td colSpan={TABLE_COLUMN_COUNT}><AdminPlansEmptyState title={t('plans.AdminPlansRevenueTable.text_6a50bf56d9')} description={t('plans.AdminPlansRevenueTable.auto_7a5702dc84')} /></td></tr>
            ) : data.map((row) => (
              <tr key={row.id} className="hover:bg-surface-highlight/50 transition-colors group">
                <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3.5 text-sm font-semibold text-primary">
                  <div className="flex items-center gap-1.5">
                    <span>{row.planName}</span>
                    <CopyButton text={row.planName} label={row.planName} />
                  </div>
                </td>
                <td className="px-4 py-3.5"><span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-subtle text-primary" data-testid="plans-revenue-analytics-plans-revenue-analytics-table-status-badge">{row.tier}</span></td>
                <td className="px-4 py-3.5 text-sm font-medium text-primary">{formatNumber(row.activeSubscriptions, locale)}</td>
                <td className="px-4 py-3.5 text-sm font-medium text-primary">{row.newSignups > 0 ? `+${formatNumber(row.newSignups, locale)}` : formatNumber(row.newSignups, locale)}</td>
                <td className="px-4 py-3.5 text-sm font-medium text-primary">{formatPercent1dp(row.renewalRate, locale)}%</td>
                <td className="px-4 py-3.5 text-sm font-black text-primary">{AdminPlansFormatCurrency(row.totalRevenue, undefined, locale)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border p-4 bg-surface-highlight/10">
        <AdminNavigationLayoutPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={PLANS_ITEMS_PER_PAGE} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
