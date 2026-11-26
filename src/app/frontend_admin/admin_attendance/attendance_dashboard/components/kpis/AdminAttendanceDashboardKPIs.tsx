"use client";
// RESPONSIBILITY: Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg.
// DATA FLOW: feature data/state and user input → AdminAttendanceDashboardKPIs → accessible UI/events routed to owning hooks (admin_attendance/attendance_dashboard/components/kpis/AdminAttendanceDashboardKPIs.tsx)

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { formatNumber } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardFormatters';

import { CalendarCheck, UserCheck, Clock, TrendingUp } from 'lucide-react';
import { useAdminAttendanceStore } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/state/useAdminAttendanceDashboardStore';
import { useAdminAttendanceLogic } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/hooks/useAdminAttendanceDashboardLogic';
import { getAdminAttendanceTrendDirection } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardTrendDirection';

/**
 * AdminAttendanceDashboardKPIs renders the admin attendance kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminAttendanceDashboardKPIs: Renders 4 read-only KPI stat cards for Admin Attendance — today's count, present, late, weekly avg.
 * @dependencies Consumes AdminAttendanceFormatters, useAdminAttendanceLogic.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminAttendanceDashboardKPIs() {
  const t = useTranslations();
  const locale = useLocale();
  const { dateRange, statusFilter, setStatusFilter } = useAdminAttendanceStore();
  const { summary } = useAdminAttendanceLogic();
  if (!summary) return null;

  const trendDirection = getAdminAttendanceTrendDirection(summary.trendVsLastWeek);

  const periodTitle = (() => {
    if (dateRange === 'last_month') return "Last Month Total";
    if (dateRange === 'this_month') return "This Month Total";
    if (dateRange === 'this_week') return "This Week Total";
    if (dateRange === 'yesterday') return "Yesterday Total";
    return t('attendance.AdminAuditRepair.today');
  })();

  const presentTitle = (() => {
    if (dateRange === 'last_month') return "Present Last Month";
    if (dateRange === 'this_month') return "Present This Month";
    if (dateRange === 'this_week') return "Present This Week";
    if (dateRange === 'yesterday') return "Present Yesterday";
    return t('attendance.AdminAuditRepair.presentToday');
  })();

  const lateTitle = (() => {
    if (dateRange === 'last_month') return "Late Last Month";
    if (dateRange === 'this_month') return "Late This Month";
    if (dateRange === 'this_week') return "Late This Week";
    if (dateRange === 'yesterday') return "Late Yesterday";
    return t('attendance.AdminAuditRepair.lateArrivals');
  })();

  const cards = [
    {
      id: 'all',
      title: periodTitle,
      value: formatNumber(summary.todayTotal, locale),
      sub: t('attendance.AdminAuditRepair.peakHour', { time: summary.peakHour }),
      subColor: 'text-secondary',
      icon: CalendarCheck,
      iconBg: 'bg-primary-subtle',
      iconColor: 'text-primary',
      active: statusFilter === 'all',
      onClick: () => setStatusFilter('all'),
    },
    {
      id: 'present',
      title: presentTitle,
      value: formatNumber(summary.todayPresent, locale),
      sub: t('attendance.AdminAuditRepair.attendanceRate', { percent: summary.todayTotal > 0 ? Math.round((summary.todayPresent / summary.todayTotal) * 100) : 0 }),
      subColor: 'text-success',
      icon: UserCheck,
      iconBg: 'bg-success-bg',
      iconColor: 'text-success',
      active: statusFilter === 'present',
      onClick: () => setStatusFilter(statusFilter === 'present' ? 'all' : 'present'),
    },
    {
      id: 'late',
      title: lateTitle,
      value: formatNumber(summary.todayLate, locale),
      sub: t('attendance.AdminAuditRepair.lateRate', { percent: summary.todayTotal > 0 ? Math.round((summary.todayLate / summary.todayTotal) * 100) : 0 }),
      subColor: 'text-warning',
      icon: Clock,
      iconBg: 'bg-warning-bg',
      iconColor: 'text-warning',
      active: statusFilter === 'late',
      onClick: () => setStatusFilter(statusFilter === 'late' ? 'all' : 'late'),
    },
    {
      id: 'weekly',
      title: t('attendance.AdminAuditRepair.weeklyAverage'),
      value: formatNumber(summary.weeklyAverage, locale),
      sub: trendDirection === 'unchanged'
        ? t('attendance.AdminAuditRepair.weeklyTrendUnchanged')
        : t('attendance.AdminAuditRepair.weeklyTrend', { direction: t(`attendance.AdminAuditRepair.${trendDirection}`), percent: Math.abs(summary.trendVsLastWeek) }),
      subColor: trendDirection === 'unchanged' ? 'text-secondary' : trendDirection === 'increased' ? 'text-success' : 'text-danger',
      icon: TrendingUp,
      iconBg: 'bg-info-bg',
      iconColor: 'text-info',
      active: false,
      href: '/frontend_admin/admin_attendance/attendance_reports',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_attendance-adminattendancekpis-summary">
      {cards.map((c) => {
        const Icon = c.icon;
        const inner = (
          <div className={`bg-card rounded-xl p-5 border motion-safe:transition-all motion-safe:duration-base text-left w-full ${c.active ? 'border-primary ring-1 ring-primary' : 'border-border hover:border-focus'}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-secondary uppercase tracking-wider">{c.title}</p>
                <p className="text-2xl font-bold text-primary mt-1">{c.value}</p>
                <p className={`text-xs mt-1 font-medium ${c.subColor}`}>{c.sub}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ml-3 ${c.iconBg}`}>
                <Icon size={18} strokeWidth={2} className={c.iconColor} />
              </div>
            </div>
          </div>
        );
        if (c.href) {
          return (
            <Link key={c.id} href={c.href} className="block no-underline rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {inner}
            </Link>
          );
        }
        return (
          <button key={c.id} type="button" onClick={c.onClick} aria-pressed={c.active} className="block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {inner}
          </button>
        );
      })}
    </div>
  );
}
