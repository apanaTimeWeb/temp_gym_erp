"use client";
// RESPONSIBILITY: Root client orchestrator for Admin Attendance. Composes KPIs, trend chart, toolbar, and table.
// DATA FLOW: feature data/state and user input → AdminAttendanceDashboardMain → accessible UI/events routed to owning hooks (admin_attendance/attendance_dashboard/components/main_view/AdminAttendanceDashboardMain.tsx)

import { useState } from 'react';
import { useTranslations } from 'next-intl';
// No manual check-in button — this is a read-only view for the gym owner (Admin role).
import AdminAttendanceKPIs from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/kpis/AdminAttendanceDashboardKPIs';
import AdminAttendanceTrendChart from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/trend_chart/AdminAttendanceDashboardTrendChart';
import AdminAttendanceToolbar from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/toolbar/AdminAttendanceDashboardToolbar';
import AdminAttendanceTable from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/table/AdminAttendanceDashboardTable';
import AdminAttendanceStaffManagerTable from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/table/AdminAttendanceStaffManagerTable';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardLogic';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/state/useAdminAttendanceDashboardStore';
import { AdminNavigationLayoutSearchableDropdown } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/components/searchable_dropdown/AdminAttendanceDashboardSearchableDropdown';
import { DATE_RANGE_OPTIONS } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/constants/AdminAttendanceDashboardConstants';
import type { DateRangeFilter } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardTypes';
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
  const { dateRange, setDateRange } = useAdminAttendanceStore();
  const [attendanceView, setAttendanceView] = useState<'members' | 'staff'>('members');

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
        {/* Top Header & Global Period Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-primary">
              {t('attendance.admin_attendance_main.text_28a8490d8e') || 'Attendance Overview'}
            </h1>
            <p className="text-xs text-secondary mt-0.5">
              Real-time gym attendance monitoring and analytics
            </p>
          </div>
          <div className="w-full sm:w-56">
            <AdminNavigationLayoutSearchableDropdown
              options={DATE_RANGE_OPTIONS.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
              value={dateRange}
              onChange={(v) => setDateRange(v as DateRangeFilter)}
              placeholder="Select period"
              testId="admin-attendance-global-period-select"
            />
          </div>
        </div>

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

        <div className="bg-card rounded-xl border border-border p-5 space-y-4 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-base font-bold text-primary">
                {attendanceView === 'members' ? (t('attendance.admin_attendance_main.text_28a8490d8e') || 'Member Attendance Records') : 'Staff & Manager Attendance Logs'}
              </p>
              <p className="text-xs text-secondary mt-0.5">
                {attendanceView === 'members' ? 'Live member check-ins, plan verification, and session durations' : 'Track daily manager and trainer shifts, check-in timestamps, and presence'}
              </p>
            </div>
            <div className="flex items-center gap-1 border border-border rounded-xl p-1 bg-surface-highlight">
              <button
                type="button"
                onClick={() => setAttendanceView('members')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  attendanceView === 'members' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Member Attendance
              </button>
              <button
                type="button"
                onClick={() => setAttendanceView('staff')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold motion-safe:transition-colors ${
                  attendanceView === 'staff' ? 'bg-card text-primary shadow-sm' : 'text-secondary hover:text-primary'
                }`}
              >
                Staff & Manager Attendance
              </button>
            </div>
          </div>

          {attendanceView === 'members' ? (
            <>
              <AdminAttendanceToolbar />
              <AdminAttendanceTable />
            </>
          ) : (
            <AdminAttendanceStaffManagerTable />
          )}
        </div>
      </div>
    </div>
  );
}
