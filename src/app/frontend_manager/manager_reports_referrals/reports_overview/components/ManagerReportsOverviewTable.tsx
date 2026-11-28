// RESPONSIBILITY: Renders ManagerReportsOverviewTable's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import { ManagerReportsOverviewAttendanceTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewAttendanceTable';
import { ManagerReportsOverviewExpensesTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewExpensesTable';
import { ManagerReportsOverviewMembersTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewMembersTable';
import { ManagerReportsOverviewRevenueTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewRevenueTable';
import { ManagerReportsOverviewTrainersTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewTrainersTable';
import { ManagerReportsOverviewBenchmarkingTable } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewBenchmarkingTable';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';

/** @description Renders the ManagerReportsOverviewTable component for its owning Manager frontend boundary. */
export default function ManagerReportsOverviewTable() {
  const t = useTranslations('MANAGER_REPORTS_OVERVIEW');

  const { tab, summary } = useManagerReportsOverviewLogic();
  if (!summary) return null;

  if (tab === 'Benchmarking') {
    return <ManagerReportsOverviewBenchmarkingTable />;
  }

  return (
    <div className="relative bg-card dark:bg-gradient-to-br dark:from-[#0E1629] dark:via-[#141B2D] dark:to-[#0C1220] border border-indigo-500/30 dark:border-indigo-500/35 rounded-2xl overflow-hidden shadow-card">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 opacity-85" />
      <div className="px-4 sm:px-5 py-3.5 border-b border-border dark:border-white/10 bg-surface-highlight dark:bg-[#0D1628]/90">
        <p className="text-sm font-bold text-text-primary">{tab}{t("COPY_DATA")}</p>
      </div>
      <div className="overflow-x-auto">
        {tab === 'Revenue'    && <ManagerReportsOverviewRevenueTable    />}
        {tab === 'Attendance' && <ManagerReportsOverviewAttendanceTable />}
        {tab === 'Members'    && <ManagerReportsOverviewMembersTable    />}
        {tab === 'Expenses'   && <ManagerReportsOverviewExpensesTable   />}
        {tab === 'Trainers'   && <ManagerReportsOverviewTrainersTable   />}
      </div>
    </div>
  );
}
