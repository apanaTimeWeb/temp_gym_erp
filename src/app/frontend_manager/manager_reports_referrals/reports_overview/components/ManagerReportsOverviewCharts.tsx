"use client";
// RESPONSIBILITY: Renders ManagerReportsOverviewCharts's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
import { ManagerReportsOverviewAttendanceChart } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewAttendanceChart';
import { ManagerReportsOverviewExpensesChart } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewExpensesChart';
import { ManagerReportsOverviewMembersChart } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewMembersChart';
import { ManagerReportsOverviewRevenueChart } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewRevenueChart';
import { ManagerReportsOverviewTrainersChart } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/components/ManagerReportsOverviewTrainersChart';
import { useManagerReportsOverviewLogic } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewLogic';



/** @description Renders the ManagerReportsOverviewCharts component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerReportsOverviewCharts() {
  const { tab, summary } = useManagerReportsOverviewLogic();

  if (!summary) return null;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      {tab === 'Revenue'    && <ManagerReportsOverviewRevenueChart    />}
      {tab === 'Attendance' && <ManagerReportsOverviewAttendanceChart />}
      {tab === 'Members'    && <ManagerReportsOverviewMembersChart    />}
      {tab === 'Expenses'   && <ManagerReportsOverviewExpensesChart   />}
      {tab === 'Trainers'   && <ManagerReportsOverviewTrainersChart   />}
    </div>
  );
}
