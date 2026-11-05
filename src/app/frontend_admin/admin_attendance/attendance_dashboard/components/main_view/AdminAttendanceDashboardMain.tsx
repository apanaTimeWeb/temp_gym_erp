"use client";
// RESPONSIBILITY: Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table.
// DATA FLOW: feature data/state and user input → AdminAttendanceDashboardMain → accessible UI/events routed to owning hooks (admin_attendance/attendance_dashboard/components/main_view/AdminAttendanceDashboardMain.tsx)

import { useTranslations } from 'next-intl';
// No manual check-in button — this is a read-only view for the gym owner (Admin role).
import AdminAttendanceKPIs from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/kpis/AdminAttendanceDashboardKPIs';
import AdminAttendanceTrendChart from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/trend_chart/AdminAttendanceDashboardTrendChart';
import AdminAttendanceToolbar from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/toolbar/AdminAttendanceDashboardToolbar';
import AdminAttendanceTable from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/table/AdminAttendanceDashboardTable';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardLogic';
import { RefreshCw, ShieldAlert } from 'lucide-react';

/**
 * AdminAttendanceDashboardMain renders the admin attendance main UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceDashboardMain: Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table.
 * @dependencies Consumes AdminAttendanceKPIs, AdminAttendanceTrendChart, AdminAttendanceToolbar, AdminAttendanceTable, useAdminAttendanceLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceDashboardMain() {
  const t = useTranslations();

  const { status, error, summaryStatus, summaryError, trendStatus, trendError, loadAll, retrySummary, retryTrend } = useAdminAttendanceLogic();

  return (
    <div className="min-h-full pb-10 bg-page text-primary">

      {/* Read-only notice banner */}
      <div className="mx-6 mt-4 flex items-center gap-2.5 px-4 py-2.5 bg-info-bg border border-border rounded-xl">
        <ShieldAlert size={18} strokeWidth={2} className="text-info flex-shrink-0" />
        <p className="text-xs text-info font-medium">
          {t('attendance.admin_attendance_main.text_480de365cc')}</p>
      </div>

      <div className="p-6 space-y-5">
        {status === 'error' && (
          <div className="flex items-center justify-between bg-danger-bg border border-border rounded-xl px-4 py-3">
            <p className="text-sm text-danger">{error}</p>
            <button type="button"
              onClick={() => void loadAll()}
              className="motion-safe:transition-all motion-safe:duration-base ease-in-out flex items-center gap-1.5 text-xs font-semibold text-danger hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11 motion-safe:active:scale-95"
             data-testid="admin_attendance-admin_attendance-main-click">
              <RefreshCw size={18}  strokeWidth={2}/> {t('attendance.admin_attendance_main.text_9f5cd8a2e8')}</button>
          </div>
        )}

        {summaryStatus === 'error' && (
          <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg px-4 py-3">
            <p className="text-sm text-danger">{summaryError || t('attendance.AdminAttendanceError.text_b304c3222c')}</p>
            <button type="button" onClick={() => void retrySummary()} className="min-h-11 rounded px-3 text-xs font-semibold text-danger underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="attendance-dashboard-attendance-dashboard-main-retry-summary">{t('attendance.admin_attendance_main.text_9f5cd8a2e8')}</button>
          </div>
        )}

        {trendStatus === 'error' && (
          <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-border bg-danger-bg px-4 py-3">
            <p className="text-sm text-danger">{trendError || t('attendance.AdminAttendanceError.text_b304c3222c')}</p>
            <button type="button" onClick={() => void retryTrend()} className="min-h-11 rounded px-3 text-xs font-semibold text-danger underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="attendance-dashboard-attendance-dashboard-main-retry-trend">{t('attendance.admin_attendance_main.text_9f5cd8a2e8')}</button>
          </div>
        )}

        <AdminAttendanceKPIs />

        <AdminAttendanceTrendChart />

        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-primary">{t('attendance.admin_attendance_main.text_28a8490d8e')}</p>
          </div>
          <AdminAttendanceToolbar />
          <AdminAttendanceTable />
        </div>
      </div>
    </div>
  );
}
