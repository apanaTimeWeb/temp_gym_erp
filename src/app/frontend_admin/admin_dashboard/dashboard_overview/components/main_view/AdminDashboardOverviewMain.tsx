"use client";
// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewMain → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/main_view/AdminDashboardOverviewMain.tsx)

import { useTranslations } from 'next-intl';
import { useAdminDashboardLogic } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewLogic';
import AdminDashboardKPIs from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/kpis/AdminDashboardOverviewKPIs';
import AdminDashboardBranchLeaderboard from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/branch_leaderboard/AdminDashboardOverviewBranchLeaderboard';
import AdminDashboardAlerts from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/alerts/AdminDashboardOverviewAlerts';
import AdminDashboardRevenueTrend from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/revenue_trend/AdminDashboardOverviewRevenueTrend';
import AdminDashboardExpiringWidget from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/expiring_widget/AdminDashboardOverviewExpiringWidget';
import AdminDashboardAttendanceTrend from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/attendance_trend/AdminDashboardOverviewAttendanceTrend';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/searchable_dropdown/AdminDashboardOverviewSearchableDropdown';
import { AdminDashboardOverviewDateFilterDropdown as AdminDashboardDateFilterDropdown } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/date_filter/AdminDashboardOverviewDateFilterDropdown';
import AdminDashboardSkeleton from '@/app/frontend_admin/admin_dashboard/dashboard_overview/components/main_view/AdminDashboardOverviewSkeleton';

/**
 * AdminDashboardOverviewMain renders the admin dashboard main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminDashboardOverviewMain: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
 * @dependencies Consumes useAdminDashboardLogic, AdminDashboardKPIs, AdminDashboardBranchLeaderboard, AdminDashboardAlerts, AdminDashboardRevenueTrend.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminDashboardOverviewMain() {
  const t = useTranslations();
  const { status, error, retry, isDateRangeValid } = useAdminDashboardLogic();

  if (status === 'pending') return <div className="min-h-full"><AdminDashboardSkeleton /></div>;

  if (status === 'error') {
    return (
      <div className="min-h-full p-6 space-y-4">
        <div className="flex justify-end"><AdminDashboardDateFilterDropdown /></div>
        <div role="alert" className="rounded-lg border border-border bg-danger-bg p-4 text-danger">
          <p>{error || t('dashboard.DashboardError.text_22b2c820bf')}</p>
          {isDateRangeValid && <button type="button" onClick={() => void retry()} className="mt-3 min-h-11 rounded-md border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="dashboard-overview-dashboard-overview-main-retry">{t('dashboard.DashboardError.retryAction')}</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="p-6 space-y-6">

        {/* Time Range Selector */}
        <div className="flex justify-end items-center">
          <AdminDashboardDateFilterDropdown />
        </div>

        {/* KPIs */}
        <AdminDashboardKPIs />

        {/* Row 2: Leaderboard + Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AdminDashboardBranchLeaderboard />
          </div>
          <div className="max-h-96">
            <AdminDashboardAlerts />
          </div>
        </div>

        {/* Row 3: Revenue Trend */}
        <AdminDashboardRevenueTrend />

        {/* Row 4: Attendance Trend + Expiring Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AdminDashboardAttendanceTrend />
          </div>
          <div>
            <AdminDashboardExpiringWidget />
          </div>
        </div>

      </div>
    </div>
  );
}
