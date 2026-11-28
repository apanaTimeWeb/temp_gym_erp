// RESPONSIBILITY: Renders/orchestrates SuperadminDashboardOverviewKpiGrid within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Dashboard KPI cards matching Trainer Obsidian StatCard aesthetic. No API calls.

import { AlertCircle, CreditCard, Building2, Activity, Users, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useSuperadminDashboardOverviewDateRangeSuffix } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewDateRangeSuffix';
import { SuperadminDashboardFormatCurrency } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatCurrency';
import { formatNumber } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/utils/SuperadminDashboardOverviewFormatters';

import type { SuperadminDashboardKpiGridProps } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/types/superadmin_dashboard_overview.types';

const KPI_ACCENTS = {
  success: {
    border: 'border-border dark:border-emerald-500/40 hover:border-emerald-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0C2722] dark:via-[#121E2D] dark:to-[#0C1220]',
    topBar: 'from-[#10B981] via-[#34D399] to-transparent',
    glow: 'bg-emerald-400',
    stroke: '#34D399',
    badge: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(16,185,129,0.18)]',
  },
  primary: {
    border: 'border-border dark:border-orange-500/40 hover:border-orange-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B1513] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#FF5A1F] via-[#FB923C] to-transparent',
    glow: 'bg-orange-500',
    stroke: '#FF5A1F',
    badge: 'bg-orange-500/15 border-orange-500/40 text-orange-600 dark:text-orange-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(255,90,31,0.18)]',
  },
  purple: {
    border: 'border-border dark:border-sky-500/40 hover:border-sky-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#131D2E] dark:to-[#0C1220]',
    topBar: 'from-[#38BDF8] via-[#22D3EE] to-transparent',
    glow: 'bg-sky-400',
    stroke: '#38BDF8',
    badge: 'bg-sky-500/15 border-sky-500/40 text-sky-600 dark:text-sky-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(56,189,248,0.18)]',
  },
  warning: {
    border: 'border-border dark:border-amber-500/40 hover:border-amber-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#281E10] dark:via-[#151B2C] dark:to-[#0C1220]',
    topBar: 'from-[#F59E0B] via-[#FACC15] to-transparent',
    glow: 'bg-amber-400',
    stroke: '#FBBF24',
    badge: 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(245,158,11,0.18)]',
  },
  danger: {
    border: 'border-border dark:border-rose-500/40 hover:border-rose-400/75',
    surface: 'bg-card dark:bg-gradient-to-br dark:from-[#2B121B] dark:via-[#141B2D] dark:to-[#0C1220]',
    topBar: 'from-[#F43F5E] via-[#FB7185] to-transparent',
    glow: 'bg-rose-400',
    stroke: '#FB7185',
    badge: 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400',
    shadow: 'hover:shadow-[0_12px_32px_rgba(244,63,94,0.18)]',
  },
} as const;

function resolveKpiAccent(colorClass: string) {
  if (colorClass.includes('success')) return KPI_ACCENTS.success;
  if (colorClass.includes('danger')) return KPI_ACCENTS.danger;
  if (colorClass.includes('warning')) return KPI_ACCENTS.warning;
  if (colorClass.includes('purple')) return KPI_ACCENTS.purple;
  return KPI_ACCENTS.primary;
}

/**
 * @description Renders the Dashboard KPI cards. No API calls.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 */
