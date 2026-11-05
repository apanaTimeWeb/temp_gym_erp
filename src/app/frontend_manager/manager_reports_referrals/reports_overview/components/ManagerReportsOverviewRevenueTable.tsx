// RESPONSIBILITY: Renders ManagerReportsOverviewRevenueTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useTranslations, useLocale } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';

import ManagerReportsOverviewEmptyState from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewEmptyState';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import { ManagerReportsOverviewFormatCurrency } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';

/**
 * @description Renders/orchestrates the ManagerReportsOverviewRevenueTable user interface for the reports module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_reports_referrals/manager_reports_utils/ManagerReportsOverviewFormatters; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerEnvConfig; @/app/frontend_manager/manager_reports_referrals/manager_reports_components/manager_reports_table/ManagerReportsOverviewEmptyState; @/app/frontend_manager/manager_reports_referrals/manager_reports_hooks/useManagerReportsOverviewLogic
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */

/** @description Renders the ManagerReportsOverviewRevenueTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsOverviewRevenueTable() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsOverviewFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);

  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.revenueData ?? [];
  return (
    <div data-testid="manager_reports-managerreportsrevenuetable-region" className="w-full overflow-x-auto"role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_3")}>
      <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={[t('COPY_MONTH'), t('COPY_REVENUE'), t('COPY_EXPENSES'), t('COPY_NET_PROFIT')]}>
<table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {[t('COPY_MONTH'), t('COPY_REVENUE'), t('COPY_EXPENSES'), t('COPY_NET_PROFIT')].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {(() => { if (data.length === 0) { return <tr><td colSpan={4}><ManagerReportsOverviewEmptyState /></td></tr>; } return data.map(d => (
          <tr key={d.month} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
            <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{d.month}</td>
            <td className="px-5 py-3.5 text-sm text-success-text font-semibold">{formatReportCurrency(d.revenue)}</td>
            <td className="px-5 py-3.5 text-sm text-danger-text">{formatReportCurrency(d.expenses)}</td>
            <td className={`px-5 py-3.5 text-sm font-semibold ${d.profit >= 0 ? 'text-success-text' : 'text-danger-text'}`}>{formatReportCurrency(d.profit)}</td>
          </tr>
        )); })()}
      </tbody>
      </table>
</ManagerInfrastructureResponsiveTable>
    </div>
  );
}
