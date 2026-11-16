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

const TABLE_COLUMN_COUNT = 4;

/** @description Renders the ManagerReportsOverviewRevenueTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsOverviewRevenueTable() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');
  const locale = useLocale();
  const formatReportCurrency = (value: number) => ManagerReportsOverviewFormatCurrency(value, ManagerEnvConfig.currencyCode, locale);

  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.revenueData ?? [];
  const headers = [t('COPY_MONTH'), t('COPY_REVENUE'), t('COPY_EXPENSES'), t('COPY_NET_PROFIT')];

  return (
    <div data-testid="manager_reports-managerreportsrevenuetable-region" className="w-full rounded-2xl border border-border bg-card shadow-card overflow-hidden" role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_3")}>
      <div className="max-h-[640px] overflow-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={headers}>
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
              <tr>
                {headers.map((h, idx) => (
                  <th
                    key={h}
                    className={`text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3 whitespace-nowrap ${
                      idx === 0 ? 'sticky start-0 z-30 bg-surface-highlight border-e border-border' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_COLUMN_COUNT}>
                    <ManagerReportsOverviewEmptyState />
                  </td>
                </tr>
              ) : (
                data.map(d => (
                  <tr key={d.month} className="hover:bg-surface-highlight/50 transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-5 py-3.5 text-sm font-medium text-text-primary whitespace-nowrap">{d.month}</td>
                    <td className="px-5 py-3.5 text-sm text-success-text font-semibold whitespace-nowrap">{formatReportCurrency(d.revenue)}</td>
                    <td className="px-5 py-3.5 text-sm text-danger-text whitespace-nowrap">{formatReportCurrency(d.expenses)}</td>
                    <td className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap ${d.profit >= 0 ? 'text-success-text' : 'text-danger-text'}`}>{formatReportCurrency(d.profit)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </div>
  );
}
