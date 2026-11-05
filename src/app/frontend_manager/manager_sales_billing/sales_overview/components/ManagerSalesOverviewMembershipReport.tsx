// RESPONSIBILITY: Renders ManagerSalesOverviewMembershipReport's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalEnvConfig';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_sales_billing/sales_overview/constants/ManagerSalesOverviewLocalPaginationDefaults';

import ManagerSalesOverviewMembershipReportEmptyState from '@/app/frontend_manager/manager_sales_billing/sales_overview/components/ManagerSalesOverviewMembershipReportEmptyState';
import { useManagerSalesOverviewLogic } from '@/app/frontend_manager/manager_sales_billing/sales_overview/hooks/useManagerSalesOverviewLogic';
import { ManagerSalesOverviewFormatCurrency } from '@/app/frontend_manager/manager_sales_billing/sales_overview/utils/ManagerSalesOverviewFormatters';


/**
 * @description Renders/orchestrates the ManagerSalesOverviewMembershipReport user interface for the sales module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_sales_billing/manager_sales_utils/ManagerSalesOverviewFormatters; @/components/ui/manager_pagination/ManagerPagination; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerPaginationDefaults; @/app/frontend_manager/manager_sales_billing/manager_sales_components/manager_sales_views/manager_sales_membership_report/ManagerSalesOverviewMembershipReportEmptyState
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
      <div className="space-y-2 p-4" aria-label={t("COPY_LOADING_MEMBERSHIP_REPORT")}><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /><div className="h-10 rounded-lg bg-input motion-safe:animate-pulse" /></div>
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
  <>
 <div className="overflow-x-auto">
 <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={[t('COPY_PLAN'), t('COPY_TOTAL_RECEIVABLE'), t('COPY_AMOUNT_RECEIVED'), t('COPY_REMAINING'), t('COPY_REFUND')]}>
<table className="w-full">
 <thead className="bg-input">
 <tr>
 {[t('COPY_PLAN'), t('COPY_TOTAL_RECEIVABLE'), t('COPY_AMOUNT_RECEIVED'), t('COPY_REMAINING'), t('COPY_REFUND')].map(h => (
 <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 py-3">
 {h}
 </th>
 ))}
 </tr>
 </thead>
  <tbody className="divide-y divide-border">
  {paginated.length > 0 ? (
    paginated.map((r) => (
      <tr key={r.plan} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
      <td className="px-4 py-3 text-sm font-medium text-text-primary">{r.plan || ''}</td>
      <td className="px-4 py-3 text-sm text-text-secondary">{ManagerSalesOverviewFormatCurrency(r.receivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm font-medium text-success-text ">{ManagerSalesOverviewFormatCurrency(r.received || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm font-medium text-warning-text ">{ManagerSalesOverviewFormatCurrency(r.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      <td className="px-4 py-3 text-sm text-danger-text">{ManagerSalesOverviewFormatCurrency(r.refund || 0, ManagerEnvConfig.currencyCode, locale)}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={SALES_MEMBERSHIP_REPORT_COLUMN_COUNT} className="px-4 py-8 text-center text-sm text-text-secondary">
        <ManagerSalesOverviewMembershipReportEmptyState />
      </td>
    </tr>
  )}
 <tr className="bg-input font-semibold border-t-2 border-border">
 <td className="px-4 py-3 text-sm text-text-primary">{t("COPY_TOTAL")}</td>
          <td className="px-4 py-3 text-sm text-text-primary">{ManagerSalesOverviewFormatCurrency(membershipTotals.totalReceivable || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-success-text ">{ManagerSalesOverviewFormatCurrency(membershipTotals.totalReceived || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-warning-text ">{ManagerSalesOverviewFormatCurrency(membershipTotals.remaining || 0, ManagerEnvConfig.currencyCode, locale)}</td>
          <td className="px-4 py-3 text-sm text-danger-text ">{ManagerSalesOverviewFormatCurrency(membershipTotals.refunds || 0, ManagerEnvConfig.currencyCode, locale)}</td>
 </tr>
  </tbody>
  </table>
</ManagerInfrastructureResponsiveTable>
  </div>
  <div className="mt-4 pt-4 border-t border-border">
      <ManagerPagination data-testid="manager_sales-managersalesmembershipreport-managerpagination-1" 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  </>
  );
}
