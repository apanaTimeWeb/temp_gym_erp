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
      iconColor: 'text-text-primary',
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

  const accents = {
    all: {
      border: 'border-orange-500/40 hover:border-orange-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
      topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
      glow: 'bg-orange-500',
      stroke: '#FF5A1F',
      badge: 'bg-orange-500/20 border-orange-500/40',
    },
    present: {
      border: 'border-emerald-500/40 hover:border-emerald-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
      topBar: 'from-[#10B981] via-[#34D399] to-transparent',
      glow: 'bg-emerald-400',
      stroke: '#34D399',
      badge: 'bg-emerald-500/20 border-emerald-500/40',
    },
    late: {
      border: 'border-amber-500/40 hover:border-amber-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
      topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
      glow: 'bg-amber-400',
      stroke: '#FBBF24',
      badge: 'bg-amber-500/20 border-amber-500/40',
    },
    weekly: {
      border: 'border-sky-500/40 hover:border-sky-400/75',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
      topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
      glow: 'bg-sky-400',
      stroke: '#38BDF8',
      badge: 'bg-sky-500/20 border-sky-500/40',
    },
  } as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_attendance-adminattendancekpis-summary">
      {cards.map((c) => {
        const Icon = c.icon;
        const accent = accents[c.id as keyof typeof accents] ?? accents.all;
        const inner = (
          <div className={`relative overflow-hidden rounded-2xl p-5 border shadow-card motion-safe:transition-all motion-safe:duration-base motion-safe:hover:-translate-y-0.5 text-left w-full h-full flex flex-col justify-between ${accent.surface} ${c.active ? 'border-primary ring-2 ring-primary/60' : accent.border}`}>
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-20 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-25">
              <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider truncate">{c.title}</p>
                <p className="text-kpi font-extrabold text-text-primary tabular-nums mt-2">{c.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${c.iconBg} ${accent.badge}`}>
                <Icon size={18} strokeWidth={2.2} className={c.iconColor} />
              </div>
            </div>
            <p className={`relative text-xs mt-3 pt-2.5 border-t border-border/70 font-medium truncate ${c.subColor}`}>{c.sub}</p>
          </div>
        );
        if (c.href) {
          return (
            <Link key={c.id} href={c.href} className="block h-full no-underline rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {inner}
            </Link>
          );
        }
        return (
          <button key={c.id} type="button" onClick={c.onClick} aria-pressed={c.active} className="block h-full w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {inner}
          </button>
        );
      })}
    </div>
  );
}
