// RESPONSIBILITY: Renders ManagerReportsOverviewTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { ManagerReportsOverviewAttendanceTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewAttendanceTable';
import { ManagerReportsOverviewExpensesTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewExpensesTable';
import { ManagerReportsOverviewMembersTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewMembersTable';
import { ManagerReportsOverviewRevenueTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewRevenueTable';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';



/** @description Renders the ManagerReportsOverviewTable component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsOverviewTable() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');

  const { tab, summary } = useManagerReportsOverviewLogic();
  if (!summary) return null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <div className="px-5 py-3.5 border-b border-border">
        <p className="text-sm font-semibold text-text-primary">{tab}{t("COPY_DATA")}</p>
      </div>
      <div className="overflow-x-auto">
        {tab === 'Revenue'    && <ManagerReportsOverviewRevenueTable    />}
        {tab === 'Attendance' && <ManagerReportsOverviewAttendanceTable />}
        {tab === 'Members'    && <ManagerReportsOverviewMembersTable    />}
        {tab === 'Expenses'   && <ManagerReportsOverviewExpensesTable   />}
      </div>
    </div>
  );
}
