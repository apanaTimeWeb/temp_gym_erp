// RESPONSIBILITY: Renders ManagerSalesOverviewMembershipReport's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useTranslations, useLocale } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalPaginationDefaults';

import ManagerSalesOverviewMembershipReportEmptyState from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewMembershipReportEmptyState';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';
import { ManagerSalesOverviewFormatCurrency } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewFormatters';

const SALES_MEMBERSHIP_REPORT_COLUMN_COUNT = 5;

/** @description Renders the ManagerSalesOverviewMembershipReport component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (7 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerSalesOverviewMembershipReport() {
  const t = useTranslations('MANAGER_SALES_OVERVIEW');
  const locale = useLocale();

  const { currentPage, setCurrentPage, membershipReport, membershipReportTotal, membershipTotals, isPending, isError, errorMessage } = useManagerSalesOverviewLogic();
  
  const totalPages = Math.max(1, Math.ceil(membershipReportTotal / MANAGER_ITEMS_PER_PAGE));
  const paginated = membershipReport;

  if (isPending) {
    return (
      <div className="space-y-2 p-4" aria-label={t("COPY_LOADING_MEMBERSHIP_REPORT")}>
        <div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" />
        <div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" />
        <div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-card rounded-2xl border border-danger">
        <p className="text-danger-text font-medium">{errorMessage || t("TEXT_GENERIC_ERROR")}</p>
        <span className="text-sm text-text-secondary">{t("COPY_RETRY_REQUEST_4")}</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="max-h-[640px] overflow-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={[t('COPY_PLAN'), t('COPY_TOTAL_RECEIVABLE'), t('COPY_AMOUNT_RECEIVED'), t('COPY_REMAINING'), t('COPY_REFUND')]}>
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
              <tr>
                {[t('COPY_PLAN'), t('COPY_TOTAL_RECEIVABLE'), t('COPY_AMOUNT_RECEIVED'), t('COPY_REMAINING'), t('COPY_REFUND')].map((h, idx) => (
                  <th
                    key={h}
                    className={`text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap ${
                      idx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginated.length > 0 ? (
                paginated.map((r, index) => (
                  <tr key={`${r.plan}-${index}`} className="hover:bg-surface-hover transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3 text-sm font-medium text-text-primary whitespace-nowrap group-hover:bg-surface-hover transition-colors">
                      <div className="flex items-center gap-2">
                        <span>{r.plan || ''}</span>
                        {r.plan ? <CopyButton value={r.plan} /> : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(r.receivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-success-text whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(r.received || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-warning-text whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(r.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                    <td className="px-4 py-3 text-sm text-danger-text whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(r.refund || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={SALES_MEMBERSHIP_REPORT_COLUMN_COUNT} className="px-4 py-8 text-center text-sm text-text-secondary">
                    <ManagerSalesOverviewMembershipReportEmptyState />
                  </td>
                </tr>
              )}
              <tr className="bg-overlay font-semibold border-t-2 border-border">
                <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3 text-sm text-text-primary whitespace-nowrap">{t("COPY_TOTAL")}</td>
                <td className="px-4 py-3 text-sm text-text-primary whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(membershipTotals.totalReceivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm text-success-text whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(membershipTotals.totalReceived || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm text-warning-text whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(membershipTotals.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
                <td className="px-4 py-3 text-sm text-danger-text whitespace-nowrap">{ManagerSalesOverviewFormatCurrency(membershipTotals.refunds || 0, ManagerEnvConfig.currencyCode, locale)}</td>
              </tr>
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
      <div className="border-t border-border px-4 py-3 bg-card">
        <ManagerPagination data-testid="manager_sales-managersalesmembershipreport-managerpagination-1" 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
