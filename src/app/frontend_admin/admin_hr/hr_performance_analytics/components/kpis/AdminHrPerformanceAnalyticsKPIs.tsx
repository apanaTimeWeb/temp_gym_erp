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
      iconColor: 'text-primary',
      iconBg: 'bg-primary-subtle',
    },
    {
      label: t('hr.AdminAuditRepair.membersAdded'),
      value: formatNumber(aggregates.totalMembersAdded, locale),
      icon: UserPlus,
      iconColor: 'text-success',
      iconBg: 'bg-success-bg',
    },
    {
      label: t('hr.AdminAuditRepair.avgAttendance'),
      value: `${formatPercent1dp(aggregates.avgAttendance, locale)}%`,
      icon: Users,
      iconColor: 'text-info',
      iconBg: 'bg-info-bg',
    },
    {
      label: t('hr.AdminAuditRepair.avgRating'),
      value: formatDecimal(aggregates.avgRating, locale),
      icon: Star,
      iconColor: 'text-warning',
      iconBg: 'bg-warning-bg',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="admin_hr-adminhrperformancekpis-summary">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.label}
            className={`bg-card border border-border rounded-xl p-5 flex items-center gap-4`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.iconBg}`}>
              <Icon size={18} strokeWidth={2} className={kpi.iconColor} />
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className="text-2xl font-black text-primary">{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
