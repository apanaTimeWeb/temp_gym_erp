"use client";
// RESPONSIBILITY: Renders the top-level KPI cards for the Performance Dashboard.
// DATA FLOW: feature data/state and user input → AdminHrPerformanceAnalyticsKPIs → accessible UI/events routed to owning hooks (admin_hr/hr_performance_analytics/components/kpis/AdminHrPerformanceAnalyticsKPIs.tsx)

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { formatDecimal, formatNumber, formatPercent1dp } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/utils/AdminHrPerformanceAnalyticsFormatters';

import { UserPlus, Calendar, Star, Users } from 'lucide-react';
import type { PerformanceAggregates } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsTypes';

import type { AdminHrPerformanceKPIsProps } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsKPIsPropsTypes';


/**
 * AdminHrPerformanceAnalyticsKPIs renders the admin hr performance kpis UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminHrPerformanceAnalyticsKPIs: Renders the top-level KPI cards for the Performance Dashboard.
 * @dependencies Consumes AdminHrFormatters, AdminHrPerformanceTypes, AdminHrPerformanceKPIsPropsTypes.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminHrPerformanceAnalyticsKPIs({ aggregates }: AdminHrPerformanceKPIsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const kpis = [
    {
      label: t('hr.AdminAuditRepair.totalSessions'),
      value: formatNumber(aggregates.totalSessions, locale),
      icon: Calendar,
      iconColor: 'text-orange-400',
      iconBg: 'bg-orange-500/20 border-orange-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
      border: 'border-orange-500/40',
      topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    },
    {
      label: t('hr.AdminAuditRepair.membersAdded'),
      value: formatNumber(aggregates.totalMembersAdded, locale),
      icon: UserPlus,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20 border-emerald-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
      border: 'border-emerald-500/40',
      topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    },
    {
      label: t('hr.AdminAuditRepair.avgAttendance'),
      value: `${formatPercent1dp(aggregates.avgAttendance, locale)}%`,
      icon: Users,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/20 border-sky-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
      border: 'border-sky-500/40',
      topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    },
    {
      label: t('hr.AdminAuditRepair.avgRating'),
      value: formatDecimal(aggregates.avgRating, locale),
      icon: Star,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/20 border-amber-500/40',
      surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
      border: 'border-amber-500/40',
      topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="admin_hr-adminhrperformancekpis-summary">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className={`relative overflow-hidden rounded-2xl p-5 shadow-card border ${kpi.surface} ${kpi.border} flex items-center justify-between gap-3`}
          >
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${kpi.topBar}`} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1 truncate">{kpi.label}</p>
              <p className="text-kpi font-extrabold text-text-primary tabular-nums">{kpi.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${kpi.iconBg}`}>
              <Icon size={18} strokeWidth={2.2} className={kpi.iconColor} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
