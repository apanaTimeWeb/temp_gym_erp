"use client";
// RESPONSIBILITY: Main entry point for the dashboard module. Renders layout, handles high-level loading/error states, and sets up Context.
// DATA FLOW: feature data/state and user input → AdminDashboardOverviewMain → accessible UI/events routed to owning hooks (admin_dashboard/dashboard_overview/components/main_view/AdminDashboardOverviewMain.tsx)

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status, error, retry, isDateRangeValid, stats } = useAdminDashboardLogic();

  const selectedBranchId = searchParams.get('branchId') || 'all';
  const branchOptions = [
    { label: t('dashboard.admin_dashboard_branch_leaderboard.allBranches') || 'All Branches', value: 'all' },
    ...(stats?.branchLeaderboard ?? []).map((b) => ({ label: b.name, value: b.id })),
  ];

  const handleBranchChange = (value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete('branchId');
    else params.set('branchId', String(value));
    params.delete('page');
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  };

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

        {/* Toolbar: Branch Filter + Time Range Selector */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="w-64">
            <AdminNavigationLayoutSearchableDropdown
              options={branchOptions}
              value={selectedBranchId}
              onChange={handleBranchChange}
              placeholder={t('branches.admin_branches_header_selector.text_fcf716ea9b') || 'Filter by branch'}
              testId="admin-dashboard-branch-filter-dropdown"
            />
          </div>
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
