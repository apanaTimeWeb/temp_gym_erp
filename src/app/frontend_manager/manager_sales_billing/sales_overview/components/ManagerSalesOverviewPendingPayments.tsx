// RESPONSIBILITY: Renders ManagerSalesOverviewPendingPayments's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { MANAGER_SALES_OVERVIEW_API } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { useTranslations, useLocale } from 'next-intl';

import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalPaginationDefaults';
import { GYM_DETAILS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewLocalGymIdentity';



import ManagerSalesOverviewEmptyState from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewEmptyState';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';
import { ManagerSalesOverviewFormatCurrency, ManagerSalesOverviewFormatDate } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewFormatters';
import type { PendingPaymentMember } from '@/app/frontend_manager/manager_sales_billing/sales_overview/types/manager_sales_overview.types';


/** @description Renders the ManagerSalesOverviewPendingPayments component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (11 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerSalesOverviewPendingPayments() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
  const locale = useLocale();

  const { currentPage, setCurrentPage, pendingPayments, pendingTotal, isPending, isError, errorMessage } = useManagerSalesOverviewLogic();

  const totalPages = Math.ceil(pendingPayments.length / MANAGER_ITEMS_PER_PAGE) || 1;
  const visiblePendingPayments = pendingPayments.slice((currentPage - 1) * MANAGER_ITEMS_PER_PAGE, currentPage * MANAGER_ITEMS_PER_PAGE);

  if (isPending) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={`skeleton-${i}`} className="motion-safe:animate-pulse flex items-center justify-between p-4 border border-border rounded-xl bg-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
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

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
        <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_2")}</span>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-text-secondary mb-4">
        {pendingPayments.length} {t("COPY_MEMBERS_PENDING_PAYMENTS")} · {t("COPY_TOTAL")}: {ManagerSalesOverviewFormatCurrency(pendingTotal, ManagerEnvConfig.currencyCode, locale)}</p>
      <div className="space-y-3">
        {visiblePendingPayments.map((p: PendingPaymentMember, mapIndex) => (
          <div key={p.id} className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-warning motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1 hover:shadow-card bg-card">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-danger rounded-full flex items-center justify-center text-on-danger font-semibold text-sm" data-testid="manager_sales-managersalespendingpayments-status-badge-1">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-text-primary">{p.name}</p>
                <p className="text-xs text-text-secondary">{p.plan || t('COPY_STANDARD')}{t("COPY_PLAN")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-danger-text">{ManagerSalesOverviewFormatCurrency(p.pendingAmount || 0, ManagerEnvConfig.currencyCode, locale)}</p>
                <p className="text-xs text-text-secondary opacity-80">{p.daysOverdue || 0}{locale.startsWith('hi') ? ' दिन बकाया' : t('COPY_DAYS_OVERDUE')}</p>
              </div>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "px-3 py-1.5 text-xs text-on-primary bg-primary rounded-lg font-medium motion-safe:transition-all motion-safe:duration-200 ease-in-out hover:bg-primary-hover motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_sales-sales-managersalespendingpayments-button-days-overdue-${mapIndex}`}
                onClick={() => {
                  const waText = WhatsAppFormatter.formatReceipt({
                    title: GYM_DETAILS.name,
                    subtitle: t("COPY_PAYMENT_REMINDER"),
                    date: ManagerSalesOverviewFormatDate(new Date().toISOString(), locale),
                    customerInfo: {
                      [locale.startsWith('hi') ? 'सदस्य' : 'Member']: p.name,
                      [t('COPY_PLAN')]: p.plan || t('COPY_STANDARD') },
                    sections: [
                      {
                        title: t("COPY_OUTSTANDING_DUES"),
                        items: {
                          [t('COPY_TOTAL')]: ManagerSalesOverviewFormatCurrency(p.pendingAmount || 0, ManagerEnvConfig.currencyCode, locale),
                          [locale.startsWith('hi') ? 'बकाया दिन' : t('COPY_DAYS_OVERDUE')]: `${p.daysOverdue || 0}` }
                      }
                    ],
                    footer: locale.startsWith('hi') ? 'कृपया सेवा में व्यवधान से बचने के लिए बकाया राशि जमा करें।' : 'Please clear the outstanding amount to avoid service interruption.'
                  });
                  const phone = p.phone?.replace(/\D/g, '') || '';
                  if (!phone) return;
                  const popup = window.open(`${MANAGER_SALES_OVERVIEW_API.INTEGRATIONS.WHATSAPP_WEB_BASE}/91${phone}?text=${encodeURIComponent(waText)}`, '_blank', 'noopener,noreferrer');
                  if (popup) popup.opener = null;
                }}
                
               type="button">{t("COPY_SEND_REMINDER")}</button>
            </div>
          </div>
        ))}
        {pendingPayments.length === 0 && (
          <ManagerSalesOverviewEmptyState message={t("COPY_NO_PENDING_PAYMENTS")} subtext={t("COPY_ALL_MEMBERS_UP_DATE")} />
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
          <ManagerPagination data-testid="manager_sales-managersalespendingpayments-managerpagination-1"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    </div>
  );
}
