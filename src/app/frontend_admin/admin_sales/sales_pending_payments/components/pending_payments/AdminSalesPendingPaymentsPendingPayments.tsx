"use client";
// RESPONSIBILITY: Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state.
// DATA FLOW: feature data/state and user input → AdminSalesAnalyticsPendingPayments → accessible UI/events routed to owning hooks (admin_finance/finance_pending_sales_payments/components/pending_payments/AdminSalesAnalyticsPendingPayments.tsx)

import { buildAdminSalesWhatsAppWebUrl } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsExternalUrlConstants';
import { useLocale, useTranslations } from 'next-intl';
import { AdminSalesFormatCurrency } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsFormatCurrency';
import { maskAdminSalesListAmount } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsMaskFinancialAmount';
import { displayValue } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsDisplayValue';
import { formatDate, getAdminSalesPendingPaymentsCurrentUtcTimestamp } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsFormatters';

import { useAdminSalesLogic } from '@/app/frontend_admin/admin_sales/sales_pending_payments/hooks/useAdminSalesPendingPaymentsLogic';

import AdminNavigationLayoutPagination from '@/app/frontend_admin/admin_sales/sales_pending_payments/components/AdminSalesPendingPaymentsPagination';
import AdminSalesEmptyState from '@/app/frontend_admin/admin_sales/sales_pending_payments/components/empty_state/AdminSalesPendingPaymentsEmptyState';
import type { PendingPaymentMember } from '@/app/frontend_admin/admin_sales/sales_pending_payments/types/AdminSalesPendingPaymentsTypes';
import { ADMIN_GYM_CONFIGURATION } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsGymConfiguration';
import { ADMIN_SALES_PENDING_PAYMENTS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_sales/sales_pending_payments/constants/AdminSalesPendingPaymentsConstants';
import { AdminSalesWhatsAppFormatter } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsWhatsAppFormatter';

/**
 * AdminSalesAnalyticsPendingPayments renders the admin sales pending payments UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminSalesAnalyticsPendingPayments: Renders the list of members with pending payments, including skeleton loader, pagination, and overdue details. Receives data via useAdminSalesLogic state.
 * @dependencies Consumes AdminSalesFormatCurrency, AdminSalesFormatters, useAdminSalesLogic, admin_sales_url_config, AdminNavigationLayoutPagination.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminSalesAnalyticsPendingPayments() {
  const locale = useLocale();
  const t = useTranslations();

  const { currentPage, setCurrentPage, pendingPayments, pendingTotal, pendingPaymentsStatus, pendingPaymentsError, retryPendingPayments } = useAdminSalesLogic();

  const totalPages = Math.ceil(pendingTotal / ADMIN_SALES_PENDING_PAYMENTS_ITEMS_PER_PAGE) || 1;

  if (pendingPaymentsStatus === 'pending') {
    return (
      <div className="space-y-3" aria-busy="true">
        <p className="sr-only" role="status" aria-live="polite">{t('sales.AdminRepair.loadingCount')}</p>
        {[...Array(5)].map((_, i) => (
          <div key={`sales-pending-skeleton-${i}`} className="motion-safe:animate-pulse flex items-center justify-between p-4 border border-border rounded-xl bg-card motion-safe:duration-base">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-input rounded-full"></div>
              <div>
                <div className="h-4 bg-input rounded w-24 mb-1"></div>
                <div className="h-3 bg-input rounded w-16"></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-4 bg-input rounded w-16 mb-1 ml-auto"></div>
                <div className="h-3 bg-input rounded w-20"></div>
              </div>
              <div className="w-24 h-8 bg-input rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (pendingPaymentsStatus === 'error') {
    return (
      <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg p-4">
        <p className="text-danger">{pendingPaymentsError || t('sales.admin_sales_pending_payments.auto_loadFailed')}</p>
        <button type="button" onClick={() => void retryPendingPayments()} className="min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="sales-analytics-sales-analytics-pending-payments-retry-pending-payments">{t('sales.SalesError.text_042c862e44')}</button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-secondary mb-4">
        {pendingTotal} {t('sales.admin_sales_pending_payments.text_315dc9e5fb')}</p>
      <div className="space-y-3">
        {pendingPayments.map((p: PendingPaymentMember , __testIdIndex61) => (
          <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-border motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger rounded-full flex items-center justify-center text-on-danger font-semibold text-sm" data-testid={`admin_sales-adminsalespendingpayments-status-1-map61-${__testIdIndex61}-1`}>
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-primary">{p.name}</p>
                <p className="text-xs text-secondary">{displayValue(p.plan)} {t('sales.admin_sales_pending_payments.text_ae2f98a099')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-danger"><span aria-label={t('AdminAuditRepair.financialAmountHidden')}>{maskAdminSalesListAmount()}</span></p>
                <p className="text-xs text-secondary opacity-80">{p.daysOverdue || 0} {t('sales.admin_sales_pending_payments.text_acb1814fce')}</p>
              </div>
              <button type="button"
                onClick={() => {
                  const waText = AdminSalesWhatsAppFormatter.formatReceipt({
                    title: ADMIN_GYM_CONFIGURATION.name,
                    subtitle: t('sales.admin_sales_pending_payments.whatsappReminderTitle'),
                    date: formatDate(getAdminSalesPendingPaymentsCurrentUtcTimestamp(), locale),
                    customerInfo: {
                      [t('sales.admin_sales_pending_payments.whatsappMemberLabel')]: p.name,
                      [t('sales.admin_sales_pending_payments.text_ae2f98a099')]: p.plan ?? '—',
                    },
                    sections: [
                      {
                        title: t('sales.admin_sales_pending_payments.whatsappOutstandingDues'),
                        items: {
                          [t('sales.admin_sales_pending_payments.whatsappPendingAmount')]: t('AdminAuditRepair.amountAvailableOnRequest'),
                          [t('sales.admin_sales_pending_payments.whatsappOverdueBy')]: `${p.daysOverdue || 0} ${t('sales.admin_sales_pending_payments.text_acb1814fce')}`,
                        }
                      }
                    ],
                    footer: t('sales.admin_sales_pending_payments.whatsappFooter')
                  });
                  const reminderUrl = buildAdminSalesWhatsAppWebUrl(p.phone ?? '', waText);
                  if (reminderUrl) window.open(reminderUrl, '_blank', 'noopener,noreferrer');
                }}
                disabled={!buildAdminSalesWhatsAppWebUrl(p.phone ?? '', '')}
                aria-label={buildAdminSalesWhatsAppWebUrl(p.phone ?? '', '') ? t('sales.admin_sales_pending_payments.text_f3789fc9e6') : t('sales.admin_sales_pending_payments.whatsappInvalidRecipient')}
                title={!buildAdminSalesWhatsAppWebUrl(p.phone ?? '', '') ? t('sales.admin_sales_pending_payments.whatsappInvalidRecipient') : undefined}
                className="px-3 py-1.5 text-xs text-on-primary bg-primary rounded-lg font-medium motion-safe:transition-all motion-safe:duration-base ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11"
               data-testid={`admin_sales-admin_sales-pending-payments-click-map61-${__testIdIndex61}-2`}>
                {t('sales.admin_sales_pending_payments.text_f3789fc9e6')}</button>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <AdminSalesEmptyState message={t('sales.admin_sales_pending_payments.auto_6f3655f8b3')} subtext={t('sales.admin_sales_pending_payments.auto_d5bc7150da')} />
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
          <AdminNavigationLayoutPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
