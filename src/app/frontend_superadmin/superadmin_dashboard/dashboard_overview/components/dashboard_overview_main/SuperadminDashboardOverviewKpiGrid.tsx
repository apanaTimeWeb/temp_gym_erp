// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewKpiGrid within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Dashboard KPI cards. No API calls.


import { AlertCircle, CreditCard, Building2, Activity, Users, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { useSuperadminDashboardOverviewDateRangeSuffix } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewDateRangeSuffix';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';

import type { SuperadminDashboardKpiGridProps } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

/**
 * @description Renders the Dashboard KPI cards. No API calls.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export function SuperadminDashboardOverviewKpiGrid({ metrics, revenueChartData, timeMultiplier, mrrLabel }: SuperadminDashboardKpiGridProps) {
    const locale = useLocale();
    const t = useTranslations('superadmin_dashboard');

      const dateSuffix = useSuperadminDashboardOverviewDateRangeSuffix();
    const lastTwoMonths = revenueChartData.length >= 2 ? revenueChartData.slice(-2) : [];
    const mrrTrendNum = lastTwoMonths.length === 2 && lastTwoMonths[0]!.mrr > 0
        ? Math.round(((lastTwoMonths[1]!.mrr - lastTwoMonths[0]!.mrr) / lastTwoMonths[0]!.mrr) * 100)
        : 0;
    const mrrTrendStr = mrrTrendNum ? `${mrrTrendNum > 0 ? '+' : ''}${mrrTrendNum}% ${t('ui.vs_last_month')}` : undefined;
    const healthScore = metrics.platformHealthScore;
    const healthDisplay = healthScore !== undefined ? `${healthScore}/100` : '—';
    const kpiCards = [
        {
            id: 'monthly-recurring-revenue',
            label: mrrLabel + dateSuffix,
            value: SuperadminDashboardFormatCurrency(Math.round((metrics.monthlyRecurringRevenue || 0) * timeMultiplier), metrics.currency, locale),
            trend: metrics.mrrDeltaPercent !== undefined
                ? `${metrics.mrrDeltaPercent > 0 ? '+' : ''}${metrics.mrrDeltaPercent}% ${t('ui.vs_last_month')}`
                : mrrTrendStr,
            trendUp: metrics.mrrDeltaPercent !== undefined ? metrics.mrrDeltaPercent >= 0 : mrrTrendNum >= 0,
            icon: CreditCard,
            colorClass: 'text-success',
            iconBgClass: 'bg-success-bg',
            onClick: undefined as (() => void) | undefined,
        },
        {
            id: 'total-gyms',
            label: t('ui.kpi_total_gyms'),
            value: String(metrics.totalGyms),
            trend: undefined,
            trendUp: true,
            icon: Building2,
            colorClass: 'text-primary',
            iconBgClass: 'bg-primary-subtle',
        },
        {
            id: 'active-gyms',
            label: t('ui.kpi_active_gyms'),
            value: String(metrics.activeGyms),
            trend: undefined,
            trendUp: true,
            icon: Activity,
            colorClass: 'text-primary',
            iconBgClass: 'bg-primary-subtle',
        },
        {
            id: 'total-end-users',
            label: t('ui.kpi_total_end_users'),
            value: formatNumber(metrics.totalEndUsers || 0),
            trend: undefined,
            trendUp: true,
            icon: Users,
            colorClass: 'text-purple',
            iconBgClass: 'bg-purple-bg',
        },
        {
            id: 'average-income-per-gym',
            label: t('ui.kpi_avg_income_per_gym'),
            value: SuperadminDashboardFormatCurrency(metrics.arpu || 0, metrics.currency, locale),
            trend: undefined,
            trendUp: true,
            icon: DollarSign,
            colorClass: 'text-success',
            iconBgClass: 'bg-success-bg',
        },
        {
            id: 'trial-gyms',
            label: t('ui.kpi_trial_gyms'),
            value: String(metrics.trialGyms || 0),
            trend: undefined,
            trendUp: true,
            icon: Clock,
            colorClass: 'text-warning',
            iconBgClass: 'bg-warning-bg',
        },
        {
            id: 'overdue-invoices',
            label: t('ui.kpi_overdue_invoices'),
            value: String(metrics.overdueInvoicesCount || 0),
            trend: undefined,
            trendUp: false,
            icon: AlertCircle,
            colorClass: 'text-danger',
            iconBgClass: 'bg-danger-bg',
        },
        {
            id: 'pending-revenue',
            label: t('ui.kpi_pending_revenue'),
            value: SuperadminDashboardFormatCurrency(metrics.pendingRevenue || 0, metrics.currency, locale),
            trend: undefined,
            trendUp: true,
            icon: CreditCard,
            colorClass: 'text-warning',
            iconBgClass: 'bg-warning-bg',
        },
        {
            id: 'platform-health',
            label: t('ui.kpi_platform_health'),
            value: healthDisplay,
            trend: undefined,
            trendUp: healthScore !== undefined ? healthScore >= 80 : true,
            icon: CheckCircle2,
            colorClass: healthScore !== undefined && healthScore < 80 ? 'text-warning' : 'text-success',
            iconBgClass: healthScore !== undefined && healthScore < 80 ? 'bg-warning-bg' : 'bg-success-bg',
        },
        {
            id: 'trials-expiring-seven-days',
            label: t('ui.kpi_trials_expiring_7d'),
            value: String(metrics.trialsExpiringIn7Days || 0),
            trend: undefined,
            trendUp: false,
            icon: AlertCircle,
            colorClass: 'text-warning',
            iconBgClass: 'bg-warning-bg',
        },
    ];
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {kpiCards.map((card) => {
            const Icon = card.icon;
            return (<div key={card.label} onClick={card.onClick} onKeyDown={(event) => { if (card.onClick && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); card.onClick(); } }} role={card.onClick ? 'button' : undefined} tabIndex={card.onClick ? 0 : undefined} data-testid={`superadmin-dashboard-kpi-${card.id}`} className={`relative overflow-hidden bg-card border border-border rounded-xl p-6 shadow-card motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-card motion-safe:transition-all motion-safe:duration-base ${card.onClick ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-secondary font-medium text-xs uppercase tracking-wider">{card.label}</span>
                <Icon className={`w-5 h-5 ${card.colorClass}`}/>
            </div>
            <div className="text-3xl font-bold text-primary">{card.value}</div>
            {card.trend && (<p className={`text-xs mt-2 font-medium ${card.trendUp ? 'text-success' : 'text-danger'}`}>
                {card.trendUp ? '↑' : '↓'} {card.trend}
              </p>)}
          </div>);
        })}
    </div>);
}
