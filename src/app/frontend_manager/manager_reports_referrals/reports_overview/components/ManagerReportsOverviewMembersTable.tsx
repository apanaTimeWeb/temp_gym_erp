// RESPONSIBILITY: Renders ManagerReportsOverviewMembersTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerReportsOverviewEmptyState from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewEmptyState';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import { ManagerReportsOverviewFormatNumber } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';


const TABLE_COLUMN_COUNT = 4;

/** @description Renders the ManagerReportsOverviewMembersTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsOverviewMembersTable() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');

  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.memberChurnData ?? [];
  const headers = [t('COPY_MONTH'), t('TEXT_SERIES_NEW_MEMBERS'), t('COPY_LOST'), t('COPY_ACTIVE')];

  return (
    <div data-testid="manager_reports-managerreportsmemberstable-region" className="w-full rounded-2xl border border-border bg-card shadow-card overflow-hidden" role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_2")}>
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
                  <tr key={d.month} className="hover:bg-surface-hover transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-5 py-3.5 text-sm font-medium text-text-primary whitespace-nowrap group-hover:bg-surface-hover transition-colors">
                      <div className="flex items-center gap-2">
                        <span>{d.month}</span>
                        <CopyButton value={d.month} />
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-success-text font-semibold whitespace-nowrap">+{ManagerReportsOverviewFormatNumber(d.newMembers)}</td>
                    <td className="px-5 py-3.5 text-sm text-danger-text whitespace-nowrap">-{ManagerReportsOverviewFormatNumber(d.churned)}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-text-primary whitespace-nowrap">{ManagerReportsOverviewFormatNumber(d.active)}</td>
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
