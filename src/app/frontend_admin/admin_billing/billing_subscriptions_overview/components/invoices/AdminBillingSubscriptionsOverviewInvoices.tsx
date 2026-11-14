"use client";
// RESPONSIBILITY: Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions.
// DATA FLOW: feature data/state and user input → AdminSubscriptionsManagementInvoices → accessible UI/events routed to owning hooks (admin_subscriptions/subscriptions_overview/components/invoices/AdminSubscriptionsManagementInvoices.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { formatDate } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatters';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewFormatCurrency';
import { isSafeAdminSubscriptionsInvoicePdfUrl } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/utils/AdminBillingSubscriptionsOverviewSafeInvoicePdfUrl';

import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/AdminBillingSubscriptionsOverviewPagination';
import { CheckCircle, Clock, Download, FileText, RotateCcw, XCircle } from 'lucide-react';
import { useAdminSubscriptionsLogic } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/hooks/useAdminBillingSubscriptionsOverviewLogic';
import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/constants/AdminBillingSubscriptionsOverviewConstants';
import { AdminSubscriptionsManagementEmptyState as AdminSubscriptionsEmptyState } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/components/empty_state/AdminBillingSubscriptionsOverviewEmptyState';
import type { InvoiceStatus } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/types/AdminBillingSubscriptionsOverviewTypes';
import { ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_VALUES as ADMIN_SUBSCRIPTIONS_INVOICE_STATUS } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/constants/AdminBillingSubscriptionsOverviewConstants';