export function SuperadminDashboardOverviewKpiGrid({ metrics, revenueChartData, timeMultiplier, mrrLabel }: SuperadminDashboardKpiGridProps) {
  const locale = useLocale();
  const t = useTranslations('superadmin_dashboard');
  const router = useRouter();

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
      onClick: () => router.push('/frontend_superadmin/superadmin_billing/billing_invoices_management'),
    },
    {
      id: 'total-gyms',
      label: t('ui.kpi_total_gyms'),
      value: String(metrics.totalGyms),
      trend: undefined,
      trendUp: true,
      icon: Building2,
      colorClass: 'text-primary',
      onClick: () => router.push('/frontend_superadmin/superadmin_gyms/gyms_directory'),
    },
    {
      id: 'active-gyms',
      label: t('ui.kpi_active_gyms'),
      value: String(metrics.activeGyms),
      trend: undefined,
      trendUp: true,
      icon: Activity,
      colorClass: 'text-primary',
      onClick: () => router.push('/frontend_superadmin/superadmin_gyms/gyms_directory?status=ACTIVE'),
    },
    {
      id: 'total-end-users',
      label: t('ui.kpi_total_end_users'),
      value: formatNumber(metrics.totalEndUsers || 0),
      trend: undefined,
      trendUp: true,
      icon: Users,
      colorClass: 'text-purple',
      onClick: () => router.push('/frontend_superadmin/superadmin_analytics/analytics_dashboard'),
    },
    {
      id: 'average-income-per-gym',
      label: t('ui.kpi_avg_income_per_gym'),
      value: SuperadminDashboardFormatCurrency(metrics.arpu || 0, metrics.currency, locale),
      trend: undefined,
      trendUp: true,
      icon: DollarSign,
      colorClass: 'text-success',
      onClick: () => router.push('/frontend_superadmin/superadmin_analytics/analytics_dashboard'),
    },
    {
      id: 'trial-gyms',
      label: t('ui.kpi_trial_gyms'),
      value: String(metrics.trialGyms || 0),
      trend: undefined,
      trendUp: true,
      icon: Clock,
      colorClass: 'text-warning',
      onClick: () => router.push('/frontend_superadmin/superadmin_gyms/gyms_directory?planId=trial'),
    },
    {
      id: 'overdue-invoices',
      label: t('ui.kpi_overdue_invoices'),
      value: String(metrics.overdueInvoicesCount || 0),
      trend: undefined,
      trendUp: false,
      icon: AlertCircle,
      colorClass: 'text-danger',
      onClick: () => router.push('/frontend_superadmin/superadmin_billing/billing_invoices_management?status=OVERDUE'),
    },
    {
      id: 'pending-revenue',
      label: t('ui.kpi_pending_revenue'),
      value: SuperadminDashboardFormatCurrency(metrics.pendingRevenue || 0, metrics.currency, locale),
      trend: undefined,
      trendUp: true,
      icon: CreditCard,
      colorClass: 'text-warning',
      onClick: () => router.push('/frontend_superadmin/superadmin_billing/billing_invoices_management?status=PENDING'),
    },
    {
      id: 'platform-health',
      label: t('ui.kpi_platform_health'),
      value: healthDisplay,
      trend: undefined,
      trendUp: healthScore !== undefined ? healthScore >= 80 : true,
      icon: CheckCircle2,
      colorClass: healthScore !== undefined && healthScore < 80 ? 'text-warning' : 'text-success',
      onClick: () => router.push('/frontend_superadmin/superadmin_analytics/analytics_reports_health'),
    },
    {
      id: 'trials-expiring-seven-days',
      label: t('ui.kpi_trials_expiring_7d'),
      value: String(metrics.trialsExpiringIn7Days || 0),
      trend: undefined,
      trendUp: false,
      icon: AlertCircle,
      colorClass: 'text-warning',
      onClick: () => router.push('/frontend_superadmin/superadmin_gyms/gyms_directory?planId=trial'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpiCards.map((card) => {
        const Icon = card.icon;
        const accent = resolveKpiAccent(card.colorClass);
        return (
          <div
            key={card.label}
            onClick={card.onClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.onClick();
              }
            }}
            role="button"
            tabIndex={0}
            data-testid={`superadmin-dashboard-kpi-${card.id}`}
            className={`relative overflow-hidden min-w-0 rounded-2xl p-5 shadow-card border flex flex-col justify-between ${accent.surface} ${accent.border} ${accent.shadow} motion-safe:hover:-translate-y-0.5 motion-safe:transition-all motion-safe:duration-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
          >
            <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.topBar}`} />
            <span aria-hidden="true" className={`pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full blur-2xl opacity-15 ${accent.glow}`} />
            <svg aria-hidden="true" viewBox="0 0 150 45" className="pointer-events-none absolute bottom-0 right-0 h-14 w-32 opacity-20">
              <path d="M0 38 Q25 32 45 26 T90 18 T130 12 T150 6" fill="none" stroke={accent.stroke} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="block text-secondary font-semibold text-xs uppercase tracking-wider truncate">{card.label}</span>
                <div className="text-2xl sm:text-[26px] font-extrabold text-primary tabular-nums mt-2 truncate">{card.value}</div>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm ${accent.badge}`}>
                <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
              </div>
            </div>
            {card.trend && (
              <p className={`relative text-xs mt-3 pt-2.5 border-t border-border/60 dark:border-white/10 font-medium ${card.trendUp ? 'text-success-text' : 'text-danger-text'}`}>
                {card.trendUp ? '↑' : '↓'} {card.trend}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
