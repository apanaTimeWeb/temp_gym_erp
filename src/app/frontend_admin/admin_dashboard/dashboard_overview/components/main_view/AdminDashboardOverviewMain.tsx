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
      <div className="min-h-full p-4 sm:p-6 space-y-4">
        <div className="flex justify-end"><AdminDashboardDateFilterDropdown /></div>
        <div role="alert" className="rounded-lg border border-border bg-danger-bg p-4 text-danger">
          <p>{error || t('dashboard.DashboardError.text_22b2c820bf')}</p>
          {isDateRangeValid && <button type="button" onClick={() => void retry()} className="mt-3 min-h-11 rounded-md border border-border px-3 text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="dashboard-overview-dashboard-overview-main-retry">{t('dashboard.DashboardError.retryAction')}</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-10">
      <div className="p-4 sm:p-6 space-y-5">

        {/* Executive Obsidian Hero Header Card (Trainer-matched) */}
        <section className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-card dark:bg-gradient-to-br dark:from-[#291514] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card space-y-4">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-[#38BDF8]" />
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute left-1/3 -bottom-12 h-32 w-44 rounded-full bg-sky-500/15 blur-3xl" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/40 bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-600 dark:text-orange-300 shadow-[0_2px_10px_rgba(255,90,31,0.16)]">
                <span className="h-2 w-2 rounded-full bg-orange-500 motion-safe:animate-pulse" aria-hidden="true" />
                Admin Operations &amp; Business Command Hub
              </span>
              <h2 className="text-page-title font-extrabold text-text-primary">
                {t('admin_navigation.AdminRouteHeaders.route_admin_dashboard_title')}
              </h2>
              <p className="text-sm text-secondary">
                {t('admin_navigation.AdminRouteHeaders.route_admin_dashboard_subtitle')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <div className="w-full sm:w-64">
                <AdminNavigationLayoutSearchableDropdown
                  options={branchOptions}
                  value={selectedBranchId}
                  onChange={handleBranchChange}
                  placeholder={t('branches.admin_branches_header_selector.text_fcf716ea9b') || 'Filter by branch'}
                  testId="admin-dashboard-branch-filter-dropdown"
                />
              </div>
              <div className="w-full sm:w-auto">
                <AdminDashboardDateFilterDropdown />
              </div>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <AdminDashboardKPIs />

        {/* Row 2: Leaderboard + Alerts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
          <div className="xl:col-span-2 min-w-0">
            <AdminDashboardBranchLeaderboard />
          </div>
          <div className="min-w-0">
            <AdminDashboardAlerts />
          </div>
        </div>

        {/* Row 3: Revenue Trend */}
        <div className="min-w-0">
          <AdminDashboardRevenueTrend />
        </div>

        {/* Row 4: Attendance Trend + Expiring Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-stretch">
          <div className="xl:col-span-2 min-w-0">
            <AdminDashboardAttendanceTrend />
          </div>
          <div className="min-w-0">
            <AdminDashboardExpiringWidget />
          </div>
        </div>

      </div>
    </div>
  );
}
