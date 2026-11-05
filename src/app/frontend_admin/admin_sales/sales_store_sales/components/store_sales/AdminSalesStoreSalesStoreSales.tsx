"use client";
// RESPONSIBILITY: Renders the Sales module's store-order summary and paginated order list; it owns only presentation and row expansion state.
// DATA FLOW: Store Sales UI → useAdminSalesLogic → AdminSalesApi → module-owned MSW/backend → TanStack Query → visible list/summary.

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesFormatters';
import { useState } from 'react';
import { Package, ShoppingCart, IndianRupee, TrendingUp, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesFormatCurrency';
import { maskAdminSalesListAmount } from '@/app/frontend_admin/admin_sales/sales_store_sales/utils/AdminSalesStoreSalesMaskFinancialAmount';

import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_store_sales/hooks/useAdminSalesStoreSalesLogic';
import { ADMIN_SALES_PAYMENT_MODE_STYLES } from '@/app/frontend_admin/admin_sales/sales_store_sales/constants/AdminSalesStoreSalesConstants';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/sales_store_sales/components/empty_state/AdminSalesStoreSalesEmptyState';

/**
 * getPaymentClasses is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function getPaymentClasses(method: string): string {
  return ADMIN_SALES_PAYMENT_MODE_STYLES[method] ?? 'bg-input text-secondary';
}

/**
 * AdminSalesAnalyticsStoreSales renders the admin sales store sales UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsStoreSales: Renders the Sales module's store-order summary and paginated order list; it owns only presentation and row expansion state.
 * @dependencies Consumes AdminSalesFormatters, AdminSalesFormatCurrency, useAdminSalesLogic, AdminSalesEmptyState.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAnalyticsStoreSales() {
  const locale = useLocale();
  const t = useTranslations();

  const { storeOrders, storeOrdersTotal, storeSummary, storeStatus, storeError, retryStoreOrders, storeSummaryStatus, storeSummaryError, retryStoreSummary, setCurrentPage, currentPage } = useAdminSalesLogic();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(storeOrdersTotal / 10));

  if (storeStatus === 'pending') {
    return (
      <div className="space-y-4" aria-label={t('sales.admin_sales_store_sales.text_42f8f91b08')} aria-busy="true">
        {['store-skeleton-1', 'store-skeleton-2', 'store-skeleton-3', 'store-skeleton-4'].map((key) => <div key={key} className="h-14 bg-skeleton-base rounded-lg motion-safe:animate-pulse motion-safe:duration-base" />)}
      </div>
    );
  }

  if (storeStatus === 'error') {
    return (
      <div role="alert" className="rounded-xl border border-border bg-danger-bg p-5 flex items-center justify-between gap-4" data-testid="admin_sales-admin_sales-store-sales-control">
        <p className="text-sm text-danger">{storeError || t('sales.admin_sales_store_sales.auto_storeSalesLoadFailed')}</p>
        <button type="button" onClick={() => void retryStoreOrders()} className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 inline-flex items-center gap-2 px-4 rounded-md border border-border text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_sales-admin_sales-store-sales-click">
          <RefreshCw size={18} aria-hidden="true"  strokeWidth={2}/> {t('sales.admin_sales_store_sales.text_9f5cd8a2e8')}</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {storeSummaryStatus === 'pending' ? <div aria-busy="true" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"><div className="h-24 rounded-lg bg-skeleton-base motion-safe:animate-pulse" /><div className="h-24 rounded-lg bg-skeleton-base motion-safe:animate-pulse" /><div className="h-24 rounded-lg bg-skeleton-base motion-safe:animate-pulse sm:col-span-2" /></div> : storeSummaryStatus === 'error' ? (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg p-4"><p className="text-danger">{storeSummaryError || t('sales.admin_sales_store_sales.auto_storeSummaryLoadFailed')}</p><button type="button" onClick={() => void retryStoreSummary()} className="min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="sales-analytics-sales-analytics-store-sales-retry-store-summary">{t('sales.SalesError.text_042c862e44')}</button></div>
      ) : storeSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border shadow-card"><div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2"><Package size={18} aria-hidden="true"  strokeWidth={2}/> {t('sales.admin_sales_store_sales.text_c48f2bf5b2')}</div><div className="text-2xl font-bold text-primary">{storeSummary.totalProducts}</div></div>
          <div className="bg-card rounded-lg p-4 border border-border shadow-card"><div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2"><ShoppingCart size={18} aria-hidden="true"  strokeWidth={2}/> {t('sales.admin_sales_store_sales.text_408fa7b3a9')}</div><div className="text-2xl font-bold text-primary">{storeSummary.totalOrders}</div></div>
          <div className="bg-card rounded-lg p-4 border border-border shadow-card sm:col-span-2"><div className="flex items-center gap-2 text-secondary text-xs font-medium mb-2"><IndianRupee size={18} aria-hidden="true"  strokeWidth={2}/> {t('sales.admin_sales_store_sales.text_3b56959818')}</div><div className="text-2xl font-bold text-primary">{AdminSalesFormatCurrency(storeSummary.totalRevenue, undefined, locale)}</div></div>
        </div>
      )}

      <section aria-labelledby="store-orders-heading">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 id="store-orders-heading" className="font-semibold text-primary flex items-center gap-2"><TrendingUp size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/> {t('sales.admin_sales_store_sales.text_e6240146f7')}</h3>
          <span className="text-xs text-secondary">{storeOrdersTotal} {t('sales.admin_sales_store_sales.text_88fcf03353')}</span>
        </div>

        {storeOrders.length === 0 ? (
          <AdminSalesEmptyState message={t('sales.admin_sales_store_sales.auto_39613b51eb')} subtext={t('sales.admin_sales_store_sales.auto_03aef17c06')} />
        ) : (
          <div className="space-y-2">
            {storeOrders.map((order , __testIdIndex79) => (
              <article key={order.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
                <button
                  type="button"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full min-h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 text-left hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out min-h-11 min-w-11 motion-safe:active:scale-95"
                  aria-expanded={expandedOrder === order.id}
                  aria-controls={expandedOrder === order.id ? `store-order-${order.id}` : undefined}
                 data-testid={`admin_sales-admin_sales-store-sales-click-2-map79-${__testIdIndex79}-1`}>
                  <span className="flex items-center gap-4 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-primary-subtle flex items-center justify-center shrink-0"><ShoppingCart size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/></span>
                    <span className="min-w-0"><span className="block font-medium text-primary text-sm truncate">{t('sales.admin_sales_store_sales.text_f1e486fe3f')}{order.id.toUpperCase()}</span><span className="block text-xs text-secondary">{formatDate(order.createdAt, locale)}</span></span>
                  </span>
                  <span className="flex items-center gap-3 sm:gap-4 justify-end"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getPaymentClasses(order.method)}`} data-testid="sales-analytics-sales-analytics-store-sales-status-badge">{order.method}</span><span className="font-bold text-primary">{expandedOrder === order.id ? AdminSalesFormatCurrency(order.total, undefined, locale) : <span aria-label={t('AdminAuditRepair.financialAmountHidden')}>{maskAdminSalesListAmount()}</span>}</span>{expandedOrder === order.id ? <ChevronUp size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/> : <ChevronDown size={18} className="text-secondary" aria-hidden="true"  strokeWidth={2}/>}</span>
                </button>

                {expandedOrder === order.id && (
                  <div id={`store-order-${order.id}`} className="border-t border-border bg-input px-4 py-3">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">{t('sales.admin_sales_store_sales.text_44d25b5d1b')}</p>
                    <div className="space-y-1.5">
                      {(order.items ?? []).map((item) => <div key={item.id} className="flex items-center justify-between gap-4 text-sm"><span className="text-primary min-w-0 truncate">{item.product.name} <span className="text-secondary">× {item.qty}</span></span><span className="text-secondary font-medium shrink-0">{AdminSalesFormatCurrency(item.price * item.qty, undefined, locale)}</span></div>)}
                    </div>
                    <div className="flex justify-between mt-3 pt-2 border-t border-border"><span className="text-sm font-semibold text-primary">{t('sales.admin_sales_store_sales.text_b25928c699')}</span><span className="text-sm font-bold text-primary">{AdminSalesFormatCurrency(order.total, undefined, locale)}</span></div>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}

        {storeOrders.length > 0 && totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <span className="text-sm text-secondary">{t('sales.admin_sales_store_sales.text_163d8174ff')}{(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, storeOrdersTotal)} {t('sales.admin_sales_store_sales.text_de04fa0e29')}{storeOrdersTotal}</span>
            <div className="flex gap-2">
              <button type="button" disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)} className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 px-4 rounded-md border border-border text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_sales-admin_sales-store-sales-click-3">{t('sales.admin_sales_store_sales.text_50f94286ba')}</button>
              <button type="button" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11 px-4 rounded-md border border-border text-primary disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-testid="admin_sales-admin_sales-store-sales-click-4">{t('sales.admin_sales_store_sales.text_bc981983e7')}</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