/**
 * renderInvoiceStatusIcon is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function renderInvoiceStatusIcon(status: InvoiceStatus) {
  if (status === ADMIN_SUBSCRIPTIONS_INVOICE_STATUS.PAID) return <CheckCircle size={18} aria-hidden="true"  strokeWidth={2}/>;
  if (status === ADMIN_SUBSCRIPTIONS_INVOICE_STATUS.PENDING) return <Clock size={18} aria-hidden="true"  strokeWidth={2}/>;
  if (status === ADMIN_SUBSCRIPTIONS_INVOICE_STATUS.FAILED) return <XCircle size={18} aria-hidden="true"  strokeWidth={2}/>;
  return <RotateCcw size={18} aria-hidden="true"  strokeWidth={2}/>;
}

/**
 * AdminSubscriptionsManagementInvoices renders the admin subscriptions invoices UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSubscriptionsManagementInvoices: Renders paginated invoice history with feature-owned status mapping and demonstrable PDF actions.
 * @dependencies Consumes AdminSubscriptionsFormatters, AdminSubscriptionsFormatCurrency, AdminNavigationLayoutPagination, useAdminSubscriptionsLogic, AdminSubscriptionsConstants.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSubscriptionsManagementInvoices() {
  const locale = useLocale();
  const t = useTranslations();

  const {
    invoices,
    currentInvoicePage,
    setCurrentInvoicePage,
    invoiceTotal,
    invoiceTotalPages,
    invoiceItemsPerPage, invoicesStatus, invoicesError, retryInvoices,
  } = useAdminSubscriptionsLogic();

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-primary" aria-hidden="true"  strokeWidth={2}/>
          <h3 className="text-sm font-semibold text-primary">{t('subscriptions.admin_finance_subscription_invoices.text_50d038cf02')}</h3>
        </div>
        <span className="text-xs text-secondary">{invoiceTotal} {t('subscriptions.admin_finance_subscription_invoices.text_c3e815afba')}</span>
      </div>
      {invoicesStatus === 'pending' ? (
        <div className="p-8 text-center text-sm text-secondary" role="status" data-testid="subscriptions-management-subscriptions-management-invoices-status-region">{t('subscriptions.AdminSubscriptionsError.loadingInvoices')}</div>
      ) : invoicesStatus === 'error' ? (
        <div className="p-8 text-center" role="alert"><p className="text-danger">{t('subscriptions.AdminSubscriptionsError.invoiceLoadFailed')}</p><button type="button" onClick={() => void retryInvoices()} className="mt-3 min-h-11 rounded-lg border border-border px-4 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="subscriptions-management-subscriptions-management-invoices-retry-invoices">{t('subscriptions.AdminSubscriptionsError.retry')}</button></div>
      ) : invoices.length === 0 ? (
        <AdminSubscriptionsEmptyState
          title={t('subscriptions.admin_finance_subscription_invoices.text_5e193a73d8')}
          description={t('subscriptions.admin_finance_subscription_invoices.auto_e1af0c24ca')}
        />
      ) : (
        <>
          <div className="overflow-x-auto">
            <table data-admin-responsive-table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-surface-highlight">
                  {['subscriptions.admin_finance_subscription_invoices.invoice', 'subscriptions.admin_finance_subscription_invoices.date', 'subscriptions.admin_finance_subscription_invoices.plan', 'subscriptions.admin_finance_subscription_invoices.billing', 'subscriptions.admin_finance_subscription_invoices.amount', 'subscriptions.admin_finance_subscription_invoices.status', ''].map((header) => (
                    <th key={header} className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-secondary">
                      {header ? t(header) : <span className="sr-only">{t('subscriptions.admin_finance_subscription_invoices.actions')}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice , __testIdIndex73) => {
                  const statusStyle = ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES[invoice.status];
                  const safeInvoicePdfUrl = isSafeAdminSubscriptionsInvoicePdfUrl(invoice.pdfUrl);

                  return (
                    <tr key={invoice.id} className="motion-safe:transition-colors hover:bg-input motion-safe:duration-base">
                      <td className="px-4 py-3 text-sm font-bold text-primary">{invoice.invoiceNo}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-secondary">
                        {formatDate(invoice.date, locale)}
                      </td>
                      <td className="px-4 py-3 text-sm text-primary">{invoice.planName}</td>
                      <td className="px-4 py-3 text-xs capitalize text-secondary">{invoice.billingCycle}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-primary"><span>{AdminSubscriptionsFormatCurrency(invoice.amount, 'INR', locale) !== '—' ? AdminSubscriptionsFormatCurrency(invoice.amount, 'INR', locale) : (Number.isFinite(invoice.amount) ? `₹${(invoice.amount > 1000 ? invoice.amount / 100 : invoice.amount).toLocaleString(locale)}` : '—')}</span></td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle.backgroundClass} ${statusStyle.textClass}`} data-testid="subscriptions-management-subscriptions-management-invoices-status-badge-2">
                          {renderInvoiceStatusIcon(invoice.status)}
                          {t(statusStyle.labelKey)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => { if (safeInvoicePdfUrl) window.open(invoice.pdfUrl, '_blank', 'noopener,noreferrer'); }}
                          disabled={!safeInvoicePdfUrl}
                          className="min-h-11 min-w-11 rounded-lg p-1.5 text-secondary motion-safe:transition-colors hover:bg-input hover:text-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label={safeInvoicePdfUrl ? t('admin_finance_subscription_invoices.auto_download', { invoice: invoice.invoiceNo }) : t('subscriptions.AdminAuditRepair.invoicePdfUnavailable')}
                          title={safeInvoicePdfUrl ? t('admin_finance_subscription_invoices.auto_download', { invoice: invoice.invoiceNo }) : t('subscriptions.AdminAuditRepair.invoicePdfUnavailable')}
                         data-testid={`admin_subscriptions-admin_subscriptions-invoices-click-map73-${__testIdIndex73}-1`}>
                          <Download size={18} aria-hidden="true"  strokeWidth={2}/>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-3">
            <AdminNavigationLayoutPagination
              currentPage={currentInvoicePage}
              totalPages={invoiceTotalPages}
              totalItems={invoiceTotal}
              itemsPerPage={invoiceItemsPerPage}
              onPageChange={setCurrentInvoicePage}
            />
          </div>
        </>
      )}
    </div>
  );
}
