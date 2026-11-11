"use client";
// RESPONSIBILITY: Renders the read-only paginated Finance payment history returned by TanStack Query.
// DATA FLOW: feature data/state and user input → AdminFinanceOverviewPaymentsTable → accessible UI/events routed to owning hooks (admin_finance/finance_payments/components/payments_table/AdminFinanceOverviewPaymentsTable.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsFormatters';
import { AdminFinanceFormatCurrency } from '@/app/frontend_admin/admin_finance/finance_payments/utils/AdminFinancePaymentsFormatCurrency';

import type { AdminFinancePaymentSortKey } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsUiTypes';
import type { AdminFinanceSortDirection } from '@/app/frontend_admin/admin_finance/finance_payments/types/AdminFinancePaymentsSortTypes';
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useAdminFinanceLogic } from '@/app/frontend_admin/admin_finance/finance_payments/hooks/useAdminFinancePaymentsLogic';
import { PAYMENTS_TABLE_HEADERS, FINANCE_PAYMENT_TABLE_HEADER_LABEL_KEYS, FINANCE_ITEMS_PER_PAGE, FINANCE_METHOD_STYLES, FINANCE_STATUS_STYLES, FINANCE_PAYMENT_METHOD_LABEL_KEYS, FINANCE_PAYMENT_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_finance/finance_payments/constants/AdminFinancePaymentsConstants';
import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_finance/finance_payments/components/AdminFinancePaymentsPagination';
import AdminFinanceEmptyState from '@/app/frontend_admin/admin_finance/finance_payments/components/empty_state/AdminFinancePaymentsEmptyState';

/**
 * AdminFinanceOverviewPaymentsTable renders the admin finance payments table UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminFinanceOverviewPaymentsTable: Renders the read-only paginated Finance payment history returned by TanStack Query.
 * @dependencies Consumes AdminFinanceFormatters, AdminFinanceFormatCurrency, AdminFinanceUiTypes, AdminFinanceSortTypes, useAdminFinanceLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminFinanceOverviewPaymentsTable() {
  const locale = useLocale();
  const t = useTranslations();

  const { payments, totalPayments, paymentsStatus, loadAll, currentPage, setCurrentPage } = useAdminFinanceLogic();
  const [sortKey, setSortKey] = useState<AdminFinancePaymentSortKey>('paidAt');
  const [sortDir, setSortDir] = useState<AdminFinanceSortDirection>('desc');
  const sortedPayments = useMemo(() => [...payments].sort((a,b)=>{const av=sortKey==='member'?a.member?.name:a[sortKey]; const bv=sortKey==='member'?b.member?.name:b[sortKey]; const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av??'').localeCompare(String(bv??''),undefined,{numeric:true}); return sortDir==='asc'?result:-result;}), [payments,sortKey,sortDir]);
  const handleSort=(key:AdminFinancePaymentSortKey)=>{if(sortKey===key)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};
  const totalPages = Math.max(1, Math.ceil(totalPayments / FINANCE_ITEMS_PER_PAGE));

  if (paymentsStatus === 'pending') {
    return (
      <div className="overflow-x-auto" aria-busy="true" aria-label={t('finance.admin_finance_payments_table.text_bc48c55226')}>
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>{PAYMENTS_TABLE_HEADERS.map((header,index) => { const keys: AdminFinancePaymentSortKey[]=['invoiceNo','member','amount','method','status','paidAt']; const key=keys[index]; const label=t(FINANCE_PAYMENT_TABLE_HEADER_LABEL_KEYS[header]); return <th key={header} scope="col" aria-sort={key ? (sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined} className="text-left text-xs font-semibold uppercase tracking-wider px-4 py-3">{label}{key && <button type="button" onClick={()=>handleSort(key)} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out ml-1 inline-flex align-middle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('admin_finance_payments_table.auto_sortBy', { header: label })} title={t('admin_finance_payments_table.auto_sortBy', { header: label })} data-testid={`admin_finance-admin_finance-payments-table-click-map40-${index}-1`}>{sortKey===key?(sortDir==='asc'?<ChevronUp size={18} className="text-primary" strokeWidth={2}/>:<ChevronDown size={18} className="text-primary" strokeWidth={2}/>):<ChevronsUpDown size={18} className="text-disabled" strokeWidth={2}/>}</button>}</th>; })}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {Array.from({ length: 5 }, (_, index) => (
              <tr key={`payment-skeleton-${index}`}>
                {PAYMENTS_TABLE_HEADERS.map((header) => <td key={header} className="px-4 py-4"><div className="h-4 rounded bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" /></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (paymentsStatus === 'error') {
    return <div role="alert" className="rounded-2xl border border-border bg-card px-6 py-12 text-center"><p className="font-medium text-danger">{t('finance.admin_finance_payments_table.text_18d540a249')}</p><p className="mt-1 text-sm text-secondary">{t('finance.admin_finance_payments_table.text_11ee134422')}</p><button type="button" onClick={() => void loadAll()} className="mt-3 min-h-11 rounded-lg border border-border px-4 font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="finance-overview-finance-overview-payments-table-admin-finance-tabs-retry">{t('finance.admin_finance_tabs.retry')}</button></div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead className="bg-input text-secondary">
            <tr>{PAYMENTS_TABLE_HEADERS.map((header,index) => { const keys: AdminFinancePaymentSortKey[]=['invoiceNo','member','amount','method','status','paidAt']; const key=keys[index]; const label=t(FINANCE_PAYMENT_TABLE_HEADER_LABEL_KEYS[header]); return <th key={header} scope="col" aria-sort={key ? (sortKey === key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">{label}{key && <button type="button" onClick={()=>handleSort(key)} className="min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out ml-1 inline-flex align-middle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('admin_finance_payments_table.auto_sortBy', { header: label })} title={t('admin_finance_payments_table.auto_sortBy', { header: label })} data-testid={`admin_finance-admin_finance-payments-table-click-2-map63-${index}-1`}>{sortKey===key?(sortDir==='asc'?<ChevronUp size={18} className="text-primary" strokeWidth={2}/>:<ChevronDown size={18} className="text-primary" strokeWidth={2}/>):<ChevronsUpDown size={18} className="text-disabled" strokeWidth={2}/>}</button>}</th>; })}</tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payments.length === 0 ? (
              <tr><td colSpan={PAYMENTS_TABLE_HEADERS.length}><AdminFinanceEmptyState title={t('finance.admin_finance_payments_table.text_c1f531f996')} description={t('finance.admin_finance_payments_table.auto_ee688868e5')} /></td></tr>
            ) : sortedPayments.map((payment) => {
              const methodStyle = FINANCE_METHOD_STYLES[payment.method] ?? { bg: 'bg-input', text: 'text-secondary' };
              const statusStyle = FINANCE_STATUS_STYLES[payment.status] ?? { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={payment.id} className="bg-card hover:bg-surface-highlight motion-safe:transition-colors motion-safe:duration-base">
                  <td className="px-4 py-3 text-sm font-mono text-secondary">{payment.invoiceNo}</td>
                  <td className="px-4 py-3 text-sm font-medium text-primary">{payment.member?.name ?? `Member #${payment.memberId}`}</td>
                  <td className="px-4 py-3 text-sm font-bold text-success"><span>{AdminFinanceFormatCurrency(payment.amount, 'INR', locale) !== '—' ? AdminFinanceFormatCurrency(payment.amount, 'INR', locale) : (Number.isFinite(payment.amount) ? `₹${(payment.amount > 1000 ? payment.amount / 100 : payment.amount).toLocaleString(locale)}` : '—')}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${methodStyle.bg} ${methodStyle.text}`} data-testid="finance-overview-finance-overview-payments-table-status-badge">{FINANCE_PAYMENT_METHOD_LABEL_KEYS[payment.method] ? t(FINANCE_PAYMENT_METHOD_LABEL_KEYS[payment.method] as string) : payment.method}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`} data-testid="finance-overview-finance-overview-payments-table-status-badge-2">{FINANCE_PAYMENT_STATUS_LABEL_KEYS[payment.status] ? t(FINANCE_PAYMENT_STATUS_LABEL_KEYS[payment.status] as string) : payment.status}</span></td>
                  <td className="px-4 py-3 text-sm text-secondary">{formatDate(payment.paidAt, locale)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <AdminNavigationLayoutPagination currentPage={currentPage} totalPages={totalPages} totalItems={totalPayments} itemsPerPage={FINANCE_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
      </div>
    </>
  );
}
