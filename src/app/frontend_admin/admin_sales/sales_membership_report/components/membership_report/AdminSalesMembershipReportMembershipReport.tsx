"use client";
// RESPONSIBILITY: Renders the sortable membership receivable report and its server-backed empty/error states.
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsMembershipReport → accessible UI/events routed to owning hooks (admin_sales/sales_membership_report/components/membership_report/AdminSalesAnalyticsMembershipReport.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportFormatCurrency';
import { maskAdminSalesListAmount } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportMaskFinancialAmount';
import { displayValue } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportDisplayValue';

import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_membership_report/hooks/useAdminSalesMembershipReportLogic';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/sales_membership_report/components/empty_state/AdminSalesMembershipReportEmptyState';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { AdminSalesMembershipSortKey } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportUiTypes';
import type { AdminSalesSortDirection } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportSortTypes';
import { sortAdminSalesMembershipReportRows } from '@/app/frontend_admin/admin_sales/sales_membership_report/utils/AdminSalesMembershipReportSortRows';

/**
 * AdminSalesAnalyticsMembershipReport renders the admin sales membership report UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsMembershipReport: Renders the sortable membership receivable report and its server-backed empty/error states.
 * @dependencies Consumes AdminSalesFormatCurrency, useAdminSalesLogic, AdminSalesEmptyState, AdminSalesUiTypes, AdminSalesSortTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAnalyticsMembershipReport() {
  const locale = useLocale();
  const t = useTranslations();

  const { membershipReport, membershipTotals, membershipReportStatus, membershipReportError, retryMembershipReport } = useAdminSalesLogic();
  const [sortKey, setSortKey] = useState<AdminSalesMembershipSortKey>('receivable');
  const [sortDir, setSortDir] = useState<AdminSalesSortDirection>('desc');

  const sortedRows = useMemo(
    () => sortAdminSalesMembershipReportRows(membershipReport, sortKey, sortDir),
    [membershipReport, sortKey, sortDir],
  );

  const handleSort = (key: AdminSalesMembershipSortKey) => {
    if (sortKey === key) {
      setSortDir((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setSortDir('desc');
  };

  const sortableColumns: Array<{ key: AdminSalesMembershipSortKey; label: string }> = [
    { key: 'plan', label: t('sales.AdminAuditRepair.plan') },
    { key: 'receivable', label: t('sales.AdminAuditRepair.totalReceivable') },
    { key: 'received', label: t('sales.AdminAuditRepair.amountReceived') },
    { key: 'remaining', label: t('sales.AdminAuditRepair.remaining') },
    { key: 'refund', label: t('sales.AdminAuditRepair.refund') },
  ];

  if (membershipReportStatus === 'pending') {
    return (
      <div className="overflow-x-auto" aria-busy="true" aria-label={t('sales.admin_sales_membership_report.text_a873abb3d3')}>
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input">
            <tr>
              {sortableColumns.map(({ key, label }) => (
                <th key={key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }, (_, index) => (
              <tr key={`membership-report-skeleton-${index}`} className="motion-safe:animate-pulse bg-card motion-safe:duration-base">
                {sortableColumns.map(({ key }) => (
                  <td key={key} className="px-4 py-4"><div className="h-4 w-24 rounded bg-skeleton-base" /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (membershipReportStatus === 'error') {
    return (
      <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg p-4">
        <div><p className="font-medium text-danger">{membershipReportError || t('sales.admin_sales_membership_report.auto_8bae4e6d16')}</p><p className="mt-1 text-sm text-secondary">{t('sales.admin_sales_membership_report.auto_refreshSales')}</p></div>
        <button type="button" onClick={() => void retryMembershipReport()} className="min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="sales-analytics-sales-analytics-membership-report-retry-membership-report">{t('sales.SalesError.text_042c862e44')}</button>
      </div>
    );
  }

  if (sortedRows.length === 0) {
    return (
      <AdminSalesEmptyState
        message={t('sales.admin_sales_membership_report.auto_b254e610f8')}
        subtext={t('sales.admin_sales_membership_report.auto_noMembershipRecords')}
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table data-admin-responsive-table className="w-full">
        <thead className="bg-input">
          <tr>
            {sortableColumns.map(({ key, label } , __testIdIndex107) => (
              <th key={key} scope="col" aria-sort={sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-secondary">
                <button
                  type="button"
                  onClick={() => handleSort(key)}
                  className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
                  aria-label={t('admin_sales_membership_report.auto_sortBy', { label })}
                  title={t('admin_sales_membership_report.auto_sortBy', { label })}
                 data-testid={`admin_sales-admin_sales-membership-report-click-map107-${__testIdIndex107}-1`}>
                  {label}
                  {sortKey === key
                    ? (sortDir === 'asc' ? <ChevronUp size={18} aria-hidden="true" className="text-primary"  strokeWidth={2}/> : <ChevronDown size={18} aria-hidden="true" className="text-primary"  strokeWidth={2}/>)
                    : <ChevronsUpDown size={18} aria-hidden="true" className="text-disabled"  strokeWidth={2}/>}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedRows.map((row) => (
            <tr key={row.id ?? row.plan ?? row.name} className="bg-card motion-safe:transition-colors hover:bg-surface-highlight motion-safe:duration-base">
              <td className="px-4 py-3 text-sm font-medium text-primary">{displayValue(row.plan ?? row.name)}</td>
              <td className="px-4 py-3 text-sm text-secondary"><span aria-label={t('AdminAuditRepair.financialAmountHidden')}>{maskAdminSalesListAmount()}</span></td>
              <td className="px-4 py-3 text-sm font-medium text-success"><span aria-label={t('AdminAuditRepair.financialAmountHidden')}>{maskAdminSalesListAmount()}</span></td>
              <td className="px-4 py-3 text-sm font-medium text-warning"><span aria-label={t('AdminAuditRepair.financialAmountHidden')}>{maskAdminSalesListAmount()}</span></td>
              <td className="px-4 py-3 text-sm text-danger"><span aria-label={t('AdminAuditRepair.financialAmountHidden')}>{maskAdminSalesListAmount()}</span></td>
            </tr>
          ))}
          <tr className="border-t-2 border-border bg-input font-semibold">
            <td className="px-4 py-3 text-sm text-primary">{t('sales.admin_sales_membership_report.text_b25928c699')}</td>
            <td className="px-4 py-3 text-sm text-primary">{(membershipTotals.totalReceivable == null ? displayValue(membershipTotals.totalReceivable) : AdminSalesFormatCurrency(membershipTotals.totalReceivable, undefined, locale))}</td>
            <td className="px-4 py-3 text-sm text-success">{(membershipTotals.totalReceived == null ? displayValue(membershipTotals.totalReceived) : AdminSalesFormatCurrency(membershipTotals.totalReceived, undefined, locale))}</td>
            <td className="px-4 py-3 text-sm text-warning">{(membershipTotals.remaining == null ? displayValue(membershipTotals.remaining) : AdminSalesFormatCurrency(membershipTotals.remaining, undefined, locale))}</td>
            <td className="px-4 py-3 text-sm text-danger">{(membershipTotals.refunds == null ? displayValue(membershipTotals.refunds) : AdminSalesFormatCurrency(membershipTotals.refunds, undefined, locale))}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
