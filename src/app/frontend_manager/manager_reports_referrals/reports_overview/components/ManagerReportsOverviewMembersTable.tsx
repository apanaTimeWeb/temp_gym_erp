// RESPONSIBILITY: Renders ManagerReportsOverviewMembersTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import ManagerReportsOverviewEmptyState from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewEmptyState';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';
import { ManagerReportsOverviewFormatNumber } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/utils/ManagerReportsOverviewFormatters';


/** @description Renders the ManagerReportsOverviewMembersTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves empty state. */
export function ManagerReportsOverviewMembersTable() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');

  const { summary } = useManagerReportsOverviewLogic();
  const data = summary?.memberChurnData ?? [];
  return (
    <div data-testid="manager_reports-managerreportsmemberstable-region" className="w-full overflow-x-auto"role="region" aria-label={t("COPY_RESPONSIVE_REPORT_TABLE_2")}>
      <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={[t('COPY_MONTH'), t('TEXT_SERIES_NEW_MEMBERS'), t('COPY_LOST'), t('COPY_ACTIVE')]}>
<table className="w-full">
      <thead className="bg-primary-subtle">
        <tr>
          {[t('COPY_MONTH'), t('TEXT_SERIES_NEW_MEMBERS'), t('COPY_LOST'), t('COPY_ACTIVE')].map(h => (
            <th key={h} className="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider px-5 py-3">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.length === 0 ? <tr><td colSpan={4}><ManagerReportsOverviewEmptyState /></td></tr> : data.map(d => (
          <tr key={d.month} className="hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out">
            <td className="px-5 py-3.5 text-sm font-medium text-text-primary">{d.month}</td>
            <td className="px-5 py-3.5 text-sm text-success-text font-semibold">+{ManagerReportsOverviewFormatNumber(d.newMembers)}</td>
            <td className="px-5 py-3.5 text-sm text-danger-text">-{ManagerReportsOverviewFormatNumber(d.churned)}</td>
            <td className="px-5 py-3.5 text-sm font-semibold text-text-primary">{ManagerReportsOverviewFormatNumber(d.active)}</td>
          </tr>
        ))}
      </tbody>
      </table>
</ManagerInfrastructureResponsiveTable>
    </div>
  );
}
